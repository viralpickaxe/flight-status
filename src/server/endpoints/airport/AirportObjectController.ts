import { HTTPController } from "../../core/HTTPController"
import * as Express from "express"
import { Airport, IAirport } from "../../models/Airport"

export class AirportObjectController extends HTTPController {

    get(req: Express.Request, res: Express.Response): void {

		Airport.findOne({
			icao: req.params.icao
		})
			.then((airport) => {

				return res
					.status(200)
					.json(airport.toResponse())

			})
			.catch(() => {

				return res
					.status(404)
					.json({
						error: "not_found",
						message: "Airport not found"
					})

			})

	}

}