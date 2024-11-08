import { Hono } from 'hono'
import blog from './blog'
import user from './user'

const app = new Hono()

app.route('/api/v1/user', user)
app.route('/api/v1/blog', blog)

export default app
