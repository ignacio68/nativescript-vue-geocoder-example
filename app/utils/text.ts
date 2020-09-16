import { Location } from '@/services/types'

const removeEmptyKeys = (object) => {
  Object.keys(object).forEach((key) => (!object[key] && object[key] !== undefined) && delete object[key])
  return object
}

export const formatedText = (location: Location) => {
  const cleanedLocation = removeEmptyKeys(location)
  if (!cleanedLocation.thoroughfare) {
    if (!cleanedLocation.country || !cleanedLocation.postalCode) {
      return `${cleanedLocation.name}`
    } else {
      return `${cleanedLocation.name} ${cleanedLocation.postalCode} ${cleanedLocation.country}`
    }
  } else {
    return `${cleanedLocation.thoroughfare} ${cleanedLocation.subThoroughfare} ${cleanedLocation.postalCode} ${cleanedLocation.locality}`
  }
}
