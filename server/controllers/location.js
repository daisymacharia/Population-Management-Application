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

export const getAllLocations = async (req, res) => {
  Location.find({})
    .populate('sublocations')
    .exec((err, location) => {
      if (err) responses.serverError(res, err)
      location
        ? responses.getSuccess(res, location)
        : responses.noLocations(res)
    })
}

export const getSingleLocation = async (req, res) => {
  try {
    await utils.verifyId(req.params.locationId)

    Location.findById(req.params.locationId)
      .populate('sublocations')
      .exec((err, location) => {
        if (err) responses.serverError(res, err)
        location
          ? responses.getSuccess(res, location)
          : responses.locationNotFound(res, req.params.locationId)
      })
  } catch (error) {
    responses.wrongInput(res, error)
  }
}

export const updateLocation = async (req, res) => {
  let id = req.params.locationId
  try {
    await utils.verifyId(id)
    let totalPopulation = await utils.validator(req)
    const {
      body: { name, female, male },
    } = req
    let location = { name, female, male, totalPopulation: totalPopulation }

    Location.findByIdAndUpdate(id, location, { new: true }).exec(
      (error, newLocation) => {
        if (error) {
          responses.serverError(res, {
            message: 'location name already exists',
          })
        } else {
          newLocation
            ? responses.updateSuccess(res, newLocation)
            : responses.locationNotFound(res, req.params.locationId)
        }
      }
    )
  } catch (err) {
    responses.serverError(res, err)
  }
}

export const deleteLocation = async (req, res) => {
  let id = req.params.locationId
  try {
    await utils.verifyId(id)

    Location.findById(id).exec((error, deletedLocation) => {
      if (!deletedLocation) responses.locationNotFound(res)
      if (deletedLocation) {
        deletedLocation.remove().then(deletedItem => {
          responses.deleteSuccess(res, id)
        })
      }
    })
  } catch (err) {
    responses.serverError(res, err)
  }
}
