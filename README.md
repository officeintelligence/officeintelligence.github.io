# Office Intelligence project portal

This repository publishes the Office Intelligence research portal and its project websites:

- `https://officeintelligence.github.io/` — Office Intelligence
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

The root presents a research vision for knowledge-work agents: continuing work,
reviewable deliverables, role-scoped environments, and data for evaluation and learning.
Documents, spreadsheets, Slides, images, video, audio, 3D and CAD, reports, code,
data, correspondence, and planning are parallel parts of this vision, not a
claim that every artifact or workflow has already been validated. Nine work
families connect these materials to practical deliverables.

Twelve illustrative professional settings are presented through keyboard-accessible tabs:
finance, assurance, clinical operations, design, entertainment, industrial, legal,
research and education, marketing and commerce, people and operations, product
and strategy, and software. Domain examples describe research directions and review requirements,
not authorization for real-world professional decisions.

The opening uses a local Canvas 2D background of connected work artifacts.
A left-weighted white mask protects the text while the right remains more visible.
The animation has a pause control, starts static for reduced-motion preferences,
and stops when the intro is offscreen or the page is hidden. It requires no
external animation library or private assets.

Unreleased project names, manuscript figures, private documents, benchmark counts,
and submission details are intentionally absent from the portal. Only existing
public figures are used. The two public project entries retain their original
authors, figures, statistics, and links, and are marked NeurIPS 2026.

Each project subdirectory is a self-contained static academic site with its own
figures, interactions, bilingual copy, and results tables. DocAtlas links to its
paper and code; XL-DocBench links to its paper and dataset.

## GitHub Pages deployment

The repository includes `.github/workflows/deploy-pages.yml`. After this project is pushed to GitHub, enable **GitHub Actions** under the repository's **Settings → Pages** source. Every push to `main` validates and deploys the repository root automatically.

Because this repository is named `officeintelligence.github.io`, GitHub publishes the portal at the account root and preserves each project directory as a subpath. All sites use relative asset paths.
