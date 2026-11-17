## [t2] Verified Node/Next/Express toolchain
- Codebase/domain discoveries: The approved plan does not specify framework or Node versions, and the project has no package manifest yet. Active Node.js v22.21.0/npm 10.9.4 works with a temporary Next.js 16.4.6 and Express 5.3.0 installation. Docker is not installed.
- Wrong assumptions and corrections: `rearchitecture/context.md`, `decisions.md`, and `team/devops/{log,inbox}.md` were not present at task start; continued using the available plan, task metadata, and board, with no task dependency artifacts assigned.
- Debugging dead-ends and what actually worked: `npm view` provided registry versions/engine requirements; an isolated temporary installation and CLI/module smoke test verified compatibility without prematurely creating project dependencies.
- Techniques/patterns worth reusing: Validate framework install/run in a temporary directory before the app scaffold exists; keep the project dependency set and lockfile owned by the scaffold task.
- Learnings consumed: []
