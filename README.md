# XL-DocBench project website

This repository contains the static project website for XL-DocBench.

## Preview

Open `index.html` in a modern browser, or serve the repository root with any static-file server.

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

This first version is a responsive, zero-dependency research landing page. The Paper, Dataset, and Code destination URLs are intentionally not added yet because release URLs were not present in the workspace.

## GitHub Pages deployment

The repository includes `.github/workflows/deploy-pages.yml`. After this project is pushed to GitHub, enable **GitHub Actions** under the repository's **Settings → Pages** source. Every push to `main` validates and deploys the repository root automatically.

For a project repository, GitHub publishes the page at `https://<owner>.github.io/<repository>/`. If the repository itself is named `<owner>.github.io`, the site is published at the account root instead. The site uses relative asset paths, so the same build works for either URL structure.
