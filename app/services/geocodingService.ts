import * as geocoding from 'nativescript-geocoding'

import { Location } from './types'

export const searchLocation = async(query: string) => {
  const fetchLocation = await geocoding.getLocationFromName(query)
  .then(result =>{
    let location: Array<Location> = []
    location.push(result)
    return location
    }, error => console.log(`Error: ${error.message || error}`)
  )
  return fetchLocation
}

export const searchLocations = async(query: string) => {
  const fetchLocations = await geocoding.getLocationListFromName(query, 5)
  .then(locations => {
    console.log(`Found: ${locations.length}`)
    let locationsList: Array<Location> = []
    locations.map(result => locationsList.push(result))
    return locationsList
    }, error => console.log(`Error: ${error.message || error}`)
  )
  console.log(`fetchLocations: ${JSON.stringify(fetchLocations)}`)
  return fetchLocations
}
