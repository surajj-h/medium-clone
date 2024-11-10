import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    authorId: string
  }
}>()

blogRouter.use('/*', async (c, next) => {
  const header = c.req.header("Authorization") || " "
  const token = header?.split(' ')[1]
  const response = await verify(token, c.env.JWT_SECRET)
  if (!response) {
    c.status(403)
    return c.json({ error: "Unauthorized" })
  }
  c.set('authorId', response.id)
  await next()
})

blogRouter.post('/create', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json()
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get('authorId')
      }
    })
    return c.json({ post })
  } catch (e) {
    c.status(400)
    return c.json({ message: "Error creating post" })
  }
})

blogRouter.put('/update', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json()
    const post = await prisma.post.update({
      where: {
        id: body.id,
        authorId: c.get('authorId')
      },
      data: {
        title: body.title,
        content: body.content
      },
      select: {
        title: true,
        content: true
      }
    })
    return c.json({ post })
  } catch (e) {
    return c.json({ message: "Error updating blog" })
  }
})

blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const blogs = await prisma.post.findMany({
      select: {
        title: true,
        content: true
      }
    })
    return c.json({ blogs })
  } catch (e) {
    return c.json({ message: "Error fetching blogs" })
  }
})

blogRouter.get('/:blogid', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  try {
    const blogId = c.req.param('blogid')
    const blog = await prisma.post.findFirst({
      where: {
        id: blogId
      },
      select: {
        title: true,
        content: true
      }
    })
    return c.json({ blog })
  } catch (e) {
    return c.json({ messsage: "Error while fetching blog" })
  }
})

export default blogRouter
