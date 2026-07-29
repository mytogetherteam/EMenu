# CLAUDE.md

**All architecture rules for this project live in [AGENTS.md](./AGENTS.md). Read it before writing or
reviewing any React/TypeScript code here, and follow it exactly.** Do not duplicate the rules into this
file — AGENTS.md is the single source of truth shared with Cursor, Antigravity, Windsurf and Copilot.

A dedicated subagent is available at `.claude/agents/react-clean-code-expert.md` for larger React
features, refactors, and architecture reviews.

## Commands

```bash
cp .env.example .env   # first-time setup — .env is git-ignored
npm install

npm run dev       # Vite dev server
npm run build     # tsc -b && vite build
npm run preview   # preview production build
npm run lint      # oxlint
```

## Notes

- Node **20+** is required by Vite 7. This machine's system node is 18 — use `nvm use 22.16.0` first.
