import * as Bluebird from "bluebird"
import { Document, Schema, Model } from "mongoose"

import { mongoose } from "../database"

export interface FlightNode {
	name: String,
	type: Number,
	coordinates: [Number]
}

export interface IPlan extends Document {
	name: String,
	origin: String,
	destination: String,
	route: [FlightNode]

	toResponse(): Object
}

export interface IPlanModel {
	
}

const schema = new Schema({
	name: {
		type: String
	},
	origin: {
		type: String,
		required: true,
		index: true
	},
	destination: {
		type: String,
		required: true,
		index: true
	},
	route: {
		type: [Schema.Types.Mixed]
	}
})

schema.methods.toResponse = function() {

	return {
		id: this._id,
		name: this.name,
		origin: this.origin,
		destination: this.destination,
		route: this.route
	}

}

export type PlanModel = Model<IPlan> & IPlanModel

export const Plan: PlanModel = <PlanModel>mongoose.model<IPlan>("Plan", schema)