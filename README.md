# Office Intelligence project portal

This repository publishes the Office Intelligence research portal and its project websites:

- `https://officeintelligence.github.io/` — Office Intelligence / 办公智能
- `https://officeintelligence.github.io/xl-docbench/` — XL-DocBench
- `https://officeintelligence.github.io/docatlas/` — DocAtlas

## Preview

Open `index.html` in a modern browser, or serve the repository root with any static-file server. The two project sites are under `xl-docbench/` and `docatlas/`.

## Figure sources

The site uses static PNG renders of the research figures. They are stored in `assets/figures/` to avoid PDF browser controls, internal scrolling, and resizing differences across browsers. The rendered assets correspond to:

- `XL-DocBench.pdf` — construction pipeline
- `main/reasoning_labels_evidence_structure.pdf` — taxonomy and evidence structure
- `main/fig_stats.pdf` — dataset composition
- `main/fig_exp_diagnostics.pdf` — performance diagnostics
- `main/fig_agent_answer_yield.pdf` — agent answer yield
- `main/fig_agent_retrieval_dynamics.pdf` — evidence-hit dynamics
- `case/cross-doc-temporal.pdf` — cross-document case study

The repository is self-contained: its static figure images are already included.

## Current scope

The root is a responsive Office Intelligence portal. Each project subdirectory is a self-contained static academic site with its own figures, interactions, bilingual copy, and results tables. Paper, Dataset, Code, and Model destination URLs remain disabled until release URLs are available.

## GitHub Pages deployment

The repository includes `.github/workflows/deploy-pages.yml`. After this project is pushed to GitHub, enable **GitHub Actions** under the repository's **Settings → Pages** source. Every push to `main` validates and deploys the repository root automatically.

Because this repository is named `officeintelligence.github.io`, GitHub publishes the portal at the account root and preserves each project directory as a subpath. All sites use relative asset paths.
