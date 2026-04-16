# SPEC.md: Pioneer Landing Page

## 1. Overview
The goal of this project is to create a high-fidelity, pixel-accurate clone of the "Pioneer Landing Page" design from the given Stitch project (`915992772971263475`).

## 2. Design System
- **Theme:** Dark Mode (`#0a0a0a` background, `#f5f5f5` text)
- **Primary Action Color:** `#137fec` (Brand Blue), with Saturation Level 3 for vibrant pops.
- **Typography:** `Inter` for all typography (Headers, Body, Labels).
- **Shapes:** `ROUND_EIGHT` (border-radius: 8px) used for buttons and cards.
- **Micro-Animations:** Smooth, easing transitions (e.g., cubic-bezier timing functions) for all interactive states and hover effects.

## 3. Core Requirements
1. **Loading State:** An introductory animated state resembling a cookie consent or brand initialization veil.
2. **Hero Section:** Full viewport height (100vh) header featuring a background video with a bold centered headline and strong CTA.
3. **Pioneer Seed Tech Section:** Content block introducing seed technology features (glassmorphic overlays and robust grid presentation).
4. **Site-Wide Integrations:**
   - Full Screen Navigation Menu
   - Site-wide Search Overlay
   - Global Contact Footer

## 4. Technical Requirements
1. **Speed & Responsiveness:** Clean HTML structure with CSS flexbox/grid. Fully responsive.
2. **Framework:** Vite + React + Vanilla CSS (No Tailwind per initial constraints, enforcing custom properties).
3. **Assets:** Will use high-quality placeholder Unsplash/Pexels videos and images unless explicitly provided.
