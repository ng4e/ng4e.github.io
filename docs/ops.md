# gambetech.com — ops runbook

One page for running the site. No secrets here. The content model and fixed URLs are in
`docs/architecture/case-studies.md`; the product spec is the PRD (`po-backtest-website/prd.md`).

## 1. Branches and deploys

**A merge to `develop` is a production deploy.** `.github/workflows/deploy.yml` builds and
publishes to GitHub Pages on every push to `develop` (it can also be run by hand from the Actions tab).

**During v1** (until the `v1 → develop` PR is merged):

1. Every item branches from `v1` (never from another item's branch) and opens one PR into `v1`.
2. There is no `gh` on the laptop, so the agent pushes the branch and hands over a link:
   `https://github.com/ng4e/ng4e.github.io/compare/v1...<branch>?expand=1`. The founder opens the PR
   and merges it into `v1` on GitHub.
3. When every v1 item is in, the founder reviews `v1` locally:
   ```
   git fetch origin && git switch v1 && git pull --ff-only
   npm ci && npm run build && npm run preview     # http://localhost:4321
   ```
4. One final PR, `v1 → develop`. Merging it deploys. Then the orchestrator's website row goes back
   to `develop` (the UPDATE is in `seed-products.sql`'s header).

**After v1:** each case study is its own branch from `develop` and its own PR into `develop`. The
founder merges it after the same local review.

Never: a direct push to `develop` by an agent, `--force` on any branch, editing `public/CNAME`.

## 2. Rollback

Revert the merge commit on `develop` and push. That is one deploy.

```
git fetch origin && git switch develop && git pull --ff-only
git log --first-parent --merges --oneline -10     # the bad "Merge pull request #N …" line
git revert -m 1 <merge-sha>                       # -m 1 keeps develop's side
git push origin develop                           # founder only: this deploys
```

Instead of the command line, the founder can use the **Revert** button on the merged PR's page. It
opens a revert PR; merging that PR deploys.
Then check that the deploy run is green (§3) and that the page is back.

## 3. Monitoring and first moves

- **UptimeRobot**: an HTTP(s) monitor on `https://gambetech.com/`, 5-minute interval, alerting the
  founder by email. In place since 29 Sept 2026.
- **When it alerts**, check in this order:
  1. `curl -I https://gambetech.com`: note the status code and whether `server: cloudflare` is
     present.
  2. GitHub status: https://www.githubstatus.com (Pages, Actions).
  3. Cloudflare status: https://www.cloudflarestatus.com.
  4. The last deploy run: https://github.com/ng4e/ng4e.github.io/actions/workflows/deploy.yml.
     If a bad deploy caused it, roll back (§2). If a green deploy of a good commit was hit by a
     transient failure, use **Run workflow** on `develop`.
- **Bad content** rather than an outage: roll back (§2).
- **Readers** reach the founder on LinkedIn. There is no support queue and no response-time promise.

## 4. Domain and DNS

- Registrar: **Porkbun**. `gambetech.com` expires **2027-03-03**. Auto-renew was checked on
  29 Sept 2026. Re-check it and the card on file each January.
- DNS and proxy: **Cloudflare** in front of **GitHub Pages** (`ng4e/ng4e.github.io`). The custom
  domain comes from `public/CNAME` and `site` in `astro.config.mjs`; never change either.
- Analytics: Umami Cloud. It sets no cookie, so no banner is needed.

## 5. NMT backlink (founder, Play Console)

NMT has no public web page, so its "built by GambeTech" link lives in its store listing. **Once
`https://gambetech.com/realisations/nmt/` is live**:

- Store listing → Website: `https://gambetech.com/realisations/nmt/`
- Full description, one added line: « Conçu par GambeTech »

## 6. Monthly case-study cycle (checklist)

- [ ] The founder writes the French text from the template (architecture note §8) and notes the
      time. If it took over 3 h, cut the template before the next one.
- [ ] An agent item adds `src/content/case-studies/<slug>.yaml`: `fr:` verbatim, `en:` drafted with
      no added claims, `draft: false`. It also adds the slug to `scripts/published.json`. The branch
      starts from `develop`.
- [ ] The gate is green: `npx astro check`, `npm run build`, `npm run check`.
- [ ] The founder reviews locally (§1, step 3), reads the English draft and approves the PR.
- [ ] Merge: this deploys. `/realisations/<slug>/` and `/en/work/<slug>/` answer 200.
- [ ] The product's backlink PR in its own repo, which follows that repo's merge rule. For NMT,
      see §5.
- [ ] A LinkedIn post linking straight to the case study.
- [ ] Close the ledger rows (§7).

## 7. Closing a ledger row

Founder tasks and hand-run items are closed in the orchestrator database, from
`~/gambetech/00-product-manager`:

```
docker exec gt-orchestrator-postgres-1 sh -c 'psql -U "$POSTGRES_USER" -d orchestrator -c \
  "UPDATE work_item SET status = '"'"'done'"'"', updated_at = now() WHERE idempotency_key = '"'"'<KEY>'"'"';"'
```

Expect `UPDATE 1`. Then add one line to `po-backtest-website/session-log.md`:
`- <date> · build · notes: <KEY> — PR #<n> merged into <branch> — done by hand (local session)`.
