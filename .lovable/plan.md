# Levy Website Pages and Video Hero

## Goal
Create dedicated pages for the existing homepage sections and use the supplied YouTube video as a muted looping hero background.

## Work
- Keep the homepage and its established Levy branding, while adding standalone Services, About, Safety, Projects, Service Area, and Contact pages.
- Reuse the current section designs and shared site header, footer, and mobile contact bar across the new pages.
- Update navigation and calls to action so each opens the right page; provide unique metadata for every new page.
- Replace the hero still image with an accessible, autoplaying, muted, looping YouTube embed using the supplied video.
- Record the routing convention in AGENTS.md and track the work in roadmap.md.

## Technical details
- Implement pages as TanStack Start file routes, preserving the existing `/` homepage.
- Add a shared page shell for site-wide elements; reuse existing section components for page content.
- Use the YouTube embed parameters `autoplay=1`, `mute=1`, `loop=1`, `playlist=an9ZlCYob0s`, `controls=0`, and `playsinline=1`.
