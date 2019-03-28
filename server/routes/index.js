import express from 'express'
import {
  createLocation,
  getAllLocations,
  getSingleLocation,
  updateLocation,
  deleteLocation,
  createSubLocation,
  getSubLocations,
  getSingleSubLocation,
  updateSubLocation,
  deleteSubLocation,
} from '../controllers'

const router = express.Router()

router.get('/', (req, res) => {
  res.json('Welcome')
})

router.post('/location', createLocation)
router.get('/location', getAllLocations)
router.get('/location/:locationId', getSingleLocation)
router.put('/location/:locationId', updateLocation)
router.delete('/location/:locationId', deleteLocation)

router.post('/location/:locationId/sub', createSubLocation)
router.get('/location/:locationId/sub/', getSubLocations)
router.get('/location/:locationId/sub/:subId', getSingleSubLocation)
router.put('/location/:locationId/sub/:subId', updateSubLocation)
router.delete('/location/:locationId/sub/:subId', deleteSubLocation)

export default router
