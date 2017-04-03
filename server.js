var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    cors = require('cors'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 9887,
    app = express(),
    moment = require('moment'),
    google = require('googleapis'),
    key = require('WalletMikesCredentials.json');


//requiring files
var wallet = require('./server/serverCtrl');

//middleware
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(__dirname));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.get('/api/wallet', wallet.getWalletsForCommentsAndRatings);
app.get('/api/walletWithWordCount', wallet.getWalletsForWordFrequency);
app.get('/api/wallet/updateWordCount', wallet.addMetadataForWordFrequency);
app.get('/api/wallet/updateDate', wallet.updateDateStringsToDateObjects);
app.get('/api/wallet/all', wallet.forTesting)
app.get('/api/wallet/getDurations', getAvgSessionDuration);



//////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////
function getAvgSessionDuration(req, res) {
	var request = req.query
	var arr = [];
	for(var prop in request) {
		arr.push(request[prop])
	}
	var newReq = arr.join('');
	console.log("newReq", newReq);

    var analytics = google.analytics('v3');
    // google auth
    var jwtClient = new google.auth.JWT(key.client_email, '', key.private_key, ['https://www.googleapis.com/auth/analytics.readonly'], '');

    jwtClient.authorize(function(err, tokens) {
        if (err) {
            console.log('jwtClient error: ', err);
            return;
        }
    });



    // notes:
    // data.rows[0] = ['20170125', 'Android', '5445']
    // response.rows[0] = ['date', 'operatingSystem', 'screenName', 'screenViews']
    // - all values are strings

    //Get the metrics for User Overview
    analytics.data.ga.get({
        'auth': jwtClient,
        'ids': newReq,
        'dimensions': 'ga:week, ga:operatingSystem',
        'metrics': 'ga:avgSessionDuration',
        'start-date': moment().subtract(1, 'week').day(0).format("YYYY-MM-DD"),
        'end-date': moment().subtract(1, 'week').day(6).format("YYYY-MM-DD")
    }, function(err, analytics) {
        if (err) {
            console.log('queryData error:', err);
            return;
        } else {
            console.log('analytics resposne', analytics.rows);

            return res.json(analytics.rows);
        }


    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//connection
var mongoUri = "mongodb://localhost:27017/Wallet";

mongoose.connect(mongoUri, function() {
    console.log("I'm connected to the DataBase: " + mongoUri);
})

app.listen(port, function() {
    console.log("I'm listen on port: " + port)
});
