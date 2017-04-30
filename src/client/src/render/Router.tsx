import { Component } from "react"
import React from "react"
import Store from "../state/Store"

import { FlightMapPage } from "./pages/FlightMap"

interface PropsType {

}

export class Router extends Component<PropsType, Object> {

    render() {
        
		let router = Store.getState().Router

		if ( router.get("active_route") === "index" ) {

			return <FlightMapPage />

		}

		return <div>Unknown error</div>

    }

}