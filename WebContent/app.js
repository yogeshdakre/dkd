'use strict';

/* App Module */

var questionGame = angular.module('questionGame', ['gameServices', 'ngResource','firebase']).
value('urldkd', 'https://yogi-firebase.firebaseio.com/DuskaDum').
value('runningA',1).
    config(
        ['$routeProvider', function($routeProvider) {
            $routeProvider.
                   when('/admin',{templateUrl:'admin.html',controller:AdminController}).
                   when('/teamA',{templateUrl:'teamA.html',controller:TeamControllerA}).
                   when('/teamB',{templateUrl:'teamB.html',controller:TeamControllerB}).
                   when('/answerQuestion',{templateUrl:'questions.html',controller:SurveyController}).
                   otherwise({redirectTo: '/admin'});
        }]
    );
