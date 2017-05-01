import { HTTPController } from "../../core/HTTPController"
import * as Express from "express"
import { Plan, IPlan } from "../../models/Plan"

export class PlanObjectController extends HTTPController {

    get(req: Express.Request, res: Express.Response): void {

		Plan.findById(req.params.id)
			.then((plan) => {

				return res
					.status(200)
					.json(plan.toResponse())

			})
			.catch(() => {

				return res
					.status(404)
					.json({
						error: "not_found",
						message: "Plan not found"
					})

			})

	}

}