app.factory('walletFtry', function($http, $q, $timeout) {
    return joel = {

        wordCount: {
            cant1: {
                word: "Can't",
                count: 0
            },
            cant2: {
                word: "Cant",
                count: 0
            },
            wont1: {
                word: "Won't",
                count: 0
            },
            wont2: {
                word: "Wont",
                count: 0
            },
            login1: {
                word: "Log in",
                count: 0
            },
            login2: {
                word: "Login",
                count: 0
            },
            crashes1: {
                word: "Crash",
                count: 0
            },
            crashes2: {
                word: "Crashes",
                count: 0
            },
            deposit: {
                word: "Deposit",
                count: 0
            },
            pay: {
                word: "Pay",
                count: 0
            },
            update: {
                word: "Update",
                count: 0
            },
            error: {
                word: "Error",
                count: 0
            },
            version: {
                word: "Version",
                count: 0
            },
            transfer: {
                word: "Transfer",
                count: 0
            }
        },
        counter: 0,
        queryWalletWordFrequency: function() {
            var defer = $q.defer();
            var OSandCountry = [892941, 1265819, 1234562, 1236152, 1198698, 785799, 888242, 1235970, 468232, 842231];
            if (this.counter < OSandCountry.length) {
                this.helperQueryFunctionForWordFrequecny(OSandCountry[this.counter])
                this.counter++;
                // $timeout(callAtTimeout, 3000);
                let her = this;
                $timeout(function() {
                    her.queryWalletWordFrequency();
                }, 2000)
            }
            defer.resolve(this.wordCount);
            return defer.promise;
            // return this.wordCount
        },
        counter2: 0,
        helperQueryFunctionForWordFrequecny: function(OSandCountry) {

            var range = {
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD")
            }
            var wordSearch = ["can't", "cant", "won't", "wont", "log in", "login", "crash", "crashes", "deposit", "pay", "update", "error", "version", "transfer"];
            if (this.counter2 < wordSearch.length) {
                // console.log(wordSearch[this.counter2]);

                $http.get("https://api.appbot.co/api/v1/apps/" + OSandCountry + "/reviews?key=28f80e0af8c5c2853f8b614ffb754263a72d69db&start=" + range.startDate + "&end=" + range.endDate + "&page=1&keyword=" + wordSearch[this.counter2]).
                then(function(res) {
                    var data = res.data
                    var info = res.data.results
                    // console.log(data);
                    var urlSlice = res.config.url
                    if (info.length !== 0) {
                        for (var i = 0; i < info.length; i++) {
                            if (info[i].rating > 3) {
                                data.total_count--
                            }
                        }
                    }
                    // console.log(info);
                    // console.log(urlSlice);
                    var wordBeingSearched = [];
                    for (var i = urlSlice.length - 1; i >= 0; i--) {
                        if (urlSlice[i] === "=") {
                            wordBeingSearched.push(urlSlice.slice(i + 1))
                            break;
                        }
                    }


                    // console.log(data.total_count);




                    switch (wordBeingSearched[0]) {
                        case "can't":
                            joel.wordCount.cant1.count += data.total_count;
                            break;
                        case "cant":
                            joel.wordCount.cant2.count += data.total_count;
                            break;
                        case "won't":
                            joel.wordCount.wont1.count += data.total_count;
                            break;
                        case "wont":
                            joel.wordCount.wont2.count += data.total_count;
                            break;
                        case "log in":
                            joel.wordCount.login1.count += data.total_count;
                            break;
                        case "login":
                            joel.wordCount.login2.count += data.total_count;
                            break;
                        case "crash":
                            joel.wordCount.crashes1.count += data.total_count;
                            break;
                        case "crashes":
                            joel.wordCount.crashes2.count += data.total_count;
                            break;
                        case "deposit":
                            joel.wordCount.deposit.count += data.total_count;
                            break;
                        case "pay":
                            joel.wordCount.pay.count += data.total_count;
                            break;
                        case "update":
                            joel.wordCount.update.count += data.total_count;
                            break;
                        case "error":
                            joel.wordCount.error.count += data.total_count;
                            break;
                        case "version":
                            joel.wordCount.version.count += data.total_count;
                            break;
                        case "tranfer":
                            joel.wordCount.transfer.count += data.total_count;
                            break;
                    }
                })
                this.counter2++
                    this.helperQueryFunctionForWordFrequecny(OSandCountry);
            }
            this.counter2 = 0;
        },
        // queryWalletWordFrequency: function(query) {

        //     var defer = $q.defer();
        //     var OSandCountry = [892941, 1265819, 814177, 1236152, 1198698, 785799, 888242, 1235970, 468232, 842231];
        //     var wordSearch = ["can't", "cant", "won't", "wont", "log in", "login", "crash", "crashes", "deposit", "pay", "update", "error", "version", "transfer"];
        //     var walletApp = []
        //     for (var j = 0; j < OSandCountry.length; j++) {

        //         for (var i = 0; i < wordSearch.length; i++) {
        //             $http.get("https://api.appbot.co/api/v1/apps/" + OSandCountry[j] + "/reviews?key=28f80e0af8c5c2853f8b614ffb754263a72d69db&start=" + query.startDate + "&end=" + query.endDate + "&page=1&keyword=" + wordSearch[i]).
        //             then(function(res) {
        //                 var data = res.data
        //                 var urlSlice = res.config.url
        //                     // console.log(urlSlice);
        //                 var wordBeingSearched = [];
        //                 for (var i = urlSlice.length - 1; i >= 0; i--) {
        //                     if (urlSlice[i] === "=") {
        //                         wordBeingSearched.push(urlSlice.slice(i + 1))
        //                         break;
        //                     }
        //                 }
        //                 switch (wordBeingSearched[0]) {
        //                     case "can't":
        //                         joel.wordCount.cant1.count += data.total_count;
        //                         break;
        //                     case "cant":
        //                         joel.wordCount.cant2.count += data.total_count;
        //                         break;
        //                     case "won't":
        //                         joel.wordCount.wont1.count += data.total_count;
        //                         break;
        //                     case "wont":
        //                         joel.wordCount.wont2.count += data.total_count;
        //                         break;
        //                     case "log in":
        //                         joel.wordCount.login1.count += data.total_count;
        //                         break;
        //                     case "login":
        //                         joel.wordCount.login2.count += data.total_count;
        //                         break;
        //                     case "crash":
        //                         joel.wordCount.crashes1.count += data.total_count;
        //                         break;
        //                     case "crashes":
        //                         joel.wordCount.crashes2.count += data.total_count;
        //                         break;
        //                     case "deposit":
        //                         joel.wordCount.deposit.count += data.total_count;
        //                         break;
        //                     case "pay":
        //                         joel.wordCount.pay.count += data.total_count;
        //                         break;
        //                     case "update":
        //                         joel.wordCount.update.count += data.total_count;
        //                         break;
        //                     case "error":
        //                         joel.wordCount.error.count += data.total_count;
        //                         break;
        //                     case "version":
        //                         joel.wordCount.version.count += data.total_count;
        //                         break;
        //                     case "tranfer":
        //                         joel.wordCount.transfer.count += data.total_count;
        //                         break;
        //                 }
        //             })
        //         }
        //     }
        //     // console.log(this.wordCount);
        //     defer.resolve(this.wordCount);
        //     return defer.promise;
        // },
        // these 2 functions work together to query for comments
        queryForPageCountToHelpGetComments: function(query) {
            // console.log(query);
            var defer = $q.defer();

            $http.get("https://api.appbot.co/api/v1/apps/" + query.OSandCountry + "/reviews?key=28f80e0af8c5c2853f8b614ffb754263a72d69db&start=" + query.startDate + "&end=" + query.endDate + "&page=1").
            then(function(res) {
                var data = res.data
                    // console.log(data);
                defer.resolve(data)
            })
            return defer.promise;
        },
        queryWalletComments: function(query) {
            var defer = $q.defer();
            var arr = [];
            for (var i = 1; i <= query.page; i++) {
                $http.get("https://api.appbot.co/api/v1/apps/" + query.OSandCountry + "/reviews?key=28f80e0af8c5c2853f8b614ffb754263a72d69db&start=" + query.startDate + "&end=" + query.endDate + "&page=" + i).
                then(function(res) {
                    var data = res.data.results
                    for (var j = 0; j < data.length; j++) {
                        // console.log(data);
                        arr.push(data[j]);
                    }
                })
            }
            defer.resolve(arr);
            return defer.promise;
        },
        averages: {
            US1: [],
            Chile1: [],
            Colombia1: [],
            Spain1: [],
            Mexico1: [],
            US2: [],
            Chile2: [],
            Colombia2: [],
            Spain2: [],
            Mexico2: []
        },
        averageWeeklyQuery: function(query) {
            var defer = $q.defer();
            var OSandCountry = [892941, 1265819, 1234562, 1236152, 1198698, 785799, 888242, 1235970, 468232, 842231];
            for (var i = 0; i < OSandCountry.length; i++) {
                $http.get("https://api.appbot.co/api/v1/apps/" + OSandCountry[i] + "/reviews/by_date?key=28f80e0af8c5c2853f8b614ffb754263a72d69db&start=" + query.startDate + "&end=" + query.endDate + "&pad_empty=n")
                    .then(function(res) {
                        // console.log(res);
                        var urlID = res.config.url;
                        var walletApp = []
                        var weekAverage = res.data.average_rating
                        walletApp.push(urlID.slice(34, 40));
                        switch (walletApp[0]) {
                            case '892941':
                                if (weekAverage === null) {
                                    joel.averages.US1.push(0);
                                } else {
                                    joel.averages.US1.push(weekAverage);
                                }
                                break;
                            case '126581':
                                if (weekAverage === null) {
                                    joel.averages.Chile1.push(0);
                                } else {
                                    joel.averages.Chile1.push(weekAverage);
                                }
                                break;
                            case '123456':
                                if (weekAverage === null) {
                                    joel.averages.Colombia1.push(0);
                                } else {
                                    joel.averages.Colombia1.push(weekAverage);
                                }
                                break;
                            case '123615':
                                if (weekAverage === null) {
                                    joel.averages.Spain1.push(0);
                                } else {
                                    joel.averages.Spain1.push(weekAverage);
                                }
                                break;
                            case '119869':
                                if (weekAverage === null) {
                                    joel.averages.Mexico1.push(0);
                                } else {
                                    joel.averages.Mexico1.push(weekAverage);
                                }
                                break;
                            case '785799':
                                if (weekAverage === null) {
                                    joel.averages.US2.push(0);
                                } else {
                                    joel.averages.US2.push(weekAverage);
                                }
                                break;
                            case '888242':
                                if (weekAverage === null) {
                                    joel.averages.Chile2.push(0);
                                } else {
                                    joel.averages.Chile2.push(weekAverage);
                                }
                                break;
                            case '123597':
                                if (weekAverage === null) {
                                    joel.averages.Colombia2.push(0);
                                } else {
                                    joel.averages.Colombia2.push(weekAverage);
                                }
                                break;
                            case '468232':
                                if (weekAverage === null) {
                                    joel.averages.Spain2.push(0);
                                } else {
                                    joel.averages.Spain2.push(weekAverage);
                                }
                                break;
                            case '842231':
                                if (weekAverage === null) {
                                    joel.averages.Mexico2.push(0);
                                } else {
                                    joel.averages.Mexico2.push(weekAverage);
                                }
                                break;
                        }
                    })
            }
            defer.resolve(joel.averages)
            return defer.promise
        },
        googleAnalytics: function(query) {
            var defer = $q.defer();
            // console.log(query);
            $http({
                method: "GET",
                url: "/api/wallet/getDurations",
                params: query
            }).then(function(res) {
                // console.log(res);
                defer.resolve(res);
            })
            return defer.promise;
        },
        queryReviewBreakdown: function(query) {
                // console.log(query.OSandCountry);
                let defer = $q.defer();
                $http.get("https://api.appbot.co/api/v1/apps/" + query.OSandCountry + "/reviews/by_rating?key=28f80e0af8c5c2853f8b614ffb754263a72d69db&start=" + query.startDate + "&end=" + query.endDate).
                then(function(res) {
                    let data = res.data.results;
                    defer.resolve(data);
                })
                return defer.promise;
            }
            //////vvvvvTESTvvvvv/////////vvvvvTESTvvvvv//////////vvvvvTESTvvvvv////////vvvvvTESTvvvvv////////
            // testQueries: function() {
            //     var defer = $q.defer();
            //     $http.get("/api/wallet/getDurations")
            //         .then(function(res) {
            //             console.log(res);
            //             // var data = res.data
            //             // console.log(data);
            //             defer.resolve(res)
            //         })
            //     return defer.promise
            // }
    }
})
