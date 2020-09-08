import * as geocoding from 'nativescript-geocoding'

// import { Location } from 'nativescript-geocoding'

// let location = new geocoding.Location()

export const searchLocations = async(query: string) => {
  console.log(`searchLocations: ${query}`)
  const getLocations = await geocoding.getLocationListFromName(query, 5)
    .then((items: any) => {
      console.log(`Found: ${items.length}`)
      // let locations = new ObservableArray<TokenModel>()
      let locations = []
      items.map((item: any) => locations.push(item))
      console.log(`locations ${JSON.stringify(locations)}`)
      return locations
      }, error => console.log(`Error: ${error.message || error}`)
  )
  return getLocations
}
