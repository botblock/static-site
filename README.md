# static-site

The Nuxt.js static site that powers BotBlock.org via Cloudflare Pages.

Access the site at <https://botblock.org>.

## Development

1. Run `make bootstrap` to clone BotBlock's open data and best practices repositories.
2. Develop with the site by running `npm run dev`.
3. Lint the codebase by running `npm run lint` (auto-fix with `npm run lint:fix`).
4. Build the site statically by running `npm run build`.

## Deployments

A single Cloudflare Pages environment is configured for this repository. Automatic deployments in
Cloudflare are disabled, and instead, branch webhooks are triggered in Cloudflare Pages from GitHub
Actions workflows for the `production` and `staging` branches.

Cloudflare Pages is set to run `make bootstrap && npm run build` when a branch webhook is triggered.

All deployments are seen as preview deployments by Cloudflare, and are tagged based on the branch
they were deployed from. Each branch is accessible as a subdomain of the base Cloudflare Pages
environment.

CNAME records have been configured for `staging.botblock.org` and `botblock.org`.
