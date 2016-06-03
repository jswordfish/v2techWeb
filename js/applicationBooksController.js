var app = angular.module('myApp', []);


        
app.controller( 'bookController',  function($scope, $http, $window, $filter, $sce) {
	$window.localStorage.setItem("loggedIn", "yes");
	if($window.localStorage.getItem("loggedIn") != 'yes'){
		$window.location.href = 'CandidateLogin.html';
	}
	
	$window.localStorage.setItem("loggedInUser", "Arti Sawant");
	
	
	$scope.searchString = '';
	$scope.searchResponse = null;
	$scope.searchOption = '';
	$scope.review = '';
	
	var url = '../ws/rest/bookService/search/genericCriteria/Maths/startFrom/1/maxResults/10/token/test';
	$http.get(url).
	    success(function(data) {
	    	console.log('template data fetched');
	    	$scope.searchResponse = data;
		console.log(JSON.stringify($scope.searchResponse.books[0]));
		console.log('books got ');
		$scope.hideRecommLabel=false;
	    });
	    
	    
	    $scope.searchBooks = function() {
		
			if($scope.searchOption == '' || $scope.searchOption == null){
				alert("Select an Search option before searching");
				return;
			}
			
			if($scope.searchString == '' || $scope.searchString.trim().length < 3){
				alert("Enter a search string of atleast 3 characters");
				return;
			}
		var search = window.encodeURIComponent($scope.searchString);
		var url = '';
			if($scope.searchOption == 'All'){
				url = '../ws/rest/bookService/search/genericCriteria/'+search+'/startFrom/1/maxResults/10/token/test';
			}
			else if($scope.searchOption == 'Title'){
				url = '../ws/rest/bookService/search/author/'+search+'/token/test';
			}
			else if($scope.searchOption == 'Author'){
				url = '../ws/rest/bookService/search/author/'+search+'/limit/10/token/test';
			}
			else if($scope.searchOption == 'Subject'){
				url = '../ws/rest/bookService/search/subject/'+search+'/startFrom/1/maxResults/10/token/test';
			}
			else if($scope.searchOption == 'Exam'){
				url = '../ws/rest/bookService/search/exam/'+search+'/startFrom/1/maxResults/10/token/test';
			}
			else{
				alert($scope.searchOption);
				alert("Select a valid search option");
				return;
			}
		
		$http.get(url).
			success(function(data) {
			console.log('template data fetched');
			$scope.searchResponse = data;
			console.log('books got ');
			$scope.hideRecommLabel=true;
		});
		
	};
	
	$scope.reviewBook=function(bookId, imageUrl, bookIsbn, bookTitle, authors){
		//alert(bookIsbn);
		$window.localStorage.setItem("bookIdForReview", bookId);
		$window.localStorage.setItem("imageUrl", imageUrl);
		$window.localStorage.setItem("bookIsbn", bookIsbn);
		$window.localStorage.setItem("bookTitle", bookTitle);
		$window.localStorage.setItem("bookAuthors", authors);
		$window.location.href = 'write_review1.html';
	};
	
	
	
	
	
});

app.controller( 'reviewController',  function($scope, $http, $window, $filter, $sce) {
	$window.localStorage.setItem("loggedIn", "yes");
	if($window.localStorage.getItem("loggedIn") != 'yes'){
		$window.location.href = 'CandidateLogin.html';
	}
	
	$window.localStorage.setItem("loggedInUser", "Arti Sawant");
	
	$scope.bookIdForReview = $window.localStorage.getItem("bookIdForReview");
	$scope.imageUrl = $window.localStorage.getItem("imageUrl");
	$scope.bookIsbn = $window.localStorage.getItem("bookIsbn");
	
	$scope.bookTitle = $window.localStorage.getItem("bookTitle");
	$scope.bookAuthors = $window.localStorage.getItem("bookAuthors");
	
	console.log('title '+$scope.bookTitle);
	console.log('bookAuthors '+$scope.bookAuthors);
	 console.log('img '+  $scope.imageUrl);
	$scope.review ={};
	    
	$scope.submitReview = function(){
		  
		  var valuebookRelevantForTopic = $('#jqxSlider1').jqxSlider('value');
		  console.log('valuebookRelevantForTopic '+valuebookRelevantForTopic);
		  
		  var valueexplanationOfConcepts = $('#jqxSlider2').jqxSlider('value');
		  console.log('valueexplanationOfConcepts '+valueexplanationOfConcepts);
		  
		  var valuelanguageAndEaseOfUnderstanding = $('#jqxSlider3').jqxSlider('value');
		   console.log('valuelanguageAndEaseOfUnderstanding '+valuelanguageAndEaseOfUnderstanding);
		   
		  var valueeffectivenessOfPracticeProblems = $('#jqxSlider4').jqxSlider('value');
		  var valuecompletenessAndPresentation = $('#jqxSlider5').jqxSlider('value');
		  var valuecompletenessAndAccuracy = $('#jqxSlider6').jqxSlider('value');
		  var valueuseOfVisualAides = $('#jqxSlider7').jqxSlider('value');
		  var valueuseOfRealLifeExamples = $('#jqxSlider8').jqxSlider('value');
		  var valuerecommendationForJuniors = $('#jqxSlider9').jqxSlider('value');
		 
		 
		 console.log(valuebookRelevantForTopic);
		 
		  $scope.review['resourceLink'] = $scope.imageUrl;
		  $scope.review['bookRelevantForTopic'] =  valuebookRelevantForTopic;
		  $scope.review['explanationOfConcepts'] =valueexplanationOfConcepts;
		  $scope.review['languageAndEaseOfUnderstanding'] = valuelanguageAndEaseOfUnderstanding;
		   $scope.review['effectivenessOfPracticeProblems'] = valueeffectivenessOfPracticeProblems;
		  $scope.review['completenessAndPresentation'] = valuecompletenessAndPresentation;
		  $scope.review['completenessAndAccuracy'] = valuecompletenessAndAccuracy;
		   $scope.review['useOfVisualAides'] = valueuseOfVisualAides;;
		  $scope.review['useOfRealLifeExamples'] = valueuseOfRealLifeExamples
		  $scope.review['recommendationForJuniors'] = valuerecommendationForJuniors;
		   $scope.review['userName'] = 'arti.sawant@saatchi.com';
		  $scope.review['resourceName'] =  $scope.bookIsbn;
		   console.log($scope.review);
		  var url = '../ws/rest/reviewRelatedService/saveOrUpdateReview/token/test';
		  
		  $http.post(url, $scope.review).
			success(function(data) {
			console.log('review saved');
			$window.location.href = 'reviews.html';
		});
		   
		  
	};
	
	
	
});

app.controller( 'reviewsController',  function($scope, $http, $window, $filter, $sce) {
	$window.localStorage.setItem("loggedIn", "yes");
	if($window.localStorage.getItem("loggedIn") != 'yes'){
		$window.location.href = 'CandidateLogin.html';
	}
	
	$window.localStorage.setItem("loggedInUser", "Arti Sawant");
	

	$scope.resourceReviews ={};
		
	 var url = '../ws/rest/reviewRelatedService/topRatedBooks/limit/100/token/test';
	  $http.get(url).
			success(function(data) {
			console.log('reviews got');
			$scope.resourceReviews = data;
		});
		
		
	
	$scope.goback=function(){
		$window.location.href = 'write_review_1.html';
	}
	
	
});
        	
		     