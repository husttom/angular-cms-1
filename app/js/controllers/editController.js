app.controller('EditController', function($scope, TagsFactory){

	$scope.loadCategories = function() {
		return TagsFactory.getCategories('tags');
	};

});
