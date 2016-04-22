myApp.controller('contactCtrl',['$scope','$http',function contactCtrl($scope,$http){
  console.log('hello');

// fonction refrech pour actualiser la page
var refresh = function(){
  $http.get('/contactlist').success(function(response){
    $scope.contactlist=response;
    console.log('i received the data i requested');
  });
};
refresh();

// fontion ajouter
  $scope.addContact = function(){
    console.log($scope.contact);
    $http.post('/contactlist',$scope.contact).success(function(response){
      console.log(response);
      refresh();
    });
  };
// fonction supprimer
  $scope.remove = function(id){
    console.log(id);
    $http.delete('/contactlist/'+id).success(function(response){
      refresh();
    })
  };
// fonction modifier contact
$scope.edit=function(id){
console.log(id);
$http.get('/contactlist/'+id).success(function(response){
  $scope.contactlist=response;
});

};


}]);
