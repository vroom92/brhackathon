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


                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if (requestBody.result.action) {
                    //speech += 'action: ' + requestBody.result.action;
					speech += requestBody.result;
                }
            }
        }

        // console.log('result: ', speech);
                console.log('result: yian zhu');
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





// 'use strict';
// const http = require('http');
// const host = 'api.worldweatheronline.com';
// const wwoApiKey = '9b586ac440a244c0bbd205511171107';
// exports.weatherWebhook = (req, res) => {
//   // Get the city and date from the request
//   let city = req.body.result.parameters['geo-city']; // city is a required param
//   // Get the date for the weather forecast (if present)
//   let date = '';
//   if (req.body.result.parameters['date']) {
//     date = req.body.result.parameters['date'];
//     console.log('Date: ' + date);
//   }
//   // Call the weather API
//   callWeatherApi(city, date).then((output) => {
//     // Return the results of the weather API to API.AI
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify({ 'speech': output, 'displayText': output }));
//   }).catch((error) => {
//     // If there is an error let the user know
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
//   });
// };
// function callWeatherApi (city, date) {
//   return new Promise((resolve, reject) => {
//     // Create the path for the HTTP request to get the weather
//     let path = '/premium/v1/weather.ashx?format=json&num_of_days=1' +
//       '&q=' + encodeURIComponent(city) + '&key=' + wwoApiKey + '&date=' + date;
//     console.log('API Request: ' + host + path);
//     // Make the HTTP request to get the weather
//     http.get({host: host, path: path}, (res) => {
//       let body = ''; // var to store the response chunks
//       res.on('data', (d) => { body += d; }); // store each response chunk
//       res.on('end', () => {
//         // After all the data has been received parse the JSON for desired data
//         let response = JSON.parse(body);
//         let forecast = response['data']['weather'][0];
//         let location = response['data']['request'][0];
//         let conditions = response['data']['current_condition'][0];
//         let currentConditions = conditions['weatherDesc'][0]['value'];
//         // Create response
//         let output = `Current conditions in the ${location['type']} 
//         ${location['query']} are ${currentConditions} with a projected high of
//         ${forecast['maxtempC']}°C or ${forecast['maxtempF']}°F and a low of 
//         ${forecast['mintempC']}°C or ${forecast['mintempF']}°F on 
//         ${forecast['date']}.`;
//         // Resolve the promise with the output text
//         console.log(output);
//         resolve(output);
//       });
//       res.on('error', (error) => {
//         reject(error);
//       });
//     });
//   });
// }