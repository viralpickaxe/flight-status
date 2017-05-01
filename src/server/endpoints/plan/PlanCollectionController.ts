import { HTTPController } from "../../core/HTTPController"
import * as Express from "express"
import { Plan, IPlan, FlightNode } from "../../models/Plan"

export class PlanCollectionController extends HTTPController {

    get(req: Express.Request, res: Express.Response): void {
		
		Plan.find({})
			.then((plans) => {

				let response = plans.map((plan) => {

					return plan.toResponse()

				})

				return res
					.status(200)
					.json(response)

			})

	}

	post(req: Express.Request, res: Express.Response): void {
		
		let file = req.body.fms.replace(/\r/g, '').split('\n')

		let route = file.slice(4, file.length - 1).map((node) => {

			let [type, name, _ignore, x, y] = node.split(' '),
				coordinates: [Number] = [parseFloat(x), parseFloat(y)]

			return {
				name,
				type: parseInt(type),
				coordinates
			} as FlightNode

		})

		let origin = route[0].name,
			destination = route[route.length - 1].name

		Plan.create({
			name: origin + destination,
			origin,
			destination,
			route
		})
			.then((plan) => {

				return res
					.status(201)
					.json(plan.toResponse())

			})

	}

}