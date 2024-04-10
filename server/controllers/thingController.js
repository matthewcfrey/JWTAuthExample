const Thing = require('../models/thingModel.js')
const mongoose = require('mongoose')

// get all things
const getThings = async (req, res) => {
  const user_id = req.user._id

  const things = await Thing.find({user_id}).sort({createdAt: -1})
  //const things = await Thing.find({_id}).sort({createdAt: -1})

  res.status(200).json(things)
}

// get a single thing
const getThing = async (req, res) => {
  const { id } = req.params
  const user_id = req.user._id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such thing'})
  }

  const thing = await Thing.find({_id:id, user_id})

  if (!thing) {
    return res.status(404).json({error: 'No such thing'})
  }
  
  res.status(200).json(thing)
}


// create new thing
const createThing = async (req, res) => {
  const {thing} = req.body

  console.log(thing)

  let emptyFields = []

  if(!thing) {
    emptyFields.push('thing')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const createdThing = await Thing.create({thing: thing, user_id:user_id})
    res.status(200).json(createdThing)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a thing
const deleteThing = async (req, res) => {
  const { id } = req.params
  const user_id = req.user._id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such thing'})
  }

  const thing = await Thing.findOneAndDelete({_id: id, user_id})

  if (!thing) {
    return res.status(400).json({error: 'No such thing'})
  }

  res.status(200).json(thing)
}

// update a thing
const updateThing = async (req, res) => {
  const { id } = req.params
  const user_id = req.user._id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such thing'})
  }

  const thing = await Thing.findOneAndUpdate({_id: id, user_id}, {
    ...req.body
  })

  if (!thing) {
    return res.status(400).json({error: 'No such thing'})
  }

  res.status(200).json(thing)
}


module.exports = {
  getThings,
  getThing,
  createThing,
  deleteThing,
  updateThing
}