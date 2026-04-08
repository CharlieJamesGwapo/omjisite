const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const { JWT_SECRET } = require('../middleware/auth')

const prisma = new PrismaClient()

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await prisma.user.findUnique({ where: { username } })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, username: user.username })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
