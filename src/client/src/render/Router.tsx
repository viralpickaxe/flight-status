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

			return <div></div>

		} else if ( router.get("active_route") === "planMap" ) {

			return <FlightMapPage planId={router.getIn(["options", "id"])} />

		}

		return <div>Unknown error</div>

    }

}