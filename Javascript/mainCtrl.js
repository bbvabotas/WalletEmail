app.controller("walletCtrl", function($scope, $rootScope, walletFtry, $timeout) {

    // read name of function for description
    function getAverageSessionDurationFromGoogleAnalytics() {
        var query = {
            US: 'ga:101816633',
            Spain: 'ga:72158978',
            Mexico: 'ga:93386828',
            Chile: 'ga:93386029',
            Colombia: 'ga:121736585'
        }
        walletFtry.googleAnalytics(query.US).then(function(res) {

            var roundA = Math.floor(res.data[0][2]);
            $scope.USAndroidASDpx = roundA
                // console.log("US: Android", roundA);
                // console.log(res.data);
            var mins = Math.floor(roundA / 60);
            var secs = roundA % 60;
            var timeAndroid = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
            // console.log("US: Android", timeAndroid.slice(1));
            $scope.USAndroidASDtime = timeAndroid.slice(1)
                //////////////////////////////////////////////// 
            var roundi = Math.floor(res.data[2][2]);
            $scope.USiOSASDpx = roundi
            var mins = Math.floor(roundi / 60);
            var secs = roundi % 60;
            var timeiOS = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
            // console.log("US: iOS", timeiOS.slice(1));
            $scope.USiOSASDtime = timeiOS.slice(1)
        })
        $timeout(function() {
            walletFtry.googleAnalytics(query.Chile).then(function(res) {
                var roundA = Math.floor(res.data[0][2]);
                $scope.ChileAndroidASDpx = roundA;
                // console.log(roundA);
                // console.log(res.data);
                var mins = Math.floor(roundA / 60);
                var secs = roundA % 60;
                var timeAndroid = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
                // console.log("Chile: Android", timeAndroid.slice(1));
                $scope.ChileAndroidASDtime = timeAndroid.slice(1);
                /////////////////////////////////////////////////////////
                var roundi = Math.floor(res.data[1][2]);
                $scope.ChileiOSASDpx = roundi;
                var mins = Math.floor(roundi / 60);
                var secs = roundi % 60;
                var timeiOS = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
                // console.log("Chile: iOS", timeiOS.slice(1));
                $scope.ChileiOSASDtime = timeiOS.slice(1);
            })
        }, 2000)
        $timeout(function() {
            walletFtry.googleAnalytics(query.Colombia).then(function(res) {
                var roundA = Math.floor(res.data[0][2]);
                // console.log(res.data);
                $scope.ColombiaAndroidASDpx = roundA;
                var mins = Math.floor(roundA / 60);
                var secs = roundA % 60;
                var timeAndroid = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
                // console.log("Colombia: Android", timeAndroid.slice(1));
                $scope.ColombiaAndroidASDtime = timeAndroid.slice(1);
                ///////////////////////////////////////////////////// 
                var roundi = Math.floor(res.data[1][2]);
                // console.log(res.data);
                $scope.ColombiaiOSASDpx = roundi;
                var mins = Math.floor(roundi / 60);
                var secs = roundi % 60;
                var timeiOS = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
                // console.log("Colombia: iOS", timeiOS);
                $scope.ColombiaiOSASDtime = timeiOS.slice(1);
            })
        }, 4000)
        $timeout(function() {
            walletFtry.googleAnalytics(query.Spain).then(function(res) {
                // console.log(res);
                var roundA = Math.floor(res.data[0][2]);
                $scope.SpainAndroidASDpx = roundA;
                // console.log($scope.SpainAndroidASDpx);
                var mins = Math.floor(roundA / 60);
                var secs = roundA % 60;
                var timeAndroid = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
                // console.log("Spain: Android", timeAndroid);
                $scope.SpainAndroidASDtime = timeAndroid.slice(1);
                /////////////////////////////////////////////////////// 
                var roundi = Math.floor(res.data[2][2]);
                $scope.SpainiOSASDpx = roundi;
                // console.log(res.data);
                // console.log($scope.SpainiOSASDpx);
                var mins = Math.floor(roundi / 60);
                var secs = roundi % 60;
                var timeiOS = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
                // console.log("Spain: iOS", timeiOS);
                $scope.SpainiOSASDtime = timeiOS.slice(1);
            })
        }, 6000)
        $timeout(function() {
            walletFtry.googleAnalytics(query.Mexico).then(function(res) {
                var roundA = Math.floor(res.data[0][2]);
                $scope.MexicoAndroidASDpx = roundA;
                var mins = Math.floor(roundA / 60);
                var secs = roundA % 60;
                var timeAndroid = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
                // console.log("Mexico: Android", timeAndroid);
                $scope.MexicoAndroidASDtime = timeAndroid.slice(1);
                /////////////////////////////////////////////////////
                var roundi = Math.floor(res.data[2][2]);
                // console.log(res.data);
                $scope.MexicoiOSASDpx = roundi;
                var mins = Math.floor(roundi / 60);
                var secs = roundi % 60;
                var timeiOS = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
                // console.log("Mexico: iOS", timeiOS);
                $scope.MexicoiOSASDtime = timeiOS.slice(1);
            })
        }, 8000)
    }

    /////////////////////////////////////////////////////////////////////////////////////////

    // gets the datapoints for highcharts
    function getSixWeekTrendFromAppbot() {
        $scope.width3rdBar = 250;
        var query6 = {
            startDate: moment().subtract(6, 'week').day(0).format("YYYY-MM-DD"),
            endDate: moment().subtract(6, 'week').day(6).format("YYYY-MM-DD")
        }
        var query5 = {
            startDate: moment().subtract(5, 'week').day(0).format("YYYY-MM-DD"),
            endDate: moment().subtract(5, 'week').day(6).format("YYYY-MM-DD")
        }
        var query4 = {
            startDate: moment().subtract(4, 'week').day(0).format("YYYY-MM-DD"),
            endDate: moment().subtract(4, 'week').day(6).format("YYYY-MM-DD")
        }
        var query3 = {
            startDate: moment().subtract(3, 'week').day(0).format("YYYY-MM-DD"),
            endDate: moment().subtract(3, 'week').day(6).format("YYYY-MM-DD")
        }
        var query2 = {
            startDate: moment().subtract(2, 'week').day(0).format("YYYY-MM-DD"),
            endDate: moment().subtract(2, 'week').day(6).format("YYYY-MM-DD")
        }
        var query1 = {
            startDate: moment().subtract(1, 'week').day(0).format("YYYY-MM-DD"),
            endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD")
        }
        var query0 = {
            startDate: moment().subtract(2, 'day').format("YYYY-MM-DD"),
            endDate: moment().subtract(1, 'day').format("YYYY-MM-DD")
        }

        walletFtry.averageWeeklyQuery(query6)

        $timeout(function() {
            walletFtry.averageWeeklyQuery(query5)
        }, 4000)

        $timeout(function() {
            walletFtry.averageWeeklyQuery(query4)
        }, 7000)

        $timeout(function() {
            walletFtry.averageWeeklyQuery(query3)
        }, 10000)

        $timeout(function() {
            walletFtry.averageWeeklyQuery(query2)
        }, 13000)

        $timeout(function() {
            walletFtry.averageWeeklyQuery(query1)
        }, 16000)

        $timeout(function() {
            walletFtry.averageWeeklyQuery(query0).then(function(res) {
                // console.log("HighCharts 6 Week Trend", res);
                $scope.sixWeekTrend = res;
                // console.log($scope.sixWeekTrend.US1)
                $rootScope.$broadcast("updateSeries")
            })
        }, 19000)
    }

    /////////////////////////////////////////////////////////////////////////////////////////
    // WHAT I'M CURRENTLY WORKING ON
    function getRatingsBreakdownFromAppbot() {
        // US Android
        var query1 = {
                OSandCountry: 892941,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD")
            }
            // chile android
        var query2 = {
                OSandCountry: 1265819,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // colombia android
        var query3 = {
                OSandCountry: 1234562,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // spain android
        var query4 = {
                OSandCountry: 1236152,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // mexico android
        var query5 = {
                OSandCountry: 1198698,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // us ios
        var query6 = {
                OSandCountry: 785799,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // chile ios
        var query7 = {
                OSandCountry: 888242,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // colombia ios
        var query8 = {
                OSandCountry: 1235970,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // spain ios
        var query9 = {
                OSandCountry: 468232,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // mexico ios
        var query10 = {
            OSandCountry: 842231,
            startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
            endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
            page: 1
        }

        walletFtry.queryReviewBreakdown(query1).then(function(res) {
            $scope.breakdownRating1 = res;

        })

        $timeout(function() {
            walletFtry.queryReviewBreakdown(query2).then(function(res) {
                $scope.breakdownRating2 = res;
            })
        }, 2000)
        $timeout(function() {
            walletFtry.queryReviewBreakdown(query3).then(function(res) {
                $scope.breakdownRating3 = res;
            })
        }, 4000)
        $timeout(function() {
            walletFtry.queryReviewBreakdown(query4).then(function(res) {
                $scope.breakdownRating4 = res;
            })
        }, 6000)
        $timeout(function() {
            walletFtry.queryReviewBreakdown(query5).then(function(res) {
                $scope.breakdownRating5 = res;
            })
        }, 8000)
        $timeout(function() {
            walletFtry.queryReviewBreakdown(query6).then(function(res) {
                $scope.breakdownRating6 = res;
            })
        }, 10000)
        $timeout(function() {
            walletFtry.queryReviewBreakdown(query7).then(function(res) {
                $scope.breakdownRating7 = res;
            })
        }, 12000)
        $timeout(function() {
            walletFtry.queryReviewBreakdown(query8).then(function(res) {
                $scope.breakdownRating8 = res;
            })
        }, 14000)
        $timeout(function() {
            walletFtry.queryReviewBreakdown(query9).then(function(res) {
                $scope.breakdownRating9 = res;
            })
        }, 16000)
        $timeout(function() {
            walletFtry.queryReviewBreakdown(query10).then(function(res) {
                $scope.breakdownRating10 = res;
            })
        }, 18000)
    }

    /////////////////////////////////////////////////////////////////////////////////////////

    // gets the counts for the word frequency table
    function getWordFrequencyFromAppbot() {
        walletFtry.queryWalletWordFrequency().
        then(function(res) {
            $scope.wordFrequency = res;
            // console.log("wordFrequency", res);
        })
    }

    /////////////////////////////////////////////////////////////////////////////////////////

    // gets all the comments, Android & iOS 
    function getCommentsFromAppbot() {
        // us android
        var query1 = {
                OSandCountry: 892941,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // chile android
        var query2 = {
                OSandCountry: 1265819,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // colombia android
        var query3 = {
                OSandCountry: 1234562,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // spain android
        var query4 = {
                OSandCountry: 1236152,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // mexico android
        var query5 = {
                OSandCountry: 1198698,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // us ios
        var query6 = {
                OSandCountry: 785799,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // chile ios
        var query7 = {
                OSandCountry: 888242,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // colombia ios
        var query8 = {
                OSandCountry: 1235970,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // spain ios
        var query9 = {
                OSandCountry: 468232,
                startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
                page: 1
            }
            // mexico ios
        var query10 = {
            OSandCountry: 842231,
            startDate: moment().subtract(1, 'week').day(0).format('YYYY-MM-DD'),
            endDate: moment().subtract(1, 'week').day(6).format("YYYY-MM-DD"),
            page: 1
        }

        $scope.comments1to3 = 0;

        // us android
        walletFtry.queryForPageCountToHelpGetComments(query1).then(function(res) {
                query1.page = res.total_pages
                walletFtry.queryWalletComments(query1).
                then(function(res) {
                    console.log(res);
                    $timeout(function() {
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].rating <= 3) {
                                $scope.comments1to3++;
                            }
                        }
                    }, 3000)
                    $scope.USA1 = res;
                })
            })
            // chile android
        $timeout(function() {
                walletFtry.queryForPageCountToHelpGetComments(query2).then(function(res) {
                    query2.page = res.total_pages
                    walletFtry.queryWalletComments(query2).
                    then(function(res) {
                        $timeout(function() {
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].rating <= 3) {
                                    $scope.comments1to3++;
                                }
                            }
                        }, 5000)
                        $scope.Chile1 = res;
                    })
                })
            }, 2000)
            // colombia android
        $timeout(function() {
                walletFtry.queryForPageCountToHelpGetComments(query3).then(function(res) {
                    query3.page = res.total_pages
                    walletFtry.queryWalletComments(query3).
                    then(function(res) {
                        $timeout(function() {
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].rating <= 3) {
                                    $scope.comments1to3++;
                                }
                            }
                        }, 7000)
                        $scope.Colombia1 = res;
                    })
                })
            }, 4000)
            // spain android
        $timeout(function() {
                walletFtry.queryForPageCountToHelpGetComments(query4).then(function(res) {
                    query4.page = res.total_pages
                    walletFtry.queryWalletComments(query4).
                    then(function(res) {
                        $timeout(function() {
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].rating <= 3) {
                                    $scope.comments1to3++;
                                }
                            }
                        }, 9000)
                        $scope.Spain1 = res;
                    })
                })
            }, 6000)
            // mexico android
        $timeout(function() {
                walletFtry.queryForPageCountToHelpGetComments(query5).then(function(res) {
                    query5.page = res.total_pages
                    walletFtry.queryWalletComments(query5).
                    then(function(res) {
                        $timeout(function() {
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].rating <= 3) {
                                    $scope.comments1to3++;
                                }
                            }
                        }, 11000)
                        $scope.Mexico1 = res;
                    })
                })
            }, 8000)
            // us ios
        $timeout(function() {
                walletFtry.queryForPageCountToHelpGetComments(query6).then(function(res) {
                    query6.page = res.total_pages
                    walletFtry.queryWalletComments(query6).
                    then(function(res) {
                        // console.log(res);
                        $timeout(function() {
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].rating <= 3) {
                                    $scope.comments1to3++;
                                }
                            }
                        }, 13000)
                        $scope.USA2 = res;
                    })
                })

            }, 10000)
            // chile ios
        $timeout(function() {
                walletFtry.queryForPageCountToHelpGetComments(query7).then(function(res) {
                    query7.page = res.total_pages
                    walletFtry.queryWalletComments(query7).
                    then(function(res) {
                        // console.log(res);
                        $timeout(function() {
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].rating <= 3) {
                                    $scope.comments1to3++;
                                }
                            }
                        }, 15000)
                        $scope.Chile2 = res;
                    })
                })
            }, 12000)
            // colombia ios
        $timeout(function() {
                walletFtry.queryForPageCountToHelpGetComments(query8).then(function(res) {
                    query8.page = res.total_pages
                    walletFtry.queryWalletComments(query8).
                    then(function(res) {
                        // console.log(res);
                        $timeout(function() {
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].rating <= 3) {
                                    $scope.comments1to3++;
                                }
                            }
                        }, 17000)

                        $scope.Colombia2 = res;
                    })
                })
            }, 14000)
            // spain ios
        $timeout(function() {
                walletFtry.queryForPageCountToHelpGetComments(query9).then(function(res) {
                    query9.page = res.total_pages
                    walletFtry.queryWalletComments(query9).
                    then(function(res) {
                        // console.log(res);
                        $timeout(function() {
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].rating <= 3) {
                                    $scope.comments1to3++;
                                }
                            }
                        }, 19000)
                        $scope.Spain2 = res;
                    })
                })
            }, 16000)
            // mexico ios
        $timeout(function() {
            walletFtry.queryForPageCountToHelpGetComments(query10).then(function(res) {
                query10.page = res.total_pages
                walletFtry.queryWalletComments(query10).
                then(function(res) {
                    // console.log(res);
                    $timeout(function() {
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].rating <= 3) {
                                $scope.comments1to3++;
                            }
                        }
                    }, 21000)
                    $scope.Mexico2 = res;
                })
            })
        }, 18000)
    }

    /////////////////Variable for the maximum width of bar in Average Session Duration///////
    $scope.maxWidthBarGraph = 437

    /////////////////Variables for last week in the title////////////////////////////////////
    $scope.titleDateStart = moment().subtract(1, 'week').day(0).format("MMMM DD");
    $scope.titleDateEnd = moment().subtract(1, 'week').day(6).format("MMMM DD");

    /////////////////Variables for last week in word frequency table/////////////////////////
    $scope.startDateWordFrequency = moment().subtract(1, 'week').day(0).format("MMM-DD")
    $scope.endDateWordFrequency = moment().subtract(1, 'week').day(6).format("MMM-DD")

    /////////////////Variables for Date in graph options/////////////////////////////////////
    var week6AgoStart = moment().subtract(6, "week").day(0).format("MMM-DD"),
        week6AgoEnd = moment().subtract(6, "week").day(6).format("MMM-DD"),
        week5AgoStart = moment().subtract(5, "week").day(0).format("MMM-DD"),
        week5AgoEnd = moment().subtract(5, "week").day(6).format("MMM-DD"),
        week4AgoStart = moment().subtract(4, "week").day(0).format("MMM-DD"),
        week4AgoEnd = moment().subtract(4, "week").day(6).format("MMM-DD"),
        week3AgoStart = moment().subtract(3, "week").day(0).format("MMM-DD"),
        week3AgoEnd = moment().subtract(3, "week").day(6).format("MMM-DD"),
        week2AgoStart = moment().subtract(2, "week").day(0).format("MMM-DD"),
        week2AgoEnd = moment().subtract(2, "week").day(6).format("MMM-DD"),
        week1AgoStart = moment().subtract(1, "week").day(0).format("MMM-DD"),
        week1AgoEnd = moment().subtract(1, "week").day(6).format("MMM-DD");

    $scope.AndroidUS = {
        chart: {
            height: 120,
            width: 910,
            events: {
                load: function() {
                    var series = this.series[0],
                        axis = this.xAxis[0],
                        chart = this;
                    // $rootScope.$on("updateCategories", function() { //this is constantly listening
                    //     axis.setCategories($scope.categoriesArr, true);
                    // })
                    $rootScope.$on("updateSeries", function() { //this is constantly listening
                        series.setData($scope.sixWeekTrend.US1, true);
                    })
                }
            }

        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        xAxis: {
            categories: [week6AgoStart + " to " + week6AgoEnd, week5AgoStart + " to " + week5AgoEnd, week4AgoStart + " to " + week4AgoEnd, week3AgoStart + " to " + week3AgoEnd, week2AgoStart + " to " + week2AgoEnd, week1AgoStart + " to " + week1AgoEnd]
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        yAxis: [{
            labels: {
                enabled: false,
                padding: 0
            },
            title: {
                text: ""
            }
        }],
        series: [{
            data: [3, 5, 5, 0, 4, 2.3]
        }]
    };
    $scope.AndroidChile = {
        chart: {
            height: 120,
            width: 910,
            events: {
                load: function() {
                    var series = this.series[0],
                        axis = this.xAxis[0],
                        chart = this;
                    // $rootScope.$on("updateCategories", function() { //this is constantly listening
                    //     axis.setCategories($scope.categoriesArr, true);
                    // })
                    $rootScope.$on("updateSeries", function() { //this is constantly listening
                        series.setData($scope.sixWeekTrend.Chile1, true);
                    })
                }
            }

        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },

        credits: {
            enabled: false
        },
        xAxis: {
            categories: [week6AgoStart + " to " + week6AgoEnd, week5AgoStart + " to " + week5AgoEnd, week4AgoStart + " to " + week4AgoEnd, week3AgoStart + " to " + week3AgoEnd, week2AgoStart + " to " + week2AgoEnd, week1AgoStart + " to " + week1AgoEnd]
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        yAxis: [{
            labels: {
                enabled: false,
                padding: 0
            },
            title: {
                text: ""
            }
        }],
        series: [{
            data: [3.5, 2.5, 3.5, 1, 2.5, 0]
        }]
    };
    $scope.AndroidColombia = {
        chart: {
            height: 120,
            width: 910,
            events: {
                load: function() {
                    var series = this.series[0],
                        axis = this.xAxis[0],
                        chart = this;
                    // $rootScope.$on("updateCategories", function() { //this is constantly listening
                    //     axis.setCategories($scope.categoriesArr, true);
                    // })
                    $rootScope.$on("updateSeries", function() { //this is constantly listening
                        series.setData($scope.sixWeekTrend.Colombia1, true);
                    })
                }
            }

        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: [week6AgoStart + " to " + week6AgoEnd, week5AgoStart + " to " + week5AgoEnd, week4AgoStart + " to " + week4AgoEnd, week3AgoStart + " to " + week3AgoEnd, week2AgoStart + " to " + week2AgoEnd, week1AgoStart + " to " + week1AgoEnd]
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        yAxis: [{
            labels: {
                enabled: false,
                padding: 0
            },
            title: {
                text: ""
            }
        }],
        series: [{
            data: [4.6, 4.4, 5, 5, 4.9, 4.6]
        }]
    };
    $scope.AndroidSpain = {
        chart: {
            height: 120,
            width: 910,
            events: {
                load: function() {
                    var series = this.series[0],
                        axis = this.xAxis[0],
                        chart = this;
                    // $rootScope.$on("updateCategories", function() { //this is constantly listening
                    //     axis.setCategories($scope.categoriesArr, true);
                    // })
                    $rootScope.$on("updateSeries", function() { //this is constantly listening
                        series.setData($scope.sixWeekTrend.Spain1, true);
                    })
                }
            }

        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },

        xAxis: {
            categories: [week6AgoStart + " to " + week6AgoEnd, week5AgoStart + " to " + week5AgoEnd, week4AgoStart + " to " + week4AgoEnd, week3AgoStart + " to " + week3AgoEnd, week2AgoStart + " to " + week2AgoEnd, week1AgoStart + " to " + week1AgoEnd]
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        yAxis: [{
            labels: {
                enabled: false,
                padding: 0
            },
            title: {
                text: ""
            }
        }],
        series: [{
            data: [3.4, 3.6, 3.2, 3.4, 2.7, 2.1]
        }]
    };
    $scope.AndroidMexico = {
        chart: {
            height: 120,
            width: 910,
            events: {
                load: function() {
                    var series = this.series[0],
                        axis = this.xAxis[0],
                        chart = this;
                    // $rootScope.$on("updateCategories", function() { //this is constantly listening
                    //     axis.setCategories($scope.categoriesArr, true);
                    // })
                    $rootScope.$on("updateSeries", function() { //this is constantly listening
                        series.setData($scope.sixWeekTrend.Mexico1, true);
                    })
                }
            }

        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },

        credits: {
            enabled: false
        },
        xAxis: {
            categories: [week6AgoStart + " to " + week6AgoEnd, week5AgoStart + " to " + week5AgoEnd, week4AgoStart + " to " + week4AgoEnd, week3AgoStart + " to " + week3AgoEnd, week2AgoStart + " to " + week2AgoEnd, week1AgoStart + " to " + week1AgoEnd]
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        yAxis: [{
            labels: {
                enabled: false,
                padding: 0
            },
            title: {
                text: ""
            }
        }],
        series: [{
            data: [4, 3.6, 3.5, 3.5, 3.2, 3.0]
        }]
    };
    $scope.iOSUS = {
        chart: {
            height: 120,
            width: 910,
            events: {
                load: function() {
                    var series = this.series[0],
                        axis = this.xAxis[0],
                        chart = this;
                    // $rootScope.$on("updateCategories", function() { //this is constantly listening
                    //     axis.setCategories($scope.categoriesArr, true);
                    // })
                    $rootScope.$on("updateSeries", function() { //this is constantly listening
                        series.setData($scope.sixWeekTrend.US2, true);
                    })
                }
            }

        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },

        credits: {
            enabled: false
        },
        xAxis: {
            categories: [week6AgoStart + " to " + week6AgoEnd, week5AgoStart + " to " + week5AgoEnd, week4AgoStart + " to " + week4AgoEnd, week3AgoStart + " to " + week3AgoEnd, week2AgoStart + " to " + week2AgoEnd, week1AgoStart + " to " + week1AgoEnd]
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        yAxis: [{
            labels: {
                enabled: false,
                padding: 0
            },
            title: {
                text: ""
            }
        }],
        series: [{
            data: [1, 0, 0, 0, 2, 1]
        }]
    };
    $scope.iOSChile = {
        chart: {
            height: 120,
            width: 910,
            events: {
                load: function() {
                    var series = this.series[0],
                        axis = this.xAxis[0],
                        chart = this;
                    // $rootScope.$on("updateCategories", function() { //this is constantly listening
                    //     axis.setCategories($scope.categoriesArr, true);
                    // })
                    $rootScope.$on("updateSeries", function() { //this is constantly listening
                        series.setData($scope.sixWeekTrend.Chile2, true);
                    })
                }
            }

        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },

        xAxis: {
            categories: [week6AgoStart + " to " + week6AgoEnd, week5AgoStart + " to " + week5AgoEnd, week4AgoStart + " to " + week4AgoEnd, week3AgoStart + " to " + week3AgoEnd, week2AgoStart + " to " + week2AgoEnd, week1AgoStart + " to " + week1AgoEnd]
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        yAxis: [{
            labels: {
                enabled: false,
                padding: 0
            },
            title: {
                text: ""
            }
        }],
        series: [{
            data: [2, 2.4, 3, 3.5, 3.7, 2.5]
        }]
    };
    $scope.iOSColombia = {
        chart: {
            height: 120,
            width: 910,
            events: {
                load: function() {
                    var series = this.series[0],
                        axis = this.xAxis[0],
                        chart = this;
                    // $rootScope.$on("updateCategories", function() { //this is constantly listening
                    //     axis.setCategories($scope.categoriesArr, true);
                    // })
                    $rootScope.$on("updateSeries", function() { //this is constantly listening
                        series.setData($scope.sixWeekTrend.Colombia2, true);
                    })
                }
            }

        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: [week6AgoStart + " to " + week6AgoEnd, week5AgoStart + " to " + week5AgoEnd, week4AgoStart + " to " + week4AgoEnd, week3AgoStart + " to " + week3AgoEnd, week2AgoStart + " to " + week2AgoEnd, week1AgoStart + " to " + week1AgoEnd]
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        yAxis: [{
            labels: {
                enabled: false,
                padding: 0
            },
            title: {
                text: ""
            }
        }],
        series: [{
            data: [0, 0, 0, 0, 1, 0]
        }]
    };
    $scope.iOSSpain = {
        chart: {
            height: 120,
            width: 910,
            events: {
                load: function() {
                    var series = this.series[0],
                        axis = this.xAxis[0],
                        chart = this;
                    // $rootScope.$on("updateCategories", function() { //this is constantly listening
                    //     axis.setCategories($scope.categoriesArr, true);
                    // })
                    $rootScope.$on("updateSeries", function() { //this is constantly listening
                        series.setData($scope.sixWeekTrend.Spain2, true);
                    })
                }
            }

        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: [week6AgoStart + " to " + week6AgoEnd, week5AgoStart + " to " + week5AgoEnd, week4AgoStart + " to " + week4AgoEnd, week3AgoStart + " to " + week3AgoEnd, week2AgoStart + " to " + week2AgoEnd, week1AgoStart + " to " + week1AgoEnd]
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        yAxis: [{
            labels: {
                enabled: false,
                padding: 0
            },
            title: {
                text: ""
            }
        }],
        series: [{
            data: [1, 1.3, 1, 1, 2.7, 1]
        }]
    };
    $scope.iOSMexico = {
        chart: {
            height: 120,
            width: 910,
            events: {
                load: function() {
                    var series = this.series[0],
                        axis = this.xAxis[0],
                        chart = this;
                    // $rootScope.$on("updateCategories", function() { //this is constantly listening
                    //     axis.setCategories($scope.categoriesArr, true);
                    // })
                    $rootScope.$on("updateSeries", function() { //this is constantly listening
                        series.setData($scope.sixWeekTrend.Mexico2, true);
                    })
                }
            }

        },
        title: {
            text: ''
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        xAxis: {
            categories: [week6AgoStart + " to " + week6AgoEnd, week5AgoStart + " to " + week5AgoEnd, week4AgoStart + " to " + week4AgoEnd, week3AgoStart + " to " + week3AgoEnd, week2AgoStart + " to " + week2AgoEnd, week1AgoStart + " to " + week1AgoEnd]
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        yAxis: [{
            labels: {
                enabled: false,
                padding: 0
            },
            title: {
                text: ""
            }
        }],
        series: [{
            data: [5, 3.6, 4.3, 4.3, 5, 4.5]
        }]
    };

    // ///////////////////////////////
    // this takes 10 seconds
    getAverageSessionDurationFromGoogleAnalytics();
    ///////////////////////////////
    // this takes 20 seconds
    $timeout(function() {
            getSixWeekTrendFromAppbot();
        }, 10000)
        //     ///////////////////////////////
        //     // this takes 20 seconds
    $timeout(() => {
            getRatingsBreakdownFromAppbot()
        }, 30000)
            ///////////////////////////////
            // this takes 31 seconds
    $timeout(function() {
            getWordFrequencyFromAppbot();
        }, 51000)
            //     /////////////////////////////  
            //     // this takes 20 seconds
    $timeout(function() {
            getCommentsFromAppbot();
        }, 85000)
        // }, 85000)
        //////vvvvvTESTvvvvv/////////vvvvvTESTvvvvv///////////////////////////////////////////////////////

    // function testAPI() {
    //     walletFtry.queryAllTimeRating().then(function(res) {
    //         console.log(res)
    //     })
    // }
    // testAPI();


    // getComments1To3FromAppbott();
    //////^^^^^TEST^^^^//////////^^^^^TEST^^^^///////////////////////////////////////////////////////

})
