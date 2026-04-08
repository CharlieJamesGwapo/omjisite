const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const { auth } = require('../middleware/auth')

const prisma = new PrismaClient()

// GET all (public)
router.get('/', async (req, res) => {
  try {
    const certs = await prisma.certification.findMany({ orderBy: { order: 'asc' } })
    res.json(certs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, issuer, type, order } = req.body
    const cert = await prisma.certification.create({
      data: { title, issuer, type: type || 'completion', order: order ? parseInt(order) : 0 }
    })
    res.status(201).json(cert)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT update (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, issuer, type, order } = req.body
    const cert = await prisma.certification.update({
      where: { id: parseInt(req.params.id) },
      data: { title, issuer, type: type || 'completion', order: order ? parseInt(order) : 0 }
    })
    res.json(cert)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.certification.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ message: 'Certification deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
