```
npm install
npm run dev
```

DEPLOY

- [x] Deploy to Render

ENDPOINTS & DOCS

- [x] install hono zod(validation) openapi ([link](https://github.com/honojs/middleware/tree/main/packages/zod-openapi))
- [x] configure not found and error handlers ([link](https://hono.dev/docs/api/hono#not-found))
- [x] setup env (with type safety using zod)

- [x] add documentation endpoint ([link](https://hono.dev/examples/zod-openapi))
- [x] add documented routes ([link](https://hono.dev/examples/zod-openapi))
- [x] create interactive documentation using scalar ([link](https://github.com/scalar/scalar/blob/main/packages/hono-api-reference/README.md)). ([link](https://github.com/scalar/scalar/blob/main/documentation/configuration.md))

DB

- [x] setup drizzle neon postgres
- [x] setup db tables & schema
- [x] create validation schemas from db table schema ([drizzle zod](https://orm.drizzle.team/docs/zod))
- [x] connect inventory routes to db
- [x] implement password hashing ([bcrypt](https://www.npmjs.com/package/bcrypt))
- [ ] connect auth routes to db
