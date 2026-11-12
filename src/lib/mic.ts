/** Live microphone pass-through: routes the phone mic to the current audio output (e.g. a Bluetooth speaker). */
let stream: MediaStream | null = null;
let ctx: AudioContext | null = null;
let source: MediaStreamAudioSourceNode | null = null;
const listeners = new Set<(on: boolean) => void>();

const emit = () => listeners.forEach((fn) => fn(!!stream));

export function isMicOn() {
  return !!stream;
}

export function subscribeMic(fn: (on: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export async function startMic(): Promise<boolean> {
  if (stream) return true;
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) return false;
  try {
    const s = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    });
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    ctx = ctx ?? new Ctor();
    if (ctx.state === "suspended") await ctx.resume();
    source = ctx.createMediaStreamSource(s);
    source.connect(ctx.destination);
    stream = s;
    emit();
    return true;
  } catch {
    return false;
  }
}

export function stopMic() {
  source?.disconnect();
  source = null;
  stream?.getTracks().forEach((t) => t.stop());
  stream = null;
  emit();
}
