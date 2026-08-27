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

Types: `function`, `extrema`, `riemann`, `accumulation`, `slopefield`, `taylor`, `vectorfield`, `surface3d`, `region`.

Aliases: `expression` → `f`, `steps` → `n`, `bounds` → `range`.

`$y = f(x)$` uses `function`. Implicit curves and inequality sets use `region`. A `where` clause is **one** comparison (`lhs < rhs`, also `<=`, `>`, `>=`, `=`), not a chain of `and`s.

Single-quote any YAML value that contains `[`, `]`, or `\`. Unquoted `$[0,1]$` is parsed as a list, and `"\times"` eats `\t` as a tab; both render as a red error box instead of a figure.

````markdown
```plot region
title: '$x^2 + y^2 < 1$'
where: "x^2 + y^2 < 1"
domain: [-2, 2]
range: [-2, 2]
```
````

## Installing from source

In this directory run `npm install` and `npm run build`, then copy **`main.js`**, **`styles.css`**, and **`manifest.json`** into `.obsidian/plugins/plot-fence/`. For day-to-day development, `npm run dev` watches and rebuilds `main.js`.
