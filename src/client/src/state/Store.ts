import { Store, createStore, combineReducers, ReducersMapObject, Reducer, Action } from "redux"
import RouterStore from "./stores/RouterStore"

interface DoorpassAction extends Action {
	data: any
}

class FlightStatusStore {

	public redux_store: Store<any> = null

	private reducers: ReducersMapObject = {
		Router: RouterStore
	}

	constructor() {
		this.redux_store = createStore(
			combineReducers(this.reducers),
			window["__REDUX_DEVTOOLS_EXTENSION__"] && window["__REDUX_DEVTOOLS_EXTENSION__"]())
	}

	registerReducer(leaf_name, reducer: Reducer<any>) {
		this.reducers[leaf_name] = reducer
		this.redux_store.replaceReducer(combineReducers(this.reducers))
	}

	getState() {
		return this.redux_store.getState()
	}

	dispatch(action: DoorpassAction) {
		return this.redux_store.dispatch(action)
	}

}

const store: FlightStatusStore = new FlightStatusStore()

export default store