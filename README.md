# catalog-search

TypeScript-compiled Express with ordinary JavaScript domain modules application. Native setup `npm ci`; tests `npm test`.
Build `npm run build`; Start `npm start`; PORT defaults to3202, all-interface listener.
Liveness `/health/live`; declared health/readiness `/health`.
GET /products?category=office&minPriceCents=100&maxPriceCents=1000&offset=0&limit=10. Immutable catalog, stable source order, integer cents; invalid ranges400.

Data is in memory or immutable source and does not survive process replacement.

Tests use in-process domain fixtures and ephemeral loopback HTTP. 
AI-assisted researcher-authored application; shared scaffolding is disclosed outside this app. No deployment configuration is supplied.
