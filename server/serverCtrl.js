var Wallet = require("./walletSchema");
var moment = require("moment");

exports.getWalletsForCommentsAndRatings = function(req, res) {
        var request = req.query;
        console.log(request.Country);
        // var  = "Android"
        var pipeline = [{
                "$match": {
                    "Store": request.Store,
                    "Country": request.Country
                }
            },
            // {
            //     "$group": {
            //         "_id": "$SubmissionDate",
            //         "allComments": {
            //             "$push": "$Comments" 
            //         }
            //     }
            // },
            {
                "$sort": {
                    "Rating": 1
                }
            }
        ]
        Wallet.aggregate(pipeline).exec(function(err, data) {
            if (err) {
                console.log(err)
                res.status(500).json(err)
            } else {
                // console.log(data);
                res.json(data);
            }
        })
    }
    //////////////////////////

exports.forTesting = function(req, res) {
        Wallet.find(req.query, function(err, info) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(info);
            }
        })
    }
    //////////////////////////

exports.getWalletsForWordFrequency = function(req, res) {
    var request = req.query;
    // console.log(request.Country);
    // var  = "Android"
    var pipeline = [{
            "$match": {}
        }, {
            "$group": {
                "_id": { "day": "$Date" },
                counts: {
                    "$push": "$wordCount"
                }
            }
        }, 
        // {
        //     "$project": {
        //         results: {
        //             "$reduce": {
        //                 input: "$group",
        //                 initialValue: {},
        //                 in : {
        //                     cant: { $add: ["$$value.cant.count", "$$this"] },
        //                     wont: { $add: ["$$value.wont.count", "$$this"] },
        //                     pay: { $add: ["$$value.pay.count", "$$this"] },
        //                 }
        //             }
        //         }
        //     }
        // },
        {
            "$sort": {
                "_id": -1
            }
        }
    ]
    Wallet.aggregate(pipeline).exec(function(err, data) {
        if (err) {
            console.log(err)
            res.status(500).json(err)
        } else {
            console.log(data);


            // var tempData = data;


            // for(var day = 0, day < tempData.length; day++) {
            //     var counts = {};

            //     for(var word in tempData[day].counts) {
            //         counts[word] += tempData[day].counts[word];
            //     }
                


            // }








            res.json(data);
        }
    })
}

exports.addMetadataForWordFrequency = function(req, res) {
    Wallet.find({}, function(error, data) {

        var tempData = data;
        // console.log(data)
        tempData.forEach(function(doc, docIndex, arr) {

            // console.log('Doc:', review.TranslatedBody);
            // console.log("TypeOf", typeof review)
            // console.log(doc.TranslatedBody);
            doc.wordCount = generateWordFrequencyCount(doc.TranslatedBody)

            doc.save().then(function(response) {
                // console.log('response: ', response);
            });
            // console.log('doc: ', doc, typeof doc);
        })
        if (error) {
            // console.log(error);
            res.status(500).json(error);
        } else {

            res.json(data);
        }
    })
}

function generateWordFrequencyCount(comment) {
    // console.log(comment);
    var wordCount = {
        cant: {
            strings: ["Can't", "Cant"],
            column: "Can't",
            count: 0
        },
        wont: {
            strings: ["Won't", "Wont"],
            column: "Won't",
            count: 0
        },
        login: {
            strings: ["Log in", "login"],
            column: "Login",
            count: 0
        },
        crashes: {
            strings: ["Crash", "Crashes"],
            column: "Crashes",
            count: 0
        },
        deposit: {
            strings: ["Deposit"],
            column: "Deposit",
            count: 0
        },
        pay: {
            strings: ["Pay"],
            column: "Pay",
            count: 0
        },
        update: {
            strings: ["Update"],
            column: "Update",
            count: 0
        },
        error: {
            strings: ["Error"],
            column: "Error",
            count: 0
        },
        version: {
            strings: ["Version"],
            column: "Version",
            count: 0
        },
        transfer: {
            strings: ["Transfer"],
            column: "Transfer",
            count: 0
        },
        exclamation: {
            strings: ["!"],
            column: "!",
            count: 0
        }
    }

    for (var word in wordCount) {
        var wordObj = wordCount[word];
        console.log(wordObj);

        for (var i = 0; i < wordObj.strings.length; i++) {

            var searchResults = comment.search(new RegExp('\\b' + wordObj.strings[i] + '\\b', 'gi'));

            if (searchResults != -1) {
                wordCount[word].count += 1;
                break;
            }
        }
    }

    return wordCount;
}










exports.updateDateStringsToDateObjects = function(req, res) {
    Wallet.find({}, function(error, data) {

        var tempData = data;
        // console.log(data)
        tempData.forEach(function(doc, docIndex, arr) {

            doc.Date = moment(doc.Date).format("YYYY/MM/DD")
                // doc.Date = new Date(doc.Date);
            doc.save().then(function(response) {
                console.log('response: ', response);
            });
            console.log('doc: ', doc, typeof doc);
        })
        if (error) {
            console.log(error);
            res.status(500).json(error);
        } else {

            res.json(data);
        }
    })
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getTheDurations = function(req, res) {
    
}

















