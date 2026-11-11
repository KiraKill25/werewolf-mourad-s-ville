<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- New role translations live in a browser-safe shared locale module and are merged into every dictionary, so role copy and engine event tokens share the same language source.
- All lethal new-role actions use the central game death handler and defer victory until revenge prompts finish, so chained deaths preserve night/day continuation.
- Uploaded new-role portraits resolve through CDN pointer imports in roleImage; every role video lives in public/videos/roles/{id}.mp4 so the APK plays them offline.

- Engine rule tests use a separate Vitest configuration with the same source alias, keeping the app runtime plugins out of unit tests.
- End-of-game scoring lives in the pure module src/game/evaluation.ts (tested), and both the recap MVP and the evaluation screen read from it so rankings never disagree.
