const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const { auth } = require('../middleware/auth')

const prisma = new PrismaClient()

// POST submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required' })
    }
    await prisma.contact.create({ data: { name, email, subject: subject || null, message } })
    res.status(201).json({ message: 'Message sent successfully!' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET all messages (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const messages = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT mark as read (admin only)
router.put('/:id/read', auth, async (req, res) => {
  try {
    const contact = await prisma.contact.update({
      where: { id: parseInt(req.params.id) },
      data: { read: true }
    })
    res.json(contact)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE message (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.contact.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ message: 'Message deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
