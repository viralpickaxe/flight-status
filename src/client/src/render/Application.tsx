import { Component } from "react"
import React from "react"
import Store from "../state/Store"
import { Router } from "./Router"

interface ApplicationState {
	state: any	
}

export class Application extends Component<null, ApplicationState> {

	constructor() {
		super()

		this.state = {
			state: Store.getState()
		}

		Store.redux_store.subscribe(() => {
			this.setState({
				state: Store.getState()
			})
		})
	}

	render() {
		return <Router />
	}

}