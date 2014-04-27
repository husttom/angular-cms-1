var app = angular.module('app', ['ui.router', 'ngAnimate', 'ngDialog', 'angular-redactor', 'ui.select2']);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "views/home.html",
			controller: 'HomeController'
		})
		.state('news', {
			url: "/news",
			templateUrl: "views/news.html",
			controller: 'NewsController'
		})
		.state('pages', {
			url: "/pages",
			templateUrl: "views/pages.html"
		})
		.state('gallery', {
			url: "/gallery",
			templateUrl: "views/gallery.html"
		})
		.state('users', {
			url: "/users",
			templateUrl: "views/users.html"
		})
		.state('profile', {
			url: "/users/:id/show",
			templateUrl: "views/profile.html"
		});
});
