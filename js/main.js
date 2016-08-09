invApp = angular.module( 'invApp', ['ngRoute','ngCookies'] );

// configure our routes
invApp.config(function($routeProvider) {
    $routeProvider
        // route for the login page
        .when('/', {
            templateUrl : 'pages/login.html',
            controller  : 'loginCtrl'
        })
    
        // route for the stock page
        .when('/stock', {
            templateUrl : 'pages/Stock-Records.html',
            controller  : 'mainCtrl'
        })

        // route for the about page
        .when('/ledger', {
            templateUrl : 'pages/Ledger-Records.html',
            controller  : 'ledgerCtrl'
        })
        
        // route for the about page
        .when('/ledger/:param', {
            templateUrl : 'pages/Ledger-Records.html',
            controller  : 'ledgerCtrl'
        });
});