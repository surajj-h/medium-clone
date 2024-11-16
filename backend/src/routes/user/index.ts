import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput, signupInput } from "@suraj_h/medium-common";
import { Hono } from "hono";
import { sign } from "hono/jwt";

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

async function hashPassword(pass: string) {
  const encoder = new TextEncoder()
  const password = encoder.encode(pass)

  const hashBuffer = await crypto.subtle.digest('SHA-256', password)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
  return hashedPassword;
}

user.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json()
    const { success } = signupInput.safeParse(body);
    if (!success) {
      c.status(411)
      return c.json({ message: "Incorrect inputs" })
    }
    const hashedPassword = await hashPassword(body.password)
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword
      }
    })
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ jwt, name: user.name })
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
    const { success } = signinInput.safeParse(body);
    if (!success) {
      return c.json({ message: "Inputs not correct" })
    }
    const hashedPassword = await hashPassword(body.password)
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: hashedPassword
      }
    })
    if (user) {
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt, name: user.name })
    } else {
      return c.json({ message: "Invalid credentials" })
    }
  } catch (e) {
    c.status(403)
    return c.json({ message: e })
  }
})


export default user
