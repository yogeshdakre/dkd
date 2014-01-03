'use strict';

/* Services */

angular.module('gameServices', ['ngResource','firebase']).
    factory('GameService',function (angularFireCollection,angularFire,$timeout,$rootScope) {
    		var runningQ ={};
    	    
    		$rootScope.questionInProgress={"runningQuestion":Math.floor(Math.random()*11)};
    	       	   
    	
    	 
        return {  
        	
            	 questionair : function($scope,urldkd){
            		 									var questionsmodel = new Firebase(urldkd+'/Questions');
            		 									$scope.questions=angularFireCollection(questionsmodel);
            							   },
            	currentQuestionR : function($scope,urldkd){
     		 									var questionsmodel = new Firebase(urldkd+'/currentQuestion');
     		 									//var currentQuestion={};
     		 									angularFire(questionsmodel,$scope,'currentQuestion',{});
     		 									
     							   },
			  teamResponse : function($scope,urldkd,path,modelname,isArray){
	 									var questionsmodel = new Firebase(urldkd+path);
	 									if(isArray)
	 										angularFire(questionsmodel,$scope,modelname,[]);
	 									else	
	 										angularFire(questionsmodel,$scope,modelname,{});
						   },     							   
            							   
     		teamResponse1 : function($scope,urldkd,path,modelname,model){
     			                       console.log(urldkd+path);
	 									var questionsmodel = new Firebase(urldkd+path);
 										angularFire(questionsmodel,$scope,modelname,model);
						   }   ,  							   
        
							teamResponsetest : function($scope,urldkd,path,modelname){
			                       console.log(urldkd+'/answers/teamA');
									var questionsmodel = new Firebase(urldkd+path);
									angularFire(questionsmodel,$scope,modelname,{});
					   }   
        	};
    	});



