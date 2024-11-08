import { Hono } from "hono";

const user = new Hono()

user.post('/signup', (c) => {
  return c.text("Signup")
})

user.post('/signin', (c) => {
  return c.text("Signup")
})

export default user
