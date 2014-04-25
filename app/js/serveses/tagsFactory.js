app.factory('staticDataFactory', function($http) {

	var factory = {
		getData: function(file) {
			var promise = $http({ method: 'GET', url: 'api/'+file+'.json?34334'}).success(function(data, status, headers, config) {
				return data;
			});
			return promise;
		}
	};

	return factory;
});
