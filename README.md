# AI Attributes Audit

Audit how completely your AI telemetry follows the OpenTelemetry GenAI semantic
conventions — a native Dynatrace AppEngine app.

AI Attributes Audit scans the `gen_ai.*` spans your collectors already emit into
Dynatrace Grail and, section by section, reports which expected attributes are
**present** versus **missing** across your fleet — so you can find and close
instrumentation gaps before they cost you observability.

> Carved out of [AI Observability 3.0](https://github.com/dberanjr/AIObservability3.0),
> where this began life as one of its tabs. It shares that app's global scope
> model (timeframe + segments + filters + sampling + scan-limit) so audit numbers
> line up with what you see there.

---

## What it does

The OpenTelemetry GenAI conventions define a rich attribute surface for agents,
tools, models, prompts, retrieval, evaluation, and platform context — but most
fleets emit only a fraction of it. This app is the inventory: it knows the full
catalog of attributes worth emitting, probes your spans for each one, and shows
you exactly where you stand.

- **Coverage overview** — an overall coverage ring plus hero stats: attributes
  present (X/Y), categories complete, categories with gaps, and
  (sampling-extrapolated) span activity.
- **Sectioned catalog** — attributes grouped across six areas: **Core**
  (LLM/inference `gen_ai.*`), **Orchestration** (Agent, Traceloop workflow,
  LangGraph), **Tools** (`gen_ai.tool.*`, MCP `mcp.*`), **Retrieval** (vector
  DB), **Quality** (evaluation & quality, session & user), and **Platform**
  (infrastructure/platform context).
- **Live table-of-contents** that jumps to and expands any section.
- **Per-attribute detail** — Present/Missing verdict, a "what it buys you"
  one-liner, a coverage bar with span count, and a detail modal that links to
  the canonical OTel / OpenLLMetry specs. A caveat explains that heavy sampling
  can produce false "missing" readings.

## Global scope

Every number on the page honours the toolbar selections, exactly like the parent
app:

- **Timeframe** — header selector that persists per user and travels in the URL.
- **Segments** — Dynatrace filter-segments (with variables) to slice the fleet
  by team, service, environment, or deployment.
- **Global attribute filter** — click-to-filter on any value, with on-demand
  server-side value discovery for high-cardinality keys.
- **Sampling** — extrapolate from a sampled span population.
- **Scan limit** — 500 GB / 1 TB / 2 TB / 5 TB query budget; every query routes
  through `useScopedDql`, which rewrites `scanLimitGBytes` and injects segments +
  global filters.

## Getting started

```bash
npm install
npm run start      # dev server
npm run build      # production bundle to dist/
npm run deploy     # deploy to the tenant in app.config.json
```

Other scripts: `npm run typecheck`, `npm run lint`, `npm test`.

Set your environment in `app.config.json` (`environmentUrl`) before deploying.

## Required permissions

Declared in `app.config.json`:

| Scope | Why |
|---|---|
| `storage:spans:read` | Read spans for attribute-coverage auditing |
| `storage:buckets:read` | Grail bucket-level access to the spans table |
| `storage:entities:read` | Resolve AppCI entity IDs and service names |
| `storage:lookups:read` | Lookup CMDB entities for scope resolution |
| `storage:filter-segments:read` | Apply tenant-defined filter segments |
| `storage:files:read` | Read `/lookups/dynatrace/*` for segment variables |
| `storage:smartscape:read` | Read smartscape nodes/relations for topology segments |
| `state:user-app-states:read` / `:write` | Persist per-user scan-limit & sampling |

## Project layout

```
ui/app/
├── pages/AttributeAudit/   The audit page: catalog, queries, hooks, panels
├── scope/                  Timeframe, segments, scan-limit, sampling, global
│                           filter contexts + the useScopedDql query rewriter
├── layout/                 Global filter strip + sampling/scan-limit controls
├── components/             Header, footer, and shared leaf components
├── data/                   Formatting helpers
├── lib/                    Tenant helpers
└── theme/                  Theme tokens + styles
```

## License

MIT — see [LICENSE](./LICENSE).
