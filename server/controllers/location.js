// const Location = require('../models/locationModel')
import Location from '../models/location'
import * as responses from '../utils/responses'
import * as utils from '../utils/validations'

export const createLocation = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    responses.emptyJsonBody(res)
  }
  const location = new Location()

  try {
    let totalPopulation = await utils.validator(req)

    const {
      body: { name, female, male },
    } = req

    Location.findOne({ name }).exec((err, existing_location) => {
      if (err) responses.serverError(res)
      else if (existing_location) {
        responses.addExistingData(res)
      } else location.name = name
      location.female = female
      location.male = male
      location.totalPopulation = totalPopulation
      location
        .save()
        .then(location => {
          responses.creationSuccess(res, location)
        })
        .catch(err => {
          responses.serverError(res, err)
        })
    })
  } catch (error) {
    responses.wrongInput(res, error)
  }
}

//   async allLocations(req, res) {
//     try {
//       let locations = await Location.find({})

//       //Sum all population

//       if (!locations)
//         return res.status(404).json({ message: 'No location found' })

//       return res.status(200).json(locations)
//     } catch (ex) {
//       return res.status(400).json(ex)
//     }
//   },

//   async retrieveLocation(req, res) {
//     try {
//       let location = await Location.findById(req.params.locationId)

//       if (!location)
//         return res.status(404).json({ message: 'Location Not Found' })

//       return res.status(200).json(location)
//     } catch (ex) {
//       return res.status(400).json(ex)
//     }
//   },

//   async updateLocation(req, res) {
//     try {
//       let location = await Location.findById(req.params.locationId)

//       if (!location)
//         return res.status(404).json({ message: 'Location Not Found' })

//       location.name = req.body.name
//       location.malePopulation = req.body.malePopulation
//       location.femalePopulation = req.body.femalePopulation

//       let updatedLocation = await location.save()
//       return res.status(200).json(updatedLocation)
//     } catch (ex) {
//       switch (ex.code) {
//         case 11000:
//           return res
//             .status(404)
//             .json({ message: 'Location name already exists' })
//         default:
//           return res.status(400).json(ex)
//       }
//     }
//   },

//   async deleteLocation(req, res) {
//     try {
//       let location = await Location.findById(req.params.locationId)

//       if (!location)
//         return res.status(404).json({ message: 'Location Not Found' })
//       await location.remove()
//       return res
//         .status(200)
//         .json({
//           message: `Successfully deleted location with id ${
//             req.params.locationId
//           }`,
//         })
//     } catch (ex) {
//       return res.status(400).json(ex)
//     }
//   },
// }
