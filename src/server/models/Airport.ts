import * as Bluebird from "bluebird"
import { Document, Schema, Model } from "mongoose"

import { mongoose } from "../database"

export interface IAirport extends Document {
	name: String,
	icao: String,
	city: String,
	country: String,
	coordinates: [Number],
	altitude: Number,

	toResponse(): Object
}

export interface IAirportModel {
	
}

const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	icao: {
		type: String,
		required: true,
		index: { unique: true }
	},
	city: {
		type: String,
		index: true
	},
	country: {
		type: String,
		index: true
	},
	coordinates: {
		type: [Number],
		required: true,
		index: "2d"
	},
	altitude: {
		type: Number,
		required: true
	}
})

schema.methods.toResponse = function() {

	return {
		name: this.name,
		icao: this.icao,
		city: this.city,
		country: this.country,
		coordinates: this.coordinates,
		altitude: this.altitude
	}

}

export type AirportModel = Model<IAirport> & IAirportModel

export const Airport: AirportModel = <AirportModel>mongoose.model<IAirport>("Airport", schema)