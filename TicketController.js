var app = angular.module('MainApp', ['ngRoute', 'ui.bootstrap']);

app.controller('TicketController', [ '$http', '$scope', function($http, $scope) {
     
	    
	        $scope.Lista = [];
		$scope.GetQueue = [];
		$scope.GetQueueTicket = [];
		$scope.GetTicket = [];
		$scope.GetArticle = [];
		$scope.isCollapsed = false;
		$scope.IdSelected = null;  
		$scope.IdSelected2 = null;  
	
		
		 $http.get('http://127.0.0.1:8080/api/queue/').success(function(data) {
		   $scope.GetQueue= data; 
			}); 
 
 $scope.TicketCall = function (IdSelected, data) {
   
    var data = data;
    $scope.IdSelected = IdSelected;
 
	$http.get('http://127.0.0.1:8080/api/queue/').success(function(data) {
		$scope.GetQueue = data;  
	   console.log(IdSelected);
		var url = data[IdSelected].tickets;		
		
		angular.forEach(url, function TicketCall(IdSelected) { 
		$http.get('http://127.0.0.1:8080'+ IdSelected).success(function (data) {
		  $scope.GetQueueTicket.push(data);	
		})
		$scope.GetQueueTicket.length = 0;
		 });   
		 });	 
	};
	
	$scope.ArticleCall = function (IdSelected2, RowClick) {
	     
		$http.get('http://127.0.0.1:8080/api/ticket/').success(function(data) {
		$scope.GetTicket = data;  
	    $scope.IdSelected2 = IdSelected2;
		var url2 = data[IdSelected2].articles;
		
		angular.forEach(url2, function ArticleCall(IdSelected2) {  
		$http.get('http://127.0.0.1:8080'+ IdSelected2).success(function (data) {
         $scope.GetArticle = data;	
		  $scope.Lista.push(data);
		})
		$scope.Lista.length = 0;
		 });
		 });
	 	};
	
	$scope.QueueCall = function() { 
   
           $http.get('http://127.0.0.1:8080/api/queue/').success(function(data) {
		   $scope.GetQueue= data;	 
			}); 
			}			
    }]);
	
	
	
