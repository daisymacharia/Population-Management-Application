import express from 'express'
import { createLocation } from '../controllers'

const router = express.Router()

router.get('/', (req, res) => {
  res.json('Welcome')
})

router.post('/location', createLocation)

export default router
