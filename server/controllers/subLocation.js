import Sublocation from '../models/sublocations'
import Location from '../models/location'

import * as responses from '../utils/responses'
import * as utils from '../utils/validations'

export const createSubLocation = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    responses.emptyJsonBody(res)
  }
  const location = new Sublocation()

  try {
    let totalPopulation = await utils.validator(req)
    let id = req.params.locationId

    const {
      body: { name, female, male },
    } = req

    Location.findById(id).exec((error, parentLocation) => {
      if (parentLocation) {
        Sublocation.findOne({ name }).exec((err, existing_location) => {
          if (err) responses.serverError(res)
          else if (existing_location) {
            responses.addExistingData(res)
          } else location.name = name
          location.female = female
          location.male = male
          location.location = req.params.locationId
          location.totalPopulation = totalPopulation
          location
            .save()
            .then(location => {
              responses.creationSuccess(res, location)
              parentLocation.sublocations.push(location)
              parentLocation.save()
            })
            .catch(err => {
              responses.serverError(res, err)
            })
        })
      } else {
        responses.locationNotFound(res, id)
      }
    })
  } catch (error) {
    responses.wrongInput(res, error)
  }
}

export const getSubLocations = async (req, res) => {
  try {
    await utils.verifyId(req.params.locationId)
    Sublocation.find({ location: req.params.locationId }).exec(
      (error, subLocations) => {
        if (error) responses.serverError(res, err)
        subLocations
          ? responses.getSuccess(res, subLocations)
          : responses.noLocations(res)
      }
    )
  } catch (error) {
    responses.wrongInput(res, error)
  }
}

export const getSingleSubLocation = async (req, res) => {
  try {
    await utils.verifyId(req.params.locationId)
    await utils.verifyId(req.params.subId)

    Sublocation.findById(req.params.subId).exec((err, location) => {
      if (err) responses.serverError(res, err)
      location
        ? responses.getSuccess(res, location)
        : responses.SubLocationNotFound(res, req.params.subId)
    })
  } catch (error) {
    responses.wrongInput(res, error)
  }
}

export const updateSubLocation = async (req, res) => {
  try {
    await utils.verifyId(req.params.locationId)
    await utils.verifyId(req.params.subId)

    let totalPopulation = await utils.validator(req)
    const {
      body: { name, female, male },
    } = req
    let location = { name, female, male, totalPopulation: totalPopulation }

    Sublocation.findByIdAndUpdate(req.params.subId, location, {
      new: true,
    }).exec((error, newLocation) => {
      if (error) {
        responses.serverError(res, {
          message: 'sublocation name already exists',
        })
      } else {
        newLocation
          ? responses.updateSuccess(res, newLocation)
          : responses.SubLocationNotFound(res, req.params.subId)
      }
    })
  } catch (err) {
    responses.serverError(res, err)
  }
}

export const deleteSubLocation = async (req, res) => {
  let id = req.params.subId
  try {
    await utils.verifyId(id)

    Location.findById(id).exec((error, deletedSubLocation) => {
      if (!deletedSubLocation) responses.locationNotFound(res, id)
      if (deletedSubLocation) {
        deletedSubLocation.remove().then(deletedItem => {
          responses.deleteSuccess(res, id)
        })
      }
    })
  } catch (err) {
    responses.serverError(res, err)
  }
}
