app.factory('NewsFactory', function($http) {

	var factory = {
		getAll: function() {
			var promise = $http({ method: 'GET', url: 'api/newses.json?34334'}).success(function(data, status, headers, config) {
				return data;
			});
			return promise;
		},
		getSingle: function() {
			var promise = $http({ method: 'GET', url: 'api/news.json?34334'}).success(function(data, status, headers, config) {
				return data;
			});
			return promise;
		}
	};

	return factory;
});
