# Devies Reads

This is an example Next.js application which consumes an OpenAPI API

It uses [openapi-typescript](https://github.com/drwpow/openapi-typescript) to generate typescript bindings from the OpenAPI Schema.

## Running

Install (I used pnpm)

```sh
pnpm install
```

Run

```sh
pnpm run dev
```

## Testing

There is a Cypress End-to-end test available which tests the core flow. Run with:

```sh
pnpm run cypress:open
```

There is a Vitest unit test available which tests the search functionality. Run with:

```sh
pnpm run test
```
