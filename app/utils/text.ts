const removeEmptyKeys = (object) => {
  Object.keys(object).forEach((key) => (!object[key] && object[key] !== undefined) && delete object[key])
  return object
}

export const formatedText = (location) => {
  const cleanedLocation = removeEmptyKeys(location)
  return `${cleanedLocation.thoroughfare} ${cleanedLocation.subThoroughfare} ${cleanedLocation.postalCode} ${cleanedLocation.locality}`
}
