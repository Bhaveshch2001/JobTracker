# PERFORMANCE.md

## Why Fastify is faster than Express

# Express
1. Uses JSON.stringify() every time it sends a response
2. It checks data again and again at runtime
3. This makes it slower

# Fastify
1. Fastify takes a different approach: you define
a JSON Schema for each route response, and Fastify pre-compiles a dedicated serialization function before the server starts. That function already knows
the exact shape of the data, so it converts it to JSON using direct property access instead of runtime inspection. This is called fast-json-stringify and
it makes serialization 2–5x faster. Fastify also uses a faster radix-tree router (find-my-way) instead of Express's linear regex matching.

## What fast-json-stringify does

When you add a response schema to a route, Fastify passes it to fast-json-stringify at startup. It generates a function that looks like:

'{"id":"' + obj.id + '","title":"' + obj.title + '"}'

Because the structure is hardcoded, V8 can optimize it heavily. Unknown fields are also silently remove. It already knows what fields exist, no checking needed and direct conversion so it is super fast

## One bottleneck to watch for

GET /jobs uses skip-based pagination (skip: (page - 1) * limit). At large page numbers, PostgreSQL scans and discards thousands of rows before returning the ones you want. Fetching page 500 with limit 20 means the
database scans 9,980 rows just to throw them away. This is Very inefficient