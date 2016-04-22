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
// fonction recuperer l'identifiant d'un  contact
$scope.edit = function(id){
    console.log(id);
    $http.get('/contactlist/'+id).success(function(response)
    {
      $scope.contact=response;
    });

};
// fonction pour mettre a jour un contact
$scope.update = function(){
  console.log($scope.contact._id);
  $http.put('/contactlist/'+$scope.contact._id,$scope.contact).success(function(response) {
    refresh();
  });
};
$scope.deselect = function(){
  $scope.contact="";
}


}]);
