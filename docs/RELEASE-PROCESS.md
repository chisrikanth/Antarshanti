# Release process: nothing reaches antarshanti.co.in until you approve it

## Environments (updated)
| Environment | Git branch | Database | Payments | Address |
|---|---|---|---|---|
| **Production** | `main` | `antarshanti-prod` | Razorpay **live** keys | antarshanti.co.in |
| **Staging** (stable test link) | `staging` | `antarshanti-test` | Razorpay **test** keys | `https://staging--aquamarine-croquembouche-26e205.netlify.app` |
| **Feature branches** | e.g. `claude/stoic-cori-xrotsf` | `antarshanti-test` | test keys | `https://<branch>--aquamarine-croquembouche-26e205.netlify.app` |
| **Pull request previews** | PR into `main` | `antarshanti-test` | test keys | `https://deploy-preview-<n>--aquamarine-croquembouche-26e205.netlify.app` |

Every non-production page shows a dark **TEST SITE** strip at the top, so nobody mistakes it for the live site.

**Flow:** feature branch → merge into `staging` → you review the staging address → merge `staging` into `main` → production updates.

## Netlify environment variables, one value per deploy context
Netlify → Site configuration → Environment variables → *Add a variable* → choose **Different value for each deploy context**.
| Variable | Production | Deploy Previews + Branch deploys |
|---|---|---|
| `SUPABASE_URL` | `https://kntohzyxzoucymrmriva.supabase.co` | `https://rnofqxmfwqiogtlchkbp.supabase.co` |
| `SUPABASE_SERVICE_KEY` | prod project's service_role key | test project's service_role key |
| `RAZORPAY_KEY_ID` | `rzp_live_...` | `rzp_test_...` |
| `RAZORPAY_KEY_SECRET` | live secret | test secret |
| `RAZORPAY_WEBHOOK_SECRET` | secret you choose for the live webhook | secret you choose for the test-mode webhook |

Safety net in code: a test address refuses to use a live Razorpay key or the production database, and production refuses test keys or the test database. A wrong setting shows an error instead of moving real money or data.

## The three environments (original notes)
| Environment | Branch | Address | Who sees it |
|---|---|---|---|
| **Production** | `main` | antarshanti.co.in | Everyone |
| **Test (branch deploy)** | any other branch, e.g. `claude/stoic-cori-xrotsf` | `https://<branch-name>--aquamarine-croquembouche-26e205.netlify.app` (slashes in the branch name become `-`) | Anyone with the link |
| **Pull request preview** | any pull request into `main` | `https://deploy-preview-<number>--aquamarine-croquembouche-26e205.netlify.app` | Anyone with the link |

Netlify rebuilds the test address on every push to that branch. The exact address is shown in Netlify → Deploys → **Branch deploys** (or in the pull request's checks).

## The flow
1. Work happens on a branch (never directly on `main`).
2. Netlify builds that branch to its test address. Production does not change.
3. You review on your phone and laptop. You say what to change; the branch is updated; the test address refreshes.
4. When you approve, open a pull request into `main` and merge it. Only then does Netlify rebuild antarshanti.co.in.
5. Check production. If something is wrong, Netlify → Deploys → pick the last good deploy → **Publish deploy** (instant rollback, no code change).

## Extra safety switches (optional)
- **Stop auto publishing** (Netlify → Deploys → Stop auto publishing): `main` builds but waits for you to press *Publish deploy*. A manual gate on top of the merge.
- **Protect `main` on GitHub** (Settings → Branches → require a pull request): nobody, including an assistant, can push straight to production.

## Things that are shared between test and production (be careful)
- **Razorpay:** `src/bach.njk` holds the live Razorpay key. A payment on the test address is a real payment. Do not pay on a test address until test keys are set up for test deploys.
- **Supabase:** test and production use the same database, so a check-in saved while testing lands in the real table. Use obviously fake names and delete test rows, or use a second free Supabase project for tests.
- **WhatsApp, UPI:** the same real numbers everywhere.
- **Search engines:** the policy pages are marked noindex until you approve them. Test addresses should not be shared publicly.
