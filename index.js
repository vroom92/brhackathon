'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

               /* if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += '';
                } */

                /*if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;
					//speech += requestBody.result;
                }*/
                if( requestBody.result.action=='input.welcome' || requestBody.result.action=='know.blk' || 
                    requestBody.result.action=='blk.history' || requestBody.result.action=='input.unknown' ){
					if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += '';
					}
				} else if( requestBody.result.action == "get.dev.cert.info" ) {
                    speech+ = "See: http://webster.bfm.com/Wiki";

                }
				/* else if (requestBody.result.action == "weather") {
                    var city = req.body.result.parameters['geo-city'];
                   // console.log(city);
                    if (req.body.result.parameters['date']) {
                        var date = req.body.result.parameters['date'];
                        //console.log('Date: ' + date);
                    }
					var url = "https://api.worldweatheronline.com/premium/v1/weather.ashx?format=json&num_of_days=1&"+"q="+city+"&key=9b586ac440a244c0bbd205511171107&date=today";
					var xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							var response=(JSON.parse(this.responseText));
							var forecast = response['data']['weather'][0];
                            conditions = response['data']['current_condition'][0];
                            currdate = forecast['date'];
                            currTemp = conditions['temp_F'];
							speech +=requestBody.result.fulfillment.speech;
							speech+=" "+currTemp+" on "+currdate;
						}
					};
					xmlhttp.open("GET",url, true);
					xmlhttp.send();
				 }	*/
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});