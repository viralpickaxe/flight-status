require('dotenv').load()

import { XPlaneClient } from "xplane-udp"
import { HTTPServer } from "./core/HTTPServer"
import { ServerRuntime } from "./core/ServerRuntime"
import { json } from "body-parser"
import { HTTPAccessLog } from "./core/HTTPAccessLog"
import { defaultLogger } from "./core/Logger"

// Non Typescript imports
var cors = require("cors")

// Map the Heroku PORT variable if available - otherwise default to 4000
let port = process.env.PORT || 4000

// Create a HTTP Server to use
let http_server = new HTTPServer(port)

// Enable the helmet protection as this is a public facing API
http_server.enableHelmetProtections()

// Create an Access log
let access_log = new HTTPAccessLog(defaultLogger)

// Mount the access log
http_server.getApplication().use(access_log.middleware())

// Mount the body parser
http_server.getApplication().use(json())

// Mount the cors middleware
http_server.getApplication().use(cors())

// Import controllers
import { AirportCollectionController } from "./endpoints/airport/AirportCollectionController"
import { AirportObjectController } from "./endpoints/airport/AirportObjectController"

import { PlanCollectionController } from "./endpoints/plan/PlanCollectionController"
import { PlanObjectController } from "./endpoints/plan/PlanObjectController"

import { WebappController } from "./endpoints/webapp/WebappController"

// Attach the controllers for endpoints
http_server.mount("/api/airports", AirportCollectionController)
http_server.mount("/api/airports/:icao", AirportObjectController)

http_server.mount("/api/plans", PlanCollectionController)
http_server.mount("/api/plans/:id", PlanObjectController)

http_server.mount("/*", WebappController)

// Start the HTTP server
http_server.start()

// Create a HTTP Runtime to run this server - use default grace periods for Heroku
new ServerRuntime(http_server)

// Live plane location

import * as SocketIO from "socket.io"

let io = new SocketIO(http_server['underlying_server'])

let xplane_client = new XPlaneClient(12345)

xplane_client.start()
xplane_client.on("updated", (data) => {

	io.emit("updated", data)

})