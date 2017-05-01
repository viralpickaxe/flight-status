import { Component } from "react"
import React from "react"
import axios from "axios"
const Gmaps = window['google']

interface PropsType {
	planId: string
}

interface StateType {
	plan?: any,
	airports?: [any],
	show_all_airports: boolean
}

export class FlightMapPage extends Component<PropsType, StateType> {

	private map
	private map_elements: any = {}

	constructor(props: PropsType) {
		super(props)

		this.state = {
			plan: null,
			airports: [] as [any],
			show_all_airports: false
		}
	}

	componentDidMount() {

		this.initMap()

		axios.get(`/api/plans/${this.props.planId}`)
			.then((response) => {

				return this.setState({
					plan: response.data
				})

			})
			.then(() => {
				
				this.renderPlan()
				return axios.get("/api/airports")

			})
			.then((response) => {

				return this.setState({
					airports: response.data
				})

			})
			.then(() => {
				
				return this.renderAirports()

			})

	}

	initMap() {

		this.map = new Gmaps.maps.Map(this.refs.map, {
			center: {lat: 51.509865, lng: -0.118092},
			zoom: 3
		})

		this.map_elements.airport_info = new Gmaps.maps.InfoWindow()

	}

	fitPlanToView() {

		let bounds = new Gmaps.maps.LatLngBounds()

		for (var i = 0; i < this.map_elements.planned_route_nodes.length; i++) {
			
			bounds.extend(this.map_elements.planned_route_nodes[i].getPosition())
		}

		this.map.fitBounds(bounds)

	}

	renderPlan() {

		this.map_elements.planned_route_line = new Gmaps.maps.Polyline({
			strokeColor: '#ff3fd0',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			map: this.map
		})

		this.map_elements.planned_route_nodes = []

		let path = this.state.plan.route.map((node) => {

			let coordinates = {lat: node.coordinates[0], lng: node.coordinates[1]}

			if ( node.type != 1 ) {

				var icon = '/statics/images/intersection.png'

				if ( node.type == 2 ) {
					icon = '/statics/images/ndb.png'
				} else if ( node.type == 3 ) {
					icon = '/statics/images/vor.png'
				}

				this.map_elements.planned_route_nodes.push(new Gmaps.maps.Marker({
					position: coordinates,
					map: this.map,
					icon: {
						url: icon,
						anchor: new Gmaps.maps.Point(8, 7)
					}
				}))

			}

			return coordinates

		})

		this.map_elements.planned_route_line.setPath(path)

		this.fitPlanToView()

	}

	renderAirports() {

		var markers = this.state.airports.map((airport, i) => {
			
			var icon = `/statics/images/${airport.type}.png`

			let marker = new Gmaps.maps.Marker({
				position: {lat: airport.coordinates[0], lng: airport.coordinates[1]},
				icon: icon,
				map: this.map,
				visible: airport.icao === this.state.plan.origin || airport.icao === this.state.plan.destination,
				icao: airport.icao
			})

			marker.addListener('click', () => {
				this.map_elements.airport_info.setContent(`\
					<div class="AirportWindow">\
						<div class="AirportWindow_icao">${airport.icao}</div>\
						<div class="AirportWindow_name">${airport.name}</div>\
						<img class="AirportWindow_map" src="https://maps.googleapis.com/maps/api/staticmap?center=${airport.coordinates[0]},${airport.coordinates[1]}&zoom=${airport.type=='large_airport'?13:airport.type=="medium_airport"?14:airport.type=="small_airport"?15:16}&size=500x250&maptype=satellite&key=AIzaSyBfNoMB4IWrtuz4Ey2CSmjr3yXFt41M0ZQ" />\
					</div>\
				`)
				this.map_elements.airport_info.open(this.map, marker)
			})

			return marker
			
        })

		this.map_elements.airport_markers = markers

		this.renderAirportToggle()

		// this.airportMarkerCluster = new window['MarkerClusterer'](this.map, markers, {
		// 	imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
		// 	gridSize: 40,
		// 	maxZoom: 7
		// })

	}

	renderAirportToggle() {

		var custom_control_div = document.createElement('div')

		var control_ui = document.createElement('div')
		control_ui.className = 'MapControl'
		control_ui.title = 'Click to set the map to Home'
		custom_control_div.appendChild(control_ui)

		var control_text = document.createElement('div')
		control_text.className = 'MapControl__text'
		control_text.innerHTML = "Show All Airports"
		control_ui.appendChild(control_text)

		Gmaps.maps.event.addDomListener(control_ui, 'click', () => {

			this.setState({
				show_all_airports: !this.state.show_all_airports
			},() => {

				this.map_elements.airport_markers.map((marker) => {
					marker.setVisible(marker.icao === this.state.plan.origin || marker.icao === this.state.plan.destination || this.state.show_all_airports)
				})

				control_text.innerHTML = this.state.show_all_airports ? "Hide All Airports" : "Show All Airports"

			})

		})

		custom_control_div['index'] = 1
		this.map.controls[Gmaps.maps.ControlPosition.TOP_CENTER].push(custom_control_div);

	}

    render() {

		return <div className="Map" ref="map" />

    }

}