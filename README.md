# Nativescript Geocoder Example

> An example of the Nativescript-Vue geocoder component with Mapbox


![map with geocoder](/images/nativescript_geocoder_01.jpg  "Multiple results")
- Multiple results

![map with geocoder](/images/nativescript_geocoder_02.jpg  "Fly to the desire location")
- Fly to the desire location


## 3rd party plugins used

- [Nativescript Geocoding](https://github.com/timdoege/nativescript-geocoding)

- [Nativescript Mapbox](https://github.com/Yermo/nativescript-mapbox)


## Notes

- You need a Mapbox account to provide a map key

  *setup/map.ts*
  >export const mapToken ='YOUR MAPBOX KEY'

- For Android, the minimum **API level is 21** in order to get detailed location info.

- On iOS you may receive this message:
  > AError: iOS CLGeocoder error : The operation couldn’t be completed. (kCLErrorDomain error 8.)

  if the CLGeocoder was not able to find anything for the search string.


## Usage

``` bash
# Install dependencies
npm install

# Preview on device
tns preview

# Build, watch for changes and run the application
tns run

# Build, watch for changes and debug the application
tns debug <platform>

# Build for production
tns build <platform> --env.production