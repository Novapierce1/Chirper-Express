var app = angular.module('myApp', ['ngRoute', ])

app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "../views/home.html",
    })
    .when("/add", {
        templateUrl: "../views/add.html",
    })
    .when("/list", {
        templateUrl: "../views/list.html"
    })
    .when("/single/:id", {
        templateUrl: "../views/single.html",
    })
    .when("/users/", {
        templateUrl: "../views/users.html"
    })
    .when("/user/:user", {
        templateUrl: "../views/userposts.html"
    })
});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
      }

function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }

app.controller('addController', function($scope, $http,$location ) {
    $scope.posts = function(){
        var info = ({
            user : $scope.user,
            alias : $scope.alias,
            message : $scope.message
        });
    $http.post('http://localhost:3000/api/chirps/', info)
        .then(function(response){
            alert('Hello Tenno')
            $location.path('/')
        }, function myError(response){
            alert('Something went wrong')
        });
        
   }
});

app.controller('listController',  function($http, $scope, $location){
    $http.get('http://localhost:3000/api/chirps/')
       .then(function(success){
        $scope.data=success.data
    },  function(err){
        alert('something went wrong')
    })
    $scope.getId=function(id){
        $location.path('/single/' + id)
    }

   $scope.getUserPosts=function(user){
        $location.path('/user/' + user)
    }

   $scope.remove=function(id){
        $http.delete('http://localhost:3000/api/chirps/one/' + id)
        .then(function(success){
         $location.path('/list/');
        })
    }
    
});

app.controller('singleController',  function($http, $scope, $routeParams, $location){
    var id = $routeParams.id
    $http.get('http://localhost:3000/api/chirps/one/' + id)
    .then(function(success){
        $scope.data=success.data
    })
    $scope.remove=function(id){
    $http.delete('http://localhost:3000/api/chirps/one/' + id)
        .then(function(success){
            $location.path('/list/')
        }, function(err){
            alert('something went wrong')

       }
    )}
    $scope.getUserPosts=function(user){
        $location.path('/user/' + user)
    }
});

app.controller('userController',  function($http, $scope, $location){
    $http.get('http://localhost:3000/api/users/')
       .then(function(response){
        $scope.data=response.data
    },  function(err){
        alert('something went wrong')
        
   })
    $scope.getUserPosts=function(user) {
        $location.path('/user/' + user)
    }
}); 

app.controller('userListController',  function($routeParams, $http, $scope, $location){
    var user = $routeParams.user;
    $http.get('http://localhost:3000/api/chirps/user/' + user)
       .then(function(response){
        $scope.data=response.data
    },  function(err){
        alert('something went wrong')
    })
    $scope.getId=function(id){
        $location.path('/single/' + id)
    }

    $scope.getUserPosts=function(user){
        $location.path('/user/' + user)
    }
   $scope.removeUser=function(data){
    $http.delete('http://localhost:3000/api/chirps/user/' + user)
        .then(function(success){
            alert('Good bye Tenno...(user deleted)')
            $location.path('/');
        }, function(err){
            alert('The Stalker stopped your escape! (ERROR)')
        }
        )}
    
});