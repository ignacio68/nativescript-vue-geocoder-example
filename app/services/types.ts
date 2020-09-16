export interface GeocoderDefaultOptions {
  /**
   * On geocoded result what zoom level should the map animate
   */
  zoom: number

  /**
   * If `false`, animating the map to a selected result is disabled.
   * If `true`, animating the map will use the default animation parameters.
   * If an object, it will be passed as `options` to the map `flyTo` method providing control over the animation of the transition.
   */
  flyTo: boolean | object

  /**
   * Minimum number of characters to enter before results are shown.
   */
  minLength: number

  /**
   * Maximum number of results to show.
   */
  limit: number

  /**
   * If `true`, a marker will be added to the map at the location of the user-selected result using a default set of Marker options.
   * If the value is an object, the marker will be constructed using these options.
   * If `false`, no marker will be added to the map. Requires that `options.mapboxgl` also be set.
   */
  marker: boolean | object
}

export interface Location {
  /**
   * The name of the placemark.
   *
   */
  name: string;

  /**
   * The latitude of the geolocation, in degrees.
   */
  latitude: number;

  /**
   * The longitude of the geolocation, in degrees.
   */
  longitude: number;

  /**
   * The name of the country associated with the placemark.
   */
  country?: string;

  /**
   * The abbreviated country name.
   */
  isoCountryCode?: string;

  /**
   * The city associated with the placemark.
   */
  locality?: string;

  /**
   * The postal code associated with the placemark.
   */
  postalCode?: string;

  /**
   * The state or province associated with the placemark.
   */
  administrativeArea?: string;

  /**
   * Additional administrative area information for the placemark.
   */
  subAdministrativeArea?: string;

  /**
   * Additional city-level information for the placemark.
   */
  subLocality?: string;

  /**
   * The street address associated with the placemark.
   */
  thoroughfare?: string;

  /**
   * Additional street-level information for the placemark.
   */
  subThoroughfare?: string;
}
