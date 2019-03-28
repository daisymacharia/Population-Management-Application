export const creationSuccess = (res, data) => {
  res.status(201).json({ data: data, message: `successfully created` })
}

export const updateSuccess = (res, data) => {
  res.status(200).json({ data: data, message: `successfully updated` })
}

export const deleteSuccess = (res, deletedData) => {
  res
    .status(200)
    .json({ message: `Item with Id ${deletedData} has been deleted` })
}

export const locationNotFound = res => {
  res.status(404).json({ message: `Location doesn't exist` })
}

export const getSuccess = (res, data) => {
  res.status(200).json({ data: data, message: `succesfully fetched data` })
}

export const wrongInput = (res, data) => {
  res.status(422).json({ message: `${data}` })
}

export const serverError = (res, err) => {
  res.status(500).json({ error: err.message })
}

export const addExistingData = res => {
  res.status(409).json({ message: `location already exists` })
}

export const SubLocationNotFound = (res, messageId) => {
  res
    .status(404)
    .json({ message: `SubLocation with Id: ${messageId} doesn't exist` })
}

export const emptyJsonBody = res => {
  res.status(422).json({ message: 'The Body should not be empty' })
}

export const noLocations = res => {
  res.status(200).json({ message: 'No locations added' })
}
