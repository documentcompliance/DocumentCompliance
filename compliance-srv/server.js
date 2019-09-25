/*eslint no-console: 0*/
"use strict";
var express = require("express");
var app = express();
var http = require("http").Server(app);
var port = process.env.PORT || 3000;
const axios = require('axios');
var host = "localhost";
var port = "3010";

app.get("/", function (req, res) {
	res.send("Hello!!!");
});

app.get("/liststreamkeys", function (req, res) {
	var config = {
		"method": "liststreamkeys",
		"params": ["stream1"]
	};

	var authOptions = {
		method: 'POST',
		url: 'https://maas-proxy.cfapps.us10.hana.ondemand.com/3ead9308-8c19-4d13-89e7-7e68b24968ce/rpc',
		data: config,
		headers: {
			'apikey': 'xsnU5GB3qmwtaYpNboASjWkymy6eZA44r4PAqUHK7Ap9QxkdBWt82v3gFzSca2jx'
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

app.get("/liststreamitems", function (req, res) {
	var config = {
		"method": "liststreamitems",
		"params": ["stream1"]
	};

	var authOptions = {
		method: 'POST',
		url: 'https://maas-proxy.cfapps.us10.hana.ondemand.com/3ead9308-8c19-4d13-89e7-7e68b24968ce/rpc',
		data: config,
		headers: {
			'apikey': 'xsnU5GB3qmwtaYpNboASjWkymy6eZA44r4PAqUHK7Ap9QxkdBWt82v3gFzSca2jx'
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

http.listen(process.env.PORT || port, function () {
	console.log("[index.js] Server Up - " + host + ":" + port);
});

console.log("Server listening on port %d", port);
