import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

user.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json()
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    })
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt })
  }
  catch (e) {
    c.status(403);
    return c.json({ message: "Error while signing up" })
  }
})

user.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json()
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password
      }
    })
    if (user) {
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt })
    } else {
      return c.json({ message: "Invalid credentials" })
    }
  } catch (e) {
    c.status(403)
    return c.json({ message: e })
  }
})

export default user
