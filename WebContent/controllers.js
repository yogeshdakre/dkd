/* Controllers */

'use strict';




function TeamControllerA($scope,$rootScope, $resource,urldkd, GameService,$timeout) {
	console.log("In controller");
	 $scope.per={"min":0,"max":100};
	 $scope.teamA={};
	 $scope.currentQuestion={};
	 $scope.newquestion=$scope.currentQuestion;
     GameService.currentQuestionR($scope,urldkd);
     $scope.questions=[]; 
     GameService.questionair($scope,urldkd);
     GameService.teamResponsetest($scope,urldkd,'/answers/teamA','teamA');
     
     $scope.submitQuestion = function(){
    	 $scope.teamA.answers[$scope.teamA.answers.length-1].min=$scope.per.min;
    	 $scope.teamA.answers[$scope.teamA.answers.length-1].max=$scope.per.max;
    	
     };

}

function TeamControllerB($scope,$rootScope, $resource,urldkd, GameService,$timeout) {
	console.log("In controller");
	 $scope.per={"min":0,"max":100};
	 $scope.teamA={};
	 $scope.currentQuestion={};
    GameService.currentQuestionR($scope,urldkd);
    $scope.questions=[]; 
    GameService.questionair($scope,urldkd);
    GameService.teamResponsetest($scope,urldkd,'/answers/teamB','teamB');
    
    $scope.submitQuestion = function(){
   	 $scope.teamB.answers[$scope.teamB.answers.length-1].min=$scope.per.min;
   	 $scope.teamB.answers[$scope.teamB.answers.length-1].max=$scope.per.max;
   	 
    };

	
}

function QuestionController($scope, $resource, GameService) {
	
}

