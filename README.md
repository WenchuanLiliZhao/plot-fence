# Plot fence

Obsidian plugin: render interactive **calc-kit** figures from `plot` fenced code blocks (same YAML as [pm-all-in-one](https://github.com/WenchuanLiliZhao/pm-all-in-one) Reading View).

**Plugin id:** `plot-fence` (folder name under `.obsidian/plugins/` must match).

## What it does

- Registers a `plot` Markdown code-block processor for **Reading view** and **Live Preview**.
- Parses the fence body as YAML, optionally taking the figure type from the info-string second token (` ```plot riemann `).
- Draws an interactive Canvas figure (sliders, segmented controls, orbit for `surface3d`).
- Renders `title` / `caption` as Markdown so `$…$` math uses the vault’s MathJax (including [latex-macros-preamble](https://github.com/WenchuanLiliZhao/latex-macros-preamble)).

## Syntax

````markdown
```plot function
title: $y = x^2$
f: x^2
domain: [-3, 3]
```
````

Types: `function`, `extrema`, `riemann`, `accumulation`, `slopefield`, `taylor`, `vectorfield`, `surface3d`.

Aliases: `expression` → `f`, `steps` → `n`, `bounds` → `range`.

This draws graphs of $y = f(x)$ and calculus illustrations. It does **not** plot implicit curves such as $x^2 + y^2 = 1$.

## Installing from source

In this directory run `npm install` and `npm run build`, then copy **`main.js`**, **`styles.css`**, and **`manifest.json`** into `.obsidian/plugins/plot-fence/`. For day-to-day development, `npm run dev` watches and rebuilds `main.js`.
