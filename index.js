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