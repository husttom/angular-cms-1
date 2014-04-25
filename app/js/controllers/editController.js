app.controller('EditController', function($scope, staticDataFactory){

	staticDataFactory.getData('users').then(function(data){
		$scope.usersEdit = data.data;
		$scope.userEdit = $scope.usersEdit[0]['value'];
	});

	$scope.loadCategories = function() {
		return staticDataFactory.getData('tags');
	};

});
