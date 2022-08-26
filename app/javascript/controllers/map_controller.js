import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static targets = [ "show"]
  static values = {
    apiKey: String,
    markers: Array
  }

  connect() {
    const list = document.querySelector("#list-btn")
    const map = document.querySelector("#map-btn")
    map.addEventListener("click", (e) => {
      e.preventDefault();
        this.showTarget.style.width = "100%";
        this.showTarget.style.height = "600px";
        this.#initializeMap()
    })
    list.addEventListener("click", (e) => {
      e.preventDefault();
      this.map.remove();
      this.showTarget.style.width ="0%";
      this.showTarget.style.height = "0px";
    })


  }

  #initializeMap() {
    mapboxgl.accessToken = this.apiKeyValue
    console.log("Hello map contoller")

    this.map = new mapboxgl.Map({
      container: this.element,
      style: "mapbox://styles/mapbox/streets-v10"
    })
    this.#addMarkersToMap()
    this.#fitMapToMarkers()
  }

#addMarkersToMap() {
  this.markersValue.forEach((marker) => {
    new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      .addTo(this.map)
  })
}
#fitMapToMarkers() {
  const bounds = new mapboxgl.LngLatBounds()
  this.markersValue.forEach(marker => bounds.extend([ marker.lng, marker.lat ]))
  this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
}
}