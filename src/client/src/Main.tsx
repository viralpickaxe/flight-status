import ReactDOM from "react-dom"
import React from "react"
import { Application } from "./render/Application"
import history from "./state/History"

import Store from "./state/Store"

ReactDOM.render((<Application />), document.getElementById("react_mount"))

Store.dispatch({
	type: "ROUTER_LOCATION_UPDATE",
	data: history.location
})

history.listen((location) => {

	Store.dispatch({
		type: "ROUTER_LOCATION_UPDATE",
		data: history.location
	})

})