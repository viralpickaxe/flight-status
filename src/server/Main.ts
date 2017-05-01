require('dotenv').load()

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

import { WebappController } from "./endpoints/webapp/WebappController"

// Attach the controllers for endpoints
http_server.mount("/api/airports", AirportCollectionController)
http_server.mount("/api/airports/:icao", AirportObjectController)

http_server.mount("/", WebappController)

// Start the HTTP server
http_server.start()

// Create a HTTP Runtime to run this server - use default grace periods for Heroku
new ServerRuntime(http_server)

// import { Airport } from "./models/Airport"

// var parse = require('csv-parse')
// var fs = require('fs')

// fs.readFile( __dirname + "/airports.csv", function (err, data) {

// 	data = data.toString()

// 	parse(data, {columns: true}, function(err, output){

// 		output.map((a) => {

// 			Airport.findOne({icao: a.ident})
// 				.then((airport) => {
// 					airport.type = a.type
// 					airport.save()
// 				})
// 				.catch(() => {})

// 		})

// 		console.log('done')

// 	})
// })