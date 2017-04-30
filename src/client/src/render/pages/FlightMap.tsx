import { Component } from "react"
import React from "react"
const Gmaps = window['google']

interface PropsType {

}

export class FlightMapPage extends Component<PropsType, Object> {

	private map

	componentDidMount() {
		this.map = new Gmaps.maps.Map(this.refs.map, {
			center: {lat: 47.43134689331055, lng: -122.30804443359375},
			zoom: 10
		})
	}

    render() {

		return <div className="Map" ref="map">I should be a map!</div>

    }

}