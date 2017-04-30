import { HTTPController } from "../../core/HTTPController"
import * as Express from "express"

export class WebappController extends HTTPController {

    get(req: Express.Request, res: Express.Response): void {
		
		res.render("index")

	}

}