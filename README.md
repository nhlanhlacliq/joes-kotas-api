```
npm install
npm run dev
```

This API allows users to register, login, and view their inventory.
Third party libraries used:

- HonoOpenAPI: Hono wrapper that enables OpenAPI spec documentation (Used to document the available endpoints on the api, found at /reference - used alongside Scalar for interactive api documentation)
- Zod: A TypeScript-first schema validation library (Used to validate the input data for the API endpoints and database schemas)
- Bcyrpt: Crypography library (Used to generate secure password hashes - database stores password hashes instead of user's passwords)

---

### TODO

- [x] Deploy to Render

- [x] install hono zod(validation) openapi ([link](https://github.com/honojs/middleware/tree/main/packages/zod-openapi))
- [x] configure not found and error handlers ([link](https://hono.dev/docs/api/hono#not-found))
- [x] setup env (with type safety using zod)

- [x] add documentation endpoint ([link](https://hono.dev/examples/zod-openapi))
- [x] add documented routes ([link](https://hono.dev/examples/zod-openapi))
- [x] create interactive documentation using scalar ([link](https://github.com/scalar/scalar/blob/main/packages/hono-api-reference/README.md)). ([link](https://github.com/scalar/scalar/blob/main/documentation/configuration.md))

- [x] setup drizzle neon postgres
- [x] setup db tables & schema
- [x] create validation schemas from db table schema ([drizzle zod](https://orm.drizzle.team/docs/zod))
- [x] connect inventory routes to db
- [x] implement password hashing ([bcrypt](https://www.npmjs.com/package/bcrypt))
- [x] connect auth routes to db, create auth token
- [x] add auth middleware to verify users on inventory routes ([docs](https://github.com/honojs/middleware/tree/main/packages/zod-openapi#configure-middleware-for-each-endpoint))
