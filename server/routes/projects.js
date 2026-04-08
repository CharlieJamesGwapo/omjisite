const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const { auth } = require('../middleware/auth')

const prisma = new PrismaClient()

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'))
})
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } })

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST create project (admin only)
router.post('/', auth, upload.array('screenshots', 5), async (req, res) => {
  try {
    const { title, subtitle, category, description, demoUrl, repoUrl, urlBadge, gradientFrom, gradientTo, featured, order } = req.body
    const techTags = req.body.techTags ? JSON.parse(req.body.techTags) : []
    const existingScreenshots = req.body.existingScreenshots ? JSON.parse(req.body.existingScreenshots) : []
    const uploadedScreenshots = req.files ? req.files.map(f => '/uploads/' + f.filename) : []
    const screenshots = [...existingScreenshots, ...uploadedScreenshots]

    const project = await prisma.project.create({
      data: {
        title, subtitle: subtitle || null, category: category || 'webapp',
        description, techTags, gradientFrom: gradientFrom || '#0ea5e9',
        gradientTo: gradientTo || '#6366f1', demoUrl: demoUrl || null,
        repoUrl: repoUrl || null, screenshots, featured: featured === 'true' || featured === true,
        urlBadge: urlBadge || null, order: order ? parseInt(order) : 0
      }
    })
    res.status(201).json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT update project (admin only)
router.put('/:id', auth, upload.array('screenshots', 5), async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { title, subtitle, category, description, demoUrl, repoUrl, urlBadge, gradientFrom, gradientTo, featured, order } = req.body
    const techTags = req.body.techTags ? JSON.parse(req.body.techTags) : []
    const existingScreenshots = req.body.existingScreenshots ? JSON.parse(req.body.existingScreenshots) : []
    const uploadedScreenshots = req.files ? req.files.map(f => '/uploads/' + f.filename) : []
    const screenshots = [...existingScreenshots, ...uploadedScreenshots]

    const project = await prisma.project.update({
      where: { id },
      data: {
        title, subtitle: subtitle || null, category: category || 'webapp',
        description, techTags, gradientFrom: gradientFrom || '#0ea5e9',
        gradientTo: gradientTo || '#6366f1', demoUrl: demoUrl || null,
        repoUrl: repoUrl || null, screenshots, featured: featured === 'true' || featured === true,
        urlBadge: urlBadge || null, order: order ? parseInt(order) : 0
      }
    })
    res.json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// DELETE project (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: parseInt(req.params.id) } })
    res.json({ message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
