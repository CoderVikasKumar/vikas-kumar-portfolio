# Vikas Kumar — Premium Full Stack Developer Portfolio

React + Vite + GSAP portfolio inspired by the premium dark/glassmorphism reference style.

## Included

- Fixed glassmorphism navbar with smooth navigation
- Red `#ff3d00` + black + white visual system
- Hero split layout with transparent, borderless developer avatar
- Floating avatar + subtle mouth animation
- Animated background glow and particles
- About, Skills, Projects, Services, Learning Journey, Contact and Footer
- GSAP entrance + scroll-reveal animations
- Responsive desktop, laptop, tablet and mobile layouts
- Reusable React components and centralized data
- SEO/meta tags
- `prefers-reduced-motion` support

## Folder structure

```text
src/
  components/
    About.jsx
    Avatar.jsx
    Contact.jsx
    Footer.jsx
    Hero.jsx
    Navbar.jsx
    Projects.jsx
    SectionHeading.jsx
    Services.jsx
    Skills.jsx
    Timeline.jsx
  data.js
  App.jsx
  main.jsx
  styles/
    global.css
public/
  avatar.svg
index.html
package.json
README.md
```

## Run

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm run preview
```

## Replace the avatar

`public/avatar.svg` is a transparent lightweight SVG illustration, so there is no rectangle/video card behind it. Replace it with your own transparent PNG/WebM talking-avatar asset when available.

## Make contact functional

The contact form is intentionally frontend-only. Connect its submit handler to your Express/MongoDB backend or an email service for real delivery.

## Before deployment

Update the placeholder GitHub/LinkedIn/Instagram URLs and `vikas@example.com`.
