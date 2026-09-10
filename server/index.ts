import 'dotenv/config'
import express, { type ErrorRequestHandler } from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createPool } from 'mysql2/promise'
import type { RowDataPacket, ResultSetHeader } from 'mysql2'

const app = express()
app.use(cors())
app.use(express.json())

// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_PORT:', process.env.DB_PORT);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_NAME:', process.env.DB_NAME);

const pool = createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'essay_app',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'essay_web',
  waitForConnections: true,
  connectionLimit: 10,
})

app.get('/api/essays', async (_req, res, next) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, title, created_at FROM essays ORDER BY created_at DESC'
    )
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

app.get('/api/essays/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, title, content, created_at FROM essays WHERE id = ?',
      [req.params.id]
    )
    if (!rows.length) {
      res.status(404).json({ error: 'Essay not found' })
      return
    }
    res.json(rows[0])
  } catch (err) {
    next(err)
  }
})

app.post('/api/essays', async (req, res, next) => {
  try {
    const { title, content } = req.body
    if (!title || typeof title !== 'string') {
      res.status(400).json({ error: 'Title is required' })
      return
    }
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO essays (title, content) VALUES (?, ?)',
      [title, content ?? null]
    )
    res.status(201).json({ id: result.insertId })
  } catch (err) {
    next(err)
  }
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.resolve(__dirname, '../dist')

app.use(express.static(distPath))
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) return next()
  res.sendFile(path.join(distPath, 'index.html'))
})

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
;(async () => {
  try {
    const connection = await pool.getConnection()
    await connection.query('SELECT 1')
    connection.release()
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to connect to MariaDB', err)
    process.exit(1)
  }
})()
