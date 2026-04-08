const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const { auth } = require('../middleware/auth')

const prisma = new PrismaClient()

// GET all (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } })
    res.json(testimonials)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { clientName, company, quote, rating, order } = req.body
    const testimonial = await prisma.testimonial.create({
      data: { clientName, company: company || null, quote, rating: rating ? parseInt(rating) : 5, order: order ? parseInt(order) : 0 }
    })
    res.status(201).json(testimonial)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT update (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { clientName, company, quote, rating, order } = req.body
    const testimonial = await prisma.testimonial.update({
      where: { id: parseInt(req.params.id) },
      data: { clientName, company: company || null, quote, rating: rating ? parseInt(rating) : 5, order: order ? parseInt(order) : 0 }
    })
    res.json(testimonial)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ message: 'Testimonial deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
