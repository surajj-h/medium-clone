import { Hono } from "hono";
import { verify } from "hono/jwt";

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

blog.use('/*', async (c, next) => {
  const header = c.req.header("Authorization") || " "
  const token = header?.split(" ")[1]
  const response = await verify(token, c.env.JWT_SECRET)
  if (response.id) {
    next()
  } else {
    c.status(403)
    return c.json({ error: "Unauthorized" })
  }
})

blog.post('/', (c) => {
  return c.text("Post")
})

blog.put('/', (c) => {
  return c.text("Put")
})

blog.get('/bulk', (c) => {
  return c.text("Bulk posts")
})

blog.get('/:blogid', (c) => {
  return c.text("Blog id")
})

export default blog
