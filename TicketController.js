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
	    $scope.RowClick = null;
		
		 $http.get('http://127.0.0.1:8080/api/queue/').success(function(data) {
		   $scope.GetQueue= data; 
			}); 
 
 $scope.TicketCall = function (index, IdSelected, data, RowClick) {
   
    var data = data;
    $scope.IdSelected = IdSelected;
	$scope.RowClick = RowClick;
	
	$http.get('http://127.0.0.1:8080/api/queue/').success(function(data2) {
		$scope.GetQueue = data2;  
	   console.log(IdSelected);
		var url = data2[IdSelected].tickets;		
		
		angular.forEach(url, function TicketCall(IdSelected) { //(var i = 0; i < arrayLength; ++i) //  for (i in url) {
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
		$http.get('http://127.0.0.1:8080'+ IdSelected2).success(function (data3) {
         $scope.GetArticle = data3;	
		  $scope.Lista.push(data3);
		})
		$scope.Lista.length = 0;
		 });
		 });
	 	};
	
	$scope.QueueCall = function() { 
   
           $http.get('http://127.0.0.1:8080/api/queue/').success(function(data2) {
		   $scope.GetQueue= data2;	 
			}); 
			}			
	  		
    }]);
	
	
	