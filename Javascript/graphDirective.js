app.directive('hcCharts1', function() {
return {
    	restrict: 'E',
        template: '<div></div>',
        scope: {
        	options: '='
        },
        link: function (scope, element) {
                    // console.log("directive scope", scope)
            Highcharts.chart(element[0], scope.options);
        }
    };
})