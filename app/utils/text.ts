import { ShortLocation, Location } from '@/services/types'
import { pipe } from './functional'

const getShortLocation = (location: Location): ShortLocation => {
  let shortLocation: ShortLocation = new Object()

  shortLocation.thoroughfare = location.thoroughfare
  shortLocation.subThoroughfare = location.subThoroughfare
  shortLocation.locality = location.locality
  shortLocation.postalCode = location.postalCode
  shortLocation.country = location.country

  return shortLocation
}

const removeEmptyKeys = (object: object): object => {
  Object.keys(object).forEach((key) => (!object[key] && object[key] !== undefined) && delete object[key])
  return object
}
const objectToArray = (object: object): string[] => {
  const newArray: any[] = Object.values(object)
  return newArray
}

const reduceToString = (shortLocationArray): string => `${shortLocationArray.join(', ')}`

export const getShortLocationString = pipe(getShortLocation, removeEmptyKeys, objectToArray, reduceToString)
