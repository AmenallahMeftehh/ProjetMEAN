app.controller('contactCtrl',['$scope','$http',function contactCtrl($scope,$http){
  console.log('hello');

  $http.get('/contactlist').success(function(response){

    $scope.contactlist=response;
    console.log('i received the data i requested');
  });
}]);
