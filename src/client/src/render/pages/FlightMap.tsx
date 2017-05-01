import { Component } from "react"
import React from "react"
import axios from "axios"
const Gmaps = window['google']

interface PropsType {

}

export class FlightMapPage extends Component<PropsType, Object> {

	private map
	private airportWindow

	componentDidMount() {

		this.map = new Gmaps.maps.Map(this.refs.map, {
			center: {lat: 51.509865, lng: -0.118092},
			zoom: 9
		})

		this.airportWindow = new Gmaps.maps.InfoWindow()

		axios.get("/api/airports")
			.then((response) => {

				this.renderAirports(response.data)

			})

	}

	renderAirports(airports) {

		var markers = airports.map((airport, i) => {
			
			var icon = `/statics/images/${airport.type}.png`

			let marker = new Gmaps.maps.Marker({
				position: {lat: airport.coordinates[0], lng: airport.coordinates[1]},
				icon: icon
			})

			marker.addListener('click', () => {
				this.airportWindow.setContent(`\
					<div class="AirportWindow">\
						<div class="AirportWindow_icao">${airport.icao}</div>\
						<div class="AirportWindow_name">${airport.name}</div>\
						<img class="AirportWindow_map" src="https://maps.googleapis.com/maps/api/staticmap?center=${airport.coordinates[0]},${airport.coordinates[1]}&zoom=${airport.type=='large_airport'?13:airport.type=="medium_airport"?14:airport.type=="small_airport"?15:16}&size=500x250&maptype=satellite" />\
					</div>\
				`)
				this.airportWindow.open(this.map, marker)
			})

			return marker
			
        })

		new window['MarkerClusterer'](this.map, markers, {
			imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
			gridSize: 40
		})

	}

    render() {

		return <div className="Map" ref="map" />

    }

}