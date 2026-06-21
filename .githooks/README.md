# Local Git hooks directory (intentionally empty)

Some machines install **global** Git hook middleware (e.g. wrappers that require VPN or SSH certs). That is **not** part of this open-source project.

This folder exists so you can point **this repository clone** at it and use **normal** Git behavior (no extra middleware):

```sh
git config core.hooksPath .githooks
```

That setting is stored only under **`.git/config`** for this clone (it is not committed).

To go back to your global hook setup later:

```sh
git config --unset core.hooksPath
```

Quality checks for this repo: run **`npm run lint`**, **`npm run typecheck`**, and **`npm run build`** before pushing (CI runs them too).

Canonical GitHub remote: **`https://github.com/meet7202/womens-health-duo`**.
