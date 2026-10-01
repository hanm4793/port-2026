# Mobile-First Story Adaptation Specification

**Project:** port-2026 / Island of Memory
**Philosophy:** Mobile is not a degraded desktop afterthought; it is an intimate, story-first editorial scroll with an ambient 3D spatial backdrop.
**Status:** Approved Architecture

---

## 1. Mobile Behavioral Invariants & Design Principles

### A. The "Story-First" Invariant
- On mobile viewports (`< 1024px`, especially vertical portrait phones `375px - 430px`), **editorial text and proof artifacts must be immediately readable without squinting or fighting the 3D canvas**.
- Touch scroll belongs 100% to the user’s thumb. No custom scroll jank, no hijacked gestures.
- The 3D canvas operates as an ambient cinematic background layer beneath clean, backdrop-blurred cards.

### B. Vertical Portrait Crop Compensation
- Desktop cameras rely on wide 16:9 aspect ratios. On a 9:19.5 phone screen, a horizontal composition cuts off the sides of landmarks (e.g. gate pillars, forum colonnades).
- **Mobile Camera Rule**: In Story Mode, the camera increases FOV by +12° (from ~48° to 60°) and offsets slightly upward (`+0.6m Y`) so monuments remain centered in the upper 45% of the viewport, leaving the lower 55% free for readable typography and touch buttons.

---

## 2. What Is Reduced or Removed on Mobile

| Element | Desktop Experience | Mobile Adaptation | Rationale |
|---|---|---|---|
| **DPR (Device Pixel Ratio)** | `[1, 1.75]` | `[1, 1.0]` (Strictly capped) | Prevents GPU fill-rate throttling on high-density OLEDs (iPhone/Samsung). |
| **Dynamic Shadows** | Directional shadow maps enabled | Soft ambient directional light, 0 shadow map passes | Eliminates 40% GPU draw overhead and mobile battery drain. |
| **CPU Wave Displacement** | 4-layer sine wave vertex displacement | Static translucent PBR ocean with animated UV/normals | Prevents CPU thermal runaway. |
| **Zone Culling Distance** | 58 meters | 35 meters (immediate zone only) | Cuts mobile VRAM footprint below 15MB. |
| **Case Study Drawer** | 480px slide-in panel on right | Full-screen bottom sheet with thumb-friendly close handle | Maximizes reading area on small screens. |
| **Audio Opt-In** | Center optical modal | Bottom sliding banner with large touch targets | Does not block viewport content. |
| **Explore Mode Controls** | Keyboard WASD + mouse drag | Touch-safe on-screen D-Pad + single-finger drag | Operable with one hand. |

---

## 3. UI Layout & Touch Affordances

### A. Mobile Sticky Navigation & Persistent CTA
- On mobile, the top navbar is compact (48px height) with brand title, Audio toggle icon, and direct Brief CTA.
- The bottom edge features a thumb-friendly quick-access bar or accessible drawer triggers with minimum 44×44px touch targets conforming to WCAG 2.1 AAA standards.

### B. Content Cards on Mobile
- Rather than tiny bottom-left text, chapter beat cards on mobile expand to **full-width frosted glass sheets (`w-full`, `max-w-none`, `backdrop-blur-md`, `bg-[#181614]/85`)** docked to the bottom half of the screen.
- Headings are scaled to `24px - 28px` with clear letter-spacing and high contrast.

---

## 4. Graceful Fallback for Low-End Mobile Devices

If WebGL initialization fails, context is lost, or hardware memory is constrained:
1. The 3D canvas unmounts silently without error alerts.
2. The page transitions smoothly into a pure CSS gradient / static poster atmosphere.
3. 100% of the narrative chapters, case study drawer, service catalog, and BriefBuilder remain fully operational and fast.