function AdminController($scope, $resource,urldkd, GameService) {

    // Common
    $scope.httpStatus = '';
    $scope.errors = [];

    $scope.processErrors = function(response) {
        $scope.clearErrors();

        $scope.httpStatus = response.status;
        response.data.forEach(function(error) {
            $scope.errors.push({path:error.path, message:error.message});
        });
    };

    $scope.clearErrors = function() {
        $scope.httpStatus = '';
        $scope.errors = [];
    };

    $scope.reset = function() {
        $scope.contact = {};
        $scope.winningTeam ={};
        $scope.searchValue = '';
        $scope.teamA ={};
        $scope.teamB ={};
        
        $scope.clearErrors();
    };

    $scope.refresh = function() {
        $scope.reset();
        GameService.questionair($scope,urldkd);
        console.log($scope.questions);
        GameService.currentQuestionR($scope,urldkd);
        var randomQuestion = Math.floor(Math.random()*$scope.questions.length);
    	$scope.currentQuestion={"question":randomQuestion, "counter" : 1,"doneQuestions":[randomQuestion]};
    	//reset for teamA
    	GameService.teamResponsetest($scope,urldkd,'/answers/teamA','teamA');
    	//reset for teamB    	
    	GameService.teamResponsetest($scope,urldkd,'/answers/teamB','teamB');
    	
    	var winningArray=[0];
    	$scope.teamA={ "answers":[{ "max" : 100, "min" : 0, "questionID" : randomQuestion }], "winningQuestion" :winningArray};
    	
    	$scope.teamB={ "answers":[{ "max" : 100, "min" : 0, "questionID" : randomQuestion }], "winningQuestion" :winningArray};
    	
    };

  
    $scope.save = function(array, question) {
    	console.log(array[array.length-1].$id+100);
    	array.add({id:array[array.length-1].$id+100,question:question,agree:0,disagree:0, percent:0});
        console.log(array);
    };
    
    $scope.teamA ={};
    $scope.teamB ={};
    $scope.winningTeam ={};
    
    // Questions
    $scope.questions = [];
    $scope.question = {};
	$scope.currentQuestion={};
	$scope.answersteamA={};
	$scope.answersteamA.answers=[];
	$scope.answersteamB={};
	$scope.answersteamB.answers=[];
	
	$scope.answersteamA.winningQuestion=[];
	$scope.answersteamB.winningQuestion=[];

    $scope.addQuestion = function() {
        console.log($scope.questiontxt);
        $scope.save($scope.questions, $scope.questiontxt);

    };
    
    $scope.brodCastQuestion = function() {
        var counterOfQuestion=eval($scope.currentQuestion.counter+1);
        var randomQuestion = Math.floor(Math.random()*$scope.questions.length);
        while($scope.currentQuestion.doneQuestions.indexOf(randomQuestion)!=-1)
        	{
        		randomQuestion = Math.floor(Math.random()*$scope.questions.length);
   
        	}
        $scope.winningTeam={};
        var key=$scope.currentQuestion.doneQuestions.length+1;
        $scope.currentQuestion.doneQuestions.push(randomQuestion);
       	$scope.currentQuestion={"question":randomQuestion, "counter" : counterOfQuestion ,"doneQuestions":$scope.currentQuestion.doneQuestions};
       	
       	$scope.teamA.winningQuestion.push(0);
       	$scope.teamA.answers.push({ "max" : 100, "min" : 0, "questionID" : randomQuestion });
       	
       	$scope.teamB.winningQuestion.push(0);
       	$scope.teamB.answers.push({ "max" : 100, "min" : 0, "questionID" : randomQuestion });

    };
    
    $scope.winner = function(){
    	var Acounter=0;
    	var Bcounter=0;
    	  for(var i=0;i<$scope.teamA.answers.length;i++)
    		  {
    		  		var correctPersent=$scope.questions[$scope.teamA.answers[i].questionID].percent;
    		  		var a_min=$scope.teamA.answers[i].min;
    		  		var a_max=$scope.teamA.answers[i].max;
    		  		var numA=(a_min+a_max)/2;
    		  		var numABetween= correctPersent>=a_min==correctPersent<=a_max;
    		  		
    		  		var b_min=$scope.teamB.answers[i].min;
    		  		var b_max=$scope.teamB.answers[i].max;
    		  		var numB=(b_min+b_max)/2;
    		  		var numBBetween= correctPersent>=b_min==correctPersent<=b_max;
    		  		
    		  		if(numABetween && numBBetween==false)
    		  			{
    		  			  //teamA winner
    		  			Acounter++;
    		  			}
    		  		else if(numBBetween && numABetween==false)
		  				{
    		  			//teamB winner
    		  			Bcounter++;
		  				}else {
		  					if(numA < numB)
		  						Acounter++;
		  						
		  					else if(numA == numB){
		  						Acounter++; Bcounter++;
		  					}else{	
		  						Bcounter++;
		  					}
		  				}        		  			
    		  			

    		  }
    	  
    	  if(Acounter==Bcounter)
    		  {
    		  $scope.winningTeam ="It's a TIE";
    		  }else if(Acounter>Bcounter){
    			  //team A wins
    			  $scope.winningTeam ="TEAM A - vow";
    		  }else{
    			//team B wins
    			  $scope.winningTeam ="TEAM B - vow";
    		  }
    	   
    	    	
    }
    
    $scope.questionsFinished = function() {
       
        var counterOfQuestion=$scope.currentQuestion.counter;
        var numberOfQuestion= $scope.questions.length;
        var flag=counterOfQuestion==numberOfQuestion
        if(flag)
        	{
        	var Acounter=0;
        	var Bcounter=0;
        	  for(var i=0;i<$scope.questions.length;i++)
        		  {
        		  		var correctPersent=$scope.questions[$scope.teamA.answers[i].questionID].percent;
        		  		var a_min=$scope.teamA.answers[i].min;
        		  		var a_max=$scope.teamA.answers[i].max;
        		  		var numA=(a_min+a_max)/2;
        		  		var numABetween= correctPersent>=a_min==correctPersent<=a_max;
        		  		
        		  		var b_min=$scope.teamB.answers[i].min;
        		  		var b_max=$scope.teamB.answers[i].max;
        		  		var numB=(b_min+b_max)/2;
        		  		var numBBetween= correctPersent>=b_min==correctPersent<=b_max;
        		  		
        		  		if(numABetween && numBBetween==false)
        		  			{
        		  			  //teamA winner
        		  			Acounter++;
        		  			}
        		  		else if(numBBetween && numABetween==false)
    		  				{
        		  			//teamB winner
        		  			Bcounter++;
    		  				}else {
    		  					if(numA < numB)
    		  						Acounter++;
    		  						
    		  					else if(numA == numB){
    		  						Acounter++; Bcounter++;
    		  					}else{	
    		  						Bcounter++;
    		  					}
    		  				}        		  			
        		  			

        		  }
        	  
        	  if(Acounter==Bcounter)
        		  {
        		  $scope.winningTeam ="It's a TIE";
        		  }else if(Acounter>Bcounter){
        			  $scope.winningTeam ="TEAM A - vow";
        		  }else{
        			  $scope.winningTeam ="TEAM B - vow";
        		  }
        	   
        	}
        return flag;

    };
    // Search

    $scope.searchType = 'Question';
    $scope.searchValue = '';

    $scope.searchIcon = 'user';
    $scope.searchCollapse = true;

    $scope.changeSearchType = function(type) {
        $scope.searchType = type;
        $scope.searchCollapse = true;
    };

  

    // Refresh
    $scope.refresh();
}


