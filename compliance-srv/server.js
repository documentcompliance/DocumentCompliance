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

app.get("/liststremitems", function (req, res) {
	var config = {
		"method": "liststreamkeyitems",
		"params": ["stream99", "key1"]
	};

	var authOptions = {
		method: 'POST',
		url: 'https://maas-proxy.cfapps.us10.hana.ondemand.com/a1aaed2c-49e5-4c5a-bd0c-e38ad368810e/rpc',
		data: config,
		headers: {
			'apikey': 'FxYMp5uFkPL2gs4nLT3wKxuHVRVRnmkmbbDMme6zacD4cKYQ7USgMhc8VebMFJhG'
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
