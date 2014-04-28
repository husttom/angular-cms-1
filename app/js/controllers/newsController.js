app.controller('NewsController', function($scope, ngDialog, staticDataFactory, NewsFactory){

	staticDataFactory.getData('tags').then(function(data){
		$scope.categories = data.data;
	});

	staticDataFactory.getData('users').then(function(data){
		$scope.users = data.data;
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
