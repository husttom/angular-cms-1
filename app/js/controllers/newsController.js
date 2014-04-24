app.controller('NewsController', function($scope, ngDialog){

	$scope.editPopup = function (id) {
		ngDialog.open({
			template: 'views/popup/edit.html',
			scope: $scope
		});
	};

});
