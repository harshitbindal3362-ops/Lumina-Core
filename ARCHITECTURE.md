# ARCHITECTURE.md

## 1. File Structure

```
/src
  /assets        (Videos, Static Images)
  /components    (Reusable UI: Buttons, Cards, Modals)
  /sections      (Page Blocs: Hero, SeedTech, Footer)
  /styles
    global.css   (Design System Tokens, Reset, Keyframes)
    layout.css   (Global Grid and Wrapper helpers)
  /context       (Global State for Modals/Loading)
  App.tsx        (Root assembly)
  main.tsx
```

## 2. Core Abstractions

- **State Management:** `AppContext` controlling `isLoading`, `isNavOpen`, `isSearchOpen`.
- **CSS Strategy:** Variables at `:root` definition (`--bg`, `--text`, `--brand`, `--radius-8`).
- **Media Queries:** Standard breakpoints (`sm`, `md`, `lg`, `xl`) explicitly coded in `global.css`.
