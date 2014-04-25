app.controller('NewsController', function($scope, ngDialog, staticDataFactory, NewsFactory){

	staticDataFactory.getData('tags').then(function(data){
		$scope.categories = data.data;
		$scope.categories.unshift({ text: 'All categories', value: '' });
		$scope.categorieFilter = $scope.categories[0]['value'];
	});

	staticDataFactory.getData('users').then(function(data){
		$scope.users = data.data;
		$scope.users.unshift({ name: 'All users', value: '' });
		$scope.authorFilter = $scope.users[0]['value'];
	});

	NewsFactory.getAll().then(function(data){
		$scope.newses = data.data;
	});


	$scope.editPopup = function(id) {
		ngDialog.open({
			template: 'views/popup/edit.html',
			scope: $scope
		});
	};

});
