const express = require('express')
const {
  createThing,
  getThings,
  getThing,
  deleteThing,
  updateThing
} = require('../controllers/thingController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all thing routes
router.use(requireAuth)

// GET all things
router.get('/', getThings)

//GET a single thing
router.get('/:id', getThing)

// POST a new thing
router.post('/', createThing)

// DELETE a thing
router.delete('/:id', deleteThing)

// UPDATE a thing
router.patch('/:id', updateThing)


module.exports = router