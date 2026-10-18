# Notice: who owns what

This repository mixes third-party code (the Chirpy theme) and my own work.
They are not under the same terms.

## 1. Chirpy: MIT License, © 2021 Cotes Chung

The site is built with the [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) Jekyll theme
(gem `jekyll-theme-chirpy`) and was bootstrapped from
[chirpy-starter](https://github.com/cotes2020/chirpy-starter).
The [LICENSE](LICENSE) file (MIT, Cotes Chung) covers:

- starter files: `.editorconfig`, `.gitattributes`, `.gitmodules`, `.nojekyll`, `Gemfile`, `Gemfile.lock`,
  `index.html`, `_config.yml` (structure; the values are mine), `_data/`, `_plugins/`,
  `_tabs/archives.md`, `_tabs/categories.md`, `_tabs/tags.md`, `.github/workflows/pages-deploy.yml`
- `_includes/js-selector.html`: copy of the theme file, modified by me to load the language toggle
  and the cookie consent script
- `_includes/footer.html`: copy of the theme file, modified by me to add the "Cookies" settings link

The theme gem and the `assets/lib` submodule
([chirpy-static-assets](https://github.com/cotes2020/chirpy-static-assets)) keep their own licenses.

## 2. My work: © 2023–2026 Steven Moire Bordier, all rights reserved

- written content: `_posts/`, `projects/`, `_tabs/about.md`, `_tabs/projects.md`, `README.md`
- images: `assets/img/avatar.jpg`, `assets/img/social-preview.png`
- code written for this site: `assets/js/lang-toggle.js`, `assets/js/cookie-consent.js`, `_layouts/post.html`,
  `_includes/metadata-hook.html`

No license is granted for these files. Reading and linking are welcome; reuse or republication
requires my permission: [steven.bordier@gmail.com](mailto:steven.bordier@gmail.com).
