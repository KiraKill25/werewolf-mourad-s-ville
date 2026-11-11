import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Displays image for 2.5 seconds before transitioning
    const timer = setTimeout(() => {
      setCompleted(true);
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (completed) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black select-none">
      <img
        src="/splash.png"
        alt="Splash Screen"
        className="w-full h-auto object-contain max-h-screen"
      />
    </div>
  );
}
