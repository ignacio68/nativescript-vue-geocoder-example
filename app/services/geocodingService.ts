import * as geocoding from 'nativescript-geocoding'

import { Location } from './types'

export const searchLocations = async(query: string) => {
  const fetchLocations: void | Location[] = await geocoding.getLocationListFromName(query, 5)
  .then((locations: Location[])  => {
    console.log(`Found: ${locations.length}`)
    // console.log(`locations: ${JSON.stringify(locations)}`)
    // let locationsList: Location[] = []
    // locations.map(result => locationsList.push(result))
    // return locationsList
    return locations
    }, error => console.log(`Error: ${error.message || error}`)
  )
  console.log(`fetchLocations: ${JSON.stringify(fetchLocations)}`)
  return fetchLocations
}
