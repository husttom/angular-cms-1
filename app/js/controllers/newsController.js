app.controller('NewsController', function($scope, ngDialog, TagsFactory){

	TagsFactory.getCategories('tags').then(function(data){
		$scope.categories = data.data;
		$scope.categories.unshift({ text: 'All categories' });
		$scope.categorieFilter = $scope.categories[0];
	});

	TagsFactory.getCategories('users').then(function(data){
		$scope.users = data.data;
		$scope.users.unshift({ name: 'All users' });
		$scope.usersFilter = $scope.users[0];
	});

	$scope.editPopup = function(id) {
		ngDialog.open({
			template: 'views/popup/edit.html',
			scope: $scope
		});
	};

});
