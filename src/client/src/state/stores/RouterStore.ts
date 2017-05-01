import { fromJS } from "immutable"
import Uniloc from "uniloc"
import qs from "qs"

const INITIAL_STATE = fromJS({
	path: "",
	hash: "",
	options: {},
	query: {},
	active_route: ""
})

export default (state, action) => {

	if ( !state ) {
		return INITIAL_STATE
	}

	if ( action.type === "ROUTER_LOCATION_UPDATE" ) {

		let view = router.lookup(action.data.pathname)

		state = state.set("path", action.data.pathname)
		state = state.set("hash", action.data.hash)
		state = state.set("active_route", view.name)
		state = state.set("query", fromJS(qs.parse(action.data.search.substr(1))))
		state = state.set("options", fromJS(view.options))

	}

	return state

}

const router = Uniloc({
	index: "GET /",
	planMap: "GET /plans/:id"
})