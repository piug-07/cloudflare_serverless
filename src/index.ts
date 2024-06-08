import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { bookRouter } from './routes/blog';
import { cors } from 'hono/cors'

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();



// CORS middleware
app.use('/api/*', cors())

app.route('/api/v1/user', userRouter)
app.route('/api/v1/book', bookRouter)



app.get('/', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  return c.text('Hello Hono!')
})

export default app
