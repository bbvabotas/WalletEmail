$(document).ready(function(){
    var walletAppSummaryFunctions = {
        init: function(){
            
            $('#current_date_range').html(moment().day(-7).format('MMM DD') + ' - ' + moment().day(-1).format('MMM DD'))
            
            walletAppSummaryFunctions.getAppRatings();
            
            walletAppSummaryFunctions.getAppLogins('android');
            walletAppSummaryFunctions.getAppLoginsPerDownloads('android');
            
            walletAppSummaryFunctions.getAppLogins('ios');
            walletAppSummaryFunctions.getAppLoginsPerDownloads('ios');
            
            walletAppSummaryFunctions.getAppCommentsAndroid();
            walletAppSummaryFunctions.getAppCommentsIOS();
            
            walletAppSummaryFunctions.getSessionDuration('android');
            walletAppSummaryFunctions.getSessionDuration('ios');
            
            walletAppSummaryFunctions.displayAndroidVsIosPieChart();
        },
        csvJSON: function(csv, platform){
            var i = 0;
            
//            if(platform == 'android'){
//                
//            } else if(platform == 'ios'){
//                var papa_data = Papa.parse(csv);
//                var papa_json = [];
//
//                for(i = 1; i < papa_data.data.length; i++){
//                    papa_json.push({
//                        date: papa_data.data[i][0],
//                        rating: papa_data.data[i][1],
//                        review: papa_data.data[i][3],
//                        subject: papa_data.data[i][2]
//                    });
//                }
//                //console.log(papa_data);
//                //console.log(papa_json);
//                return papa_json;
//            }
            
            var lines=csv.split("\n"), result = [], headers=lines[0].split(","), obj = {}, currentline = '',
            lines_length = lines.length, headers_length = 0, new_json;
            for(i = 1; i < lines_length; i++){
                obj = {}; currentline = lines[i].split(","); headers_length = headers.length;
                for(var j = 0; j < headers_length; j++){
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
            new_json = JSON.stringify(result);
            //console.log(JSON.parse(new_json));
            return JSON.parse(new_json);
        },
        convertNumberToHaveCommas: function(num){
            var new_num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return new_num;
        },
        getAppRatings: function(){
            var i = 0, app_data_count = 0,
                app_platform = '',
                countries = ['US', 'Chile', 'Colombia', 'Spain', 'Mexico'],
                app_countries = ['US', 'CL', 'CO', 'ES', 'MX'];
            
            /*      Get the overall ratings from Appbot      */
            function getAppData(app_platform){
                
                $('#' + countries[app_data_count] + '_app_rating_' + app_platform).html('loading...');
                
                if(app_platform == 'ios'){
                    app_url = "https://api.appbot.co/api/v1/apps/" + walletAppSummaryFunctions.getCountryIdForAppbot(countries[app_data_count], app_platform) + "/ratings?key=504802b7cce1c88957d96bd6b8fa0ceca645ec3d&country=" + app_countries[app_data_count];
                } else if(app_platform == 'android'){
                    app_url = "https://api.appbot.co/api/v1/apps/" + walletAppSummaryFunctions.getCountryIdForAppbot(countries[app_data_count], app_platform) + "/ratings?key=504802b7cce1c88957d96bd6b8fa0ceca645ec3d";
                }
                
                var fixed_rating = '';
                $.ajax({
                    method: "GET",
                    url: app_url,
                    success: function(data){
                        fixed_rating = data.all_time.average.toFixed(2);
                        $('#' + countries[app_data_count] + '_app_rating_' + app_platform).html(fixed_rating);
                        
                        app_data_count++;
                        
                        if(app_platform == 'android'){
                            if(app_data_count < 5){
                                getAppData(app_platform);
                            } else {
                                app_data_count = 0;
                                app_platform = 'ios';
                            }
                        }
                        if(app_platform == 'ios'){
                            if(app_data_count < 5){
                                getAppData(app_platform);
                            }
                        }
                        
                    },
                    error: function(error){
                        console.log(error);
                    }
                });
            }
            
            app_platform = 'android';
            getAppData(app_platform);
        },
        getCountryIdForAppbot: function(country, platform){
            
            var combined_app = country + '_Wallet_' + platform;
            
            switch(combined_app){
                case 'US_Wallet_android': return 892941;
                case 'US_Wallet_ios': return 785799;
                case 'Spain_Wallet_android': return 1236152;
                case 'Spain_Wallet_ios': return 468232;
                case 'Mexico_Wallet_android': return 1198698;
                case 'Mexico_Wallet_ios': return 842231;
                case 'Colombia_Wallet_android': return 1234562;
                case 'Colombia_Wallet_ios': return 1235970;
                case 'Chile_Wallet_android': return 1265819;
                case 'Chile_Wallet_ios': return 888242;
            }
        },
        getAppDownloads: function(app_platform){
            
            var i = 0,
                last_week = moment().day(-7).format('YYYY-MM-DD'),
                last_2_weeks = moment().day(-14).format('YYYY-MM-DD');

            function getPercentageOfWeekComparison(current, prev){
                var shift = (current/prev).toFixed(2);
                return shift;
            }
            
            $.ajax({
                method: "GET",
                dataType: 'text',
                url: 'data/app_downloads_' + app_platform + '.csv',
                success: function(file){
                    var download_data = walletAppSummaryFunctions.csvJSON(file, app_platform);

                    for(i = 0; i < 5; i++){
                        $('#' + download_data[i].country + '_app_downloads_' + app_platform).html(walletAppSummaryFunctions.convertNumberToHaveCommas(download_data[i][last_week]));
                        
                    }
                },
                error: function(error){
                    console.log(error);
                }
            });
        },
        getAppLogins: function(app_platform){
            var i = 0, html_text = '',
                last_week = moment().day(-7).format('YYYY-MM-DD'),
                last_2_weeks = moment().day(-14).format('YYYY-MM-DD');

            function getPercentageOfWeekComparison(current, prev){
                //var shift = (current/prev).toFixed(2);
                //return shift;
                
                var shift = ((current/prev) * 100).toFixed(0);
                
                if(shift < 100){
                    shift = '<span style="color:red">(-' + (100 - shift) + '%)</span>';
                } else if(shift > 100){
                    shift = '<span style="color:green">(+' + (shift - 100) + '%)</span>';
                } else {
                    shift = '(+0%)';
                }
                return shift;
            }
            
            $.ajax({
                method: "GET",
                dataType: 'text',
                url: 'data/app_logins_' + app_platform + '.csv',
                success: function(file){
                    var download_data = walletAppSummaryFunctions.csvJSON(file, app_platform);
                    
                    for(i = 0; i < 5; i++){
                        html_text = walletAppSummaryFunctions.convertNumberToHaveCommas(download_data[i][last_week]) + ' ' + getPercentageOfWeekComparison(download_data[i][last_week], download_data[i][last_2_weeks]) + '';
                        $('#' + download_data[i].country + '_sessions_' + app_platform).html(html_text);
                        //$('#' + download_data[i].country + '_app_logins_compare_android').html(getPercentageOfWeekComparison(download_data[i][last_week], download_data[i][last_2_weeks]));
                    }
                },
                error: function(error){
                    console.log(error);
                }
            });
        },
        getAppLoginsPerDownloads: function(app_platform){
            var i = 0,
                last_week = moment().day(-7).format('YYYY-MM-DD'),
                last_2_weeks = moment().day(-14).format('YYYY-MM-DD'),
                countries = ['US', 'Chile', 'Colombia', 'Spain', 'Mexico'],
                country_logins = {'US':0, 'Chile':0, 'Colombia':0, 'Spain':0, 'Mexico':0},
                country_downloads = {'US':0, 'Chile':0, 'Colombia':0, 'Spain':0, 'Mexico':0};
            
            function convertToPercentage(num1, num2){
                return ((num1 / num2) * 100).toFixed(2) + '%';
            }
            
            //First, get the logins
            $.ajax({
                method: "GET",
                dataType: 'text',
                url: 'data/app_logins_' + app_platform + '.csv',
                success: function(file){
                    var download_data = walletAppSummaryFunctions.csvJSON(file, app_platform);
                    
                    for(i = 0; i < 5; i++){
                        country_logins[download_data[i].country] = download_data[i][last_week];
                    }
                    
                    //Then get the downloads
                    $.ajax({
                        method: "GET",
                        dataType: 'text',
                        url: 'data/app_total_installs_' + app_platform + '.csv',
                        success: function(file){

                            var download_data_2 = walletAppSummaryFunctions.csvJSON(file, app_platform);

                            for(i = 0; i < 5; i++){
                                country_downloads[download_data_2[i].country] = download_data_2[i].total_installs;
                            }
                            
                            //Now divide logins / downloads
                            for(i = 0; i < 5; i++){
                                $('#' + countries[i] + '_app_logins_per_downloads_' + app_platform).html(convertToPercentage(country_logins[countries[i]],country_downloads[countries[i]]));
                                
                            }
                        },
                        error: function(error){
                            console.log(error);
                        }
                    });
                },
                error: function(error){
                    console.log(error);
                }
            });
        },
        getAppCommentsAndroid: function(){
            var i = 0, app_country_count = 0,
                last_week = moment().day(-7).format('YYYY-MM-DD'),
                last_week_end = moment().day(-1).format('YYYY-MM-DD'),
                countries = ['US', 'Chile', 'Colombia', 'Spain', 'Mexico'],
                app_data_temp = [],
                comments_data = [];
            
            function getReviews(){
                $.ajax({
                    method: "GET",
                    dataType: 'text',
                    url: '/src/app_reviews/data/reviews/' + countries[app_country_count] + '_Wallet_Android_Reviews.json',
                    success: function(file){
                        var review_data = JSON.parse(file),
                            review_date_temp = '',
                            subject_text = '',
                            translated_subject_text = '';
                        
                        //Get the reviews and add it to an array of objects so that we can reorder the reviews by rating
                        app_data_temp = [];
                        comments_data = [];
                        for(i = 0; i < review_data.length; i++){

                            if(review_data[i].review != ""){
                                review_date_temp = review_data[i].date;
                                if(review_date_temp >= last_week && review_date_temp <= last_week_end){

                                    app_data_temp.push({
                                        rating: review_data[i].rating,
                                        review: review_data[i].body,
                                        subject: review_data[i].subject
                                    });
                                    
                                    subject_text = '';
                                    translated_subject_text = '<br>';
                
                                    if(review_data[i].subject != ''){
                                        subject_text = '<strong>Subject:</strong> ' + review_data[i].subject + '<br>';
                                    }
                                    if(review_data[i].translated_subject != ''){
                                        translated_subject_text = '<br><strong>Translated Subject:</strong> ' + review_data[i].translated_subject + '<br>';
                                    }
                
                                    if(review_data[i].translated_body == null){
                                        comments_data.push({
                                            rating: review_data[i].rating,
                                            comment: subject_text + '<strong>Comment:</strong> ' + review_data[i].body,
                                            date: review_data[i].date
                                        });
                                    } else {
                                        comments_data.push({
                                            rating: review_data[i].rating,
                                            comment: subject_text + '<strong>Comment:</strong> ' + review_data[i].body +
                                                    '<br>' + translated_subject_text + '<strong>Translated Comment:</strong> ' + review_data[i].translated_body,
                                            date: review_data[i].date
                                        });
                                    }
                                }
                            }

                        }
                        console.log(countries[app_country_count]);
                        console.log(comments_data);
                        //Sort the reviews by rating from 1 -5
                        comments_data.sort(function(a,b){
                            return a.rating - b.rating;
                        });

                        //Add the reviews
                        if(comments_data.length == 0){
                            $('#' + countries[app_country_count] + '_comments_android').append(
                                '<tr>' +
                                    '<td style="text-align:center;">-</td>' +
                                    '<td style="width:120px">-</td>' +
                                    '<td style="width:400px">-</td>' +
                                '</tr>'
                            );
                        } else {
                            for(i = 0; i < comments_data.length; i++){
                                $('#' + countries[app_country_count] + '_comments_android').append(
                                    '<tr>' +
                                        '<td style="text-align:center;">' + comments_data[i].date + '</td>' +
                                        '<td style="text-align:left; width:400px">' + comments_data[i].comment + '</td>' +
                                        '<td style="text-align:right; width:20px">' + comments_data[i].rating + '</td>' +
                                    '</tr>'
                                );
                            }
                        }


                        app_country_count++;

                        if(app_country_count < 5){
                            getReviews();
                        }
                    },
                    error: function(error){
                        console.log(error);
                    }
                });
            }
            getReviews();
            
        },
        getAppCommentsIOS: function(){
            var i = 0, app_country_count = 0,
                last_week = moment().day(-7).format('YYYY-MM-DD'),
                last_week_end = moment().day(-1).format('YYYY-MM-DD'),
                countries = ['US', 'Chile', 'Colombia', 'Spain', 'Mexico'],
                app_data_temp = [],
                comments_data = [];
            
            function getReviews(){
                $.ajax({
                    method: "GET",
                    dataType: 'text',
                    url: '/src/app_reviews/data/reviews/' + countries[app_country_count] + '_Wallet_IOS_Reviews.json',
                    success: function(file){
                        var review_data = JSON.parse(file),
                            review_date_temp = '',
                            subject_text = '',
                            translated_subject_text = '';
                        
                        //Get the reviews and add it to an array of objects so that we can reorder the reviews by rating
                        app_data_temp = [];
                        comments_data = [];
                        for(i = 0; i < review_data.length; i++){

                            if(review_data[i].review != ""){
                                review_date_temp = review_data[i].date;
                                if(review_date_temp >= last_week && review_date_temp <= last_week_end){

                                    app_data_temp.push({
                                        rating: review_data[i].rating,
                                        review: review_data[i].body,
                                        subject: review_data[i].subject
                                    });
                                    
                                    subject_text = '';
                                    translated_subject_text = '<br>';
                
                                    if(review_data[i].subject != ''){
                                        subject_text = '<strong>Subject:</strong> ' + review_data[i].subject + '<br>';
                                    }
                                    if(review_data[i].translated_subject != ''){
                                        translated_subject_text = '<br><strong>Translated Subject:</strong> ' + review_data[i].translated_subject + '<br>';
                                    }
                
                                    if(review_data[i].translated_body == null){
                                        comments_data.push({
                                            rating: review_data[i].rating,
                                            comment: subject_text + '<strong>Comment:</strong> ' + review_data[i].body,
                                            date: review_data[i].date
                                        });
                                    } else {
                                        comments_data.push({
                                            rating: review_data[i].rating,
                                            comment: subject_text + '<strong>Comment:</strong> ' + review_data[i].body +
                                                    '<br>' + translated_subject_text + '<strong>Translated Comment:</strong> ' + review_data[i].translated_body,
                                            date: review_data[i].date
                                        });
                                    }
                                }
                            }

                        }
                        console.log(countries[app_country_count]);
                        console.log(comments_data);
                        //Sort the reviews by rating from 1 -5
                        comments_data.sort(function(a,b){
                            return a.rating - b.rating;
                        });

                        //Add the reviews
                        if(comments_data.length == 0){
                            $('#' + countries[app_country_count] + '_comments_ios').append(
                                '<tr>' +
                                    '<td style="text-align:center;">-</td>' +
                                    '<td style="width:120px">-</td>' +
                                    '<td style="width:400px">-</td>' +
                                '</tr>'
                            );
                        } else {
                            for(i = 0; i < comments_data.length; i++){
                                $('#' + countries[app_country_count] + '_comments_ios').append(
                                    '<tr>' +
                                        '<td style="text-align:center;">' + comments_data[i].date + '</td>' +
                                        '<td style="text-align:left; width:400px">' + comments_data[i].comment + '</td>' +
                                        '<td style="text-align:right; width:20px">' + comments_data[i].rating + '</td>' +
                                    '</tr>'
                                );
                            }
                        }


                        app_country_count++;

                        if(app_country_count < 5){
                            getReviews();
                        }
                    },
                    error: function(error){
                        console.log(error);
                    }
                });
            }
            getReviews();
        },
        getSessionDuration: function(app_platform){
            var i = 0, html_text = '',
                last_week = moment().day(-7).format('YYYY-MM-DD'),
                last_2_weeks = moment().day(-14).format('YYYY-MM-DD');
            
            function convertFromSecondsToMinutes(time){
                var minutes = Math.floor(time / 60);
                var seconds = time - minutes * 60;
                
                if(minutes < 10){
                    minutes = '0' + minutes;
                }
                if(seconds < 10){
                    seconds = '0' + seconds;
                }
                return minutes + ':' + seconds;
            }
            
            $.ajax({
                method: "GET",
                dataType: 'text',
                url: 'data/app_session_duration_' + app_platform + '.csv',
                success: function(file){
                    var session_data = walletAppSummaryFunctions.csvJSON(file, app_platform);

                    //console.log(session_data);
                    for(i = 0; i < 5; i++){
                        $('#' + session_data[i].country + '_session_duration_' + app_platform).html(convertFromSecondsToMinutes(session_data[i][last_week]));
                                                
                    }
                },
                error: function(error){
                    console.log(error);
                }
            });
        },
        displayAndroidVsIosPieChart(){
            
            var i = 0, all_countries_downloads = {
                android: 0,
                ios: 0
            },
                last_week = moment().day(-7).format('YYYY-MM-DD');
            
            $.ajax({
                method: "GET",
                dataType: 'text',
                url: 'data/app_logins_android.csv',
                success: function(file){
                    var download_data = walletAppSummaryFunctions.csvJSON(file);
                    
                    for(i = 0; i < download_data.length-1; i++){
                        all_countries_downloads.android += parseInt(download_data[i][last_week]);
                    }
                    
                    $.ajax({
                        method: "GET",
                        dataType: 'text',
                        url: 'data/app_logins_ios.csv',
                        success: function(file){
                            var download_data = walletAppSummaryFunctions.csvJSON(file);

                            for(i = 0; i < download_data.length-1; i++){
                                all_countries_downloads.ios += parseInt(download_data[i][last_week]);
                            }

                            buildChart(all_countries_downloads);
                        },
                        error: function(error){
                            console.log(error);
                        }
                    });
                },
                error: function(error){
                    console.log(error);
                }
            });
            
            function buildChart(data){
                Highcharts.chart('login_vs_chart', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Android VS iOS - Logins'
                    },
                    subtitle: {
                        text: 'Total across all countries'  
                    },
                    tooltip: {
                        enabled: false
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                enabled: true,
                                //format: '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y})',
                                formatter: function(){
                                    return this.point.name + ' ' + this.point.percentage.toFixed(1) + '% - ' + walletAppSummaryFunctions.convertNumberToHaveCommas(this.y)
                                }
                            }
                        }
                    },
                    series: [{
                        colorByPoint: true,
                        data: [{
                            name: 'Android',
                            y: data.android
                        }, {
                            name: 'iOS',
                            y: data.ios
                        }]
                    }]
                });
            }
        }
    }
    
    walletAppSummaryFunctions.init();
});