var express = require("express");
var serveStatic = require("serve-static");
var path = require("path");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var winston = require("winston");
var BlockchainFactory = require("./blockchain-factory.js");
var cfenv = require("cfenv");
const axios = require('axios')

var logger = (winston.createLogger)({
	level: "debug",
	transports: [
		new(winston.transports.Console)({
			colorize: true
		}),
	]
});

var appEnv = cfenv.getAppEnv();
var host = "localhost";
var port = "3010";

var serviceCredentials = appEnv.getServiceCreds(process.env.BC_TECHNOLOGY_SERVICE_NAME);
BlockchainFactory(serviceCredentials, logger, function (blockchain) {
	io.on("connection", function (socket) {
		socket.removeAllListeners();
		logger.info("[socket-io] connected");
		socket.on("message", function (message) {
			var options = {};
			var data = JSON.parse(message);

			if (data.action === "init") {
				socket.emit("message", JSON.stringify({
					action: "finished-loading",
					origin: data.action,
					successfull: true
				}));
			} else if (data.action === "write") {
				data.assetValue = parseInt(data.asset_value) + "";
				console.log(data);
				logger.info("[socket-io] try to write: " + data.assetValue);
				options.args = {
					assetId: "SAP000S407W212743",
					assetValue: data.assetValue,
					assetUnit: data.asset_unit
				};
				blockchain.write(options, function (err) {
					if (!err) {
						logger.info("[socket-io] write: SAP000S407W212743 OK");
						socket.emit("message", JSON.stringify({
							action: "finished",
							origin: data.action,
							successfull: true
						}));
					} else {
						socket.emit("message", JSON.stringify({
							action: "finished",
							message: err,
							origin: data.action,
							successfull: false
						}));
					}
				});
			} else if (data.action === "read") {
				options.args = {
					assetId: "SAP000S407W212743"
				};
				blockchain.read(options, function (err, value) {
					if (!err) {
						logger.info("[socket-io] read: SAP000S407W212743 OK");
						socket.emit("message", JSON.stringify({
							action: "finished",
							origin: data.action,
							successfull: true,
							asset_value: value,
							asset_unit: "km"
						}));
					} else {
						socket.emit("message", JSON.stringify({
							action: "finished",
							message: err,
							origin: data.action,
							successfull: false
						}));
					}
				});
			} else if (data.action === "history") {
				options.args = {
					assetId: "SAP000S407W212743"
				};
				blockchain.history(options, function (err, history) {
					if (!err) {
						logger.info("[socket-io] history: SAP000S407W212743 OK");
						socket.emit("message", JSON.stringify({
							action: "finished",
							origin: data.action,
							successfull: true,
							history: history
						}));
					} else {
						socket.emit("message", JSON.stringify({
							action: "finished",
							message: err,
							origin: data.action,
							successfull: false
						}));
					}
				});
			}
		});
		socket.on("disconnect", function () {
			logger.info("[socket-io] disconnected");
		});
	});
});

app.get("/liststremitems", function (req, res) {
	var config = {
		"method": "liststreamkeyitems",
		"params": ["stream1", "key3"]
	};

	var authOptions = {
		method: 'POST',
		url: 'https://maas-proxy.cfapps.eu10.hana.ondemand.com/75575c9a-8872-4763-bf09-1a3068d2b708/rpc',
		data: config,
		headers: {
			'apikey': 'zmqyuTGz5dNV6xbcYqkso6HHwD68EyhJghEXLmr4fD2f3CF6cPMFtNUg2CVb59u8'
		},
		json: true
	};

	

	axios(authOptions)
		.then(response => {
			// JSON responses are automatically parsed.
			res.send(response.data.result);
		})
		.catch(e => {
			res.send(e);
		});

});

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

app.get("/assets.html", function (req, res) {
	res.sendFile(__dirname + "/assets.html");
});

app.use(serveStatic(path.join(__dirname, "public")));
http.listen(process.env.PORT || port, function () {
	console.log("[index.js] Server Up - " + host + ":" + port);
});