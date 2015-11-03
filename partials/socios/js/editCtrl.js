
(function () {

  'use strict';

   angular.module('Club')
       .controller('EditarCtrl', ['$scope', '$routeParams', 'EditarFabrica', function ($scope, $routeParams, EditarFabrica) {

          var db = openDatabase('club', '1.0', 'Club de sócios', 2 * 1024 * 1024);

          EditarFabrica.listarSocio(db, $routeParams.id).then(function(socioRetornado){



                var socioCopia =   angular.copy(socioRetornado);


                 $scope.socio = socioCopia;
                  
                  $scope.atualizar = function () {



                      EditarFabrica.atualizar(db, $routeParams.id, $scope.socio);
                  }



              },

              function(){
                 alert('erro');
              });

       }]);

}());