function SurveyController($scope, $resource,urldkd, GameService) {


    // Common
    $scope.httpStatus = '';
    $scope.errors = [];

    $scope.processErrors = function(response) {
        $scope.clearErrors();

        $scope.httpStatus = response.status;
        response.data.forEach(function(error) {
            $scope.errors.push({path:error.path, message:error.message});
        });
    };

    $scope.clearErrors = function() {
        $scope.httpStatus = '';
        $scope.errors = [];
    };

    $scope.reset = function() {
        $scope.contact = {};
        $scope.searchValue = '';

        $scope.clearErrors();
    };

    $scope.refresh = function() {
        $scope.reset();
        GameService.questionair($scope,urldkd);
        console.log($scope.questions);
    };

    $scope.update=function(){
    	   console.log($scope.questions);
    };
    
    $scope.recordAnswer = function(	question,consent) {
    	
    	 var pagree=0;
    	 var pdisagree=0;
    	 var donotchange=false;
    	 if(consent=='agree')
    		 {
    		  
    		 	question.agree=eval(question.agree+1);
    		 	
    		 }
    	 else if(consent=='disagree')
    		 {
    		 	question.disagree=eval(question.disagree+1);
    		 	
    		 }
    	 else{
    		   donotchange=true;
    		    $scope.processErrors({status:400,data:[{message:"Please select the inline Agree or Disagree radio button"},{message:question.question}]});
    	     }
    	 
    	 if(!donotchange)
    		 {
		    	 pagree=eval(question.agree);
		    	 pdisagree=eval(question.disagree);
		    	  /*
		    	   * 10 agree 1 disagree = 11 - 10
		    	   *    100 X
		    	   *    100 x 10 / 11 = round
		    	   */    
		    	 
		    	 var totalpercent=eval(100*pagree/(pagree+pdisagree));
		    	 console.log(pagree+pdisagree);
		    	 console.log(totalpercent);
		    	 
		    	 question.percent=totalpercent.toFixed(0);
		    	 
		    	 $scope.questions.update(question);
		        console.log(question);
		       // $scope.update();
    	}
    };
    
    
    $scope.save = function(array, question) {
    	console.log(array[array.length-1].$id+100);
    	array.add({id:array[array.length-1].$id+100,question:question});
        console.log(array);
    };
    
 // Questions
    $scope.questions = [];
    $scope.question = {};

   

    // Refresh
    $scope.refresh();
}


