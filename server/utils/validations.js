export const validator = req => {
  let location = req.body.name
  let males = req.body.male
  let females = req.body.female

  return new Promise((resolve, reject) => {
    location = location.replace(/^\s+/g, '')

    if (!location) {
      return reject('Location cannot be an empty string')
    }
    if (Number.isInteger(males) && Number.isInteger(females)) {
      return resolve(males + females)
    } else {
      return reject('males and females population must be intergers')
    }
  })
}

export const verifyId = id => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return id
  } else {
    throw new TypeError('Invalid Id')
  }
}
