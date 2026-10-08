# Office Intelligence

Research homepage and project sites:

- [Office Intelligence — English](https://officeintelligence.github.io/)
- [Office Intelligence — 简体中文](https://officeintelligence.github.io/zh.html)
- [DocAtlas](https://officeintelligence.github.io/docatlas/) · NeurIPS 2026
- [XL-DocBench](https://officeintelligence.github.io/xl-docbench/) · NeurIPS 2026

## Homepage

The bilingual homepage presents an office organization and four linked research uses: environments, evaluation, training, and harnesses. It includes an OfficeTown task and computer explorer, DocAtlas Web/terminal recordings, an XL-DocBench question with evidence, and eight professional domains.

The page uses a warm-neutral palette, self-hosted Latin/Chinese fonts, keyboard-accessible panels and native language links. Animations support pause, reduced-motion preferences, offscreen suspension and no-JavaScript reading fallbacks.

## Files

- `index.html`, `zh.html`: English and Simplified Chinese homepages.
- `assets/homepage/`: homepage styles, scripts, icons, office image, recording excerpts and fonts.
- `assets/homepage/fonts/`: Chinese webfont subsets and accompanying SIL OFL licenses. Latin font licenses are in `assets/homepage/`.
- `docatlas/`, `xl-docbench/`: existing self-contained project sites, including their original figures, authors, results and resource links.
- `assets/figures/`, `assets/vendor/`: existing shared resources.
- `tools/validate-site.mjs`: dependency-free static asset, anchor, metadata and license checks.

The older root-level portal scripts/styles remain for compatibility; the current homepage uses only the namespaced `assets/homepage/` resources. Review screenshots, full font-source TTFs, private manuscripts, task bundles and local research notes are not part of the homepage package.

## Local preview and validation

```sh
uv run --no-project python -m http.server 8000 --bind 127.0.0.1
node tools/validate-site.mjs
```

Open `http://127.0.0.1:8000/` or `/zh.html`. No application server or API key is needed.

## GitHub Pages

`.github/workflows/deploy-pages.yml` validates and deploys the repository on pushes to `main`. Pages uses GitHub Actions as its source. The account-root deployment preserves `/docatlas/` and `/xl-docbench/` as project subpaths.
