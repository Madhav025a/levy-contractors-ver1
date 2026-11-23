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

- Keep service listings in the shared ServiceCards component backed by SERVICE_PAGES so homepage and services index stay consistent.
- Resolve the former asbestos surveys URL to the combined assessment entry so existing links retain access without duplicating the service catalog.
- Use the optional preserveFrame media flag for archival project scans so the gallery keeps their full composition instead of cropping to standard tiles.
- Ground advisor answers in shared service/project/client data and bundled website copy through a public server function; never claim chat requests were submitted without a confirmed submission.
- Keep client names in shrinkable grid tracks with industry labels on a separate wrapping row so long names cannot push labels outside their cards.

- Store all media as real files in src/assets (no Lovable Assets pointers): the site is self-hosted on GoDaddy Node.js, which cannot serve /__l5e CDN paths.
- Admin dashboard (/admin) uses its own MySQL tables (admin_users, admin_sessions, quote_status, quote_notes) with scrypt hashes and httpOnly session cookies; every admin server function re-checks role server-side because GoDaddy hosting has no Lovable auth.
