app.controller('EditController', function($scope, staticDataFactory){

	staticDataFactory.getData('users').then(function(data){
		$scope.usersEdit = data.data;
		$scope.userEdit = $scope.usersEdit[0].value;
	});

	$scope.loadCategories = function() {
		return staticDataFactory.getData('tags');
	};

	$scope.list_of_string = ['tag1', 'tag2'];
	$scope.select2Options = {
		'multiple': true,
		'simple_tags': true,
		'tags': ['tag1', 'tag2', 'tag3', 'tag4']  // Can be empty list.
	};
});
