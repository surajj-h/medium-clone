import { Hono } from "hono";

const blog = new Hono()

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
