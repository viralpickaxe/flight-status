import { HTTPController } from "../../core/HTTPController"
import * as Express from "express"
import { Airport, IAirport } from "../../models/Airport"

export class AirportCollectionController extends HTTPController {

    get(req: Express.Request, res: Express.Response): void {
		
		Airport.find({})
			.then((airports) => {

				let response = airports.map((airport) => {

					return airport.toResponse()

				})

				return res
					.status(200)
					.json(response)

			})

	}

}