(function () {


    'use strict';
    angular.module('Club')
        .controller('SocioCtrl', ['$scope', 'SocioFactory', '$location', function ($scope, SocioFactory, $location) {



            var db = openDatabase('club', '1.0', 'Club de sócios', 2 * 1024 * 1024);

            $scope.salvar = function () {

                SocioFactory.salvar(db, $scope.socio);

      }

            SocioFactory.buscarTodos(db).then(function(sociosRetornado){

                    if(sociosRetornado == ''){

                        $scope.esconder = true;
                    }else {

                        $scope.socios = sociosRetornado;



                    }

                    console.log(sociosRetornado);

            },
                function(){
                    alert('erro');
                });

             $scope.excluir = function (id, nome, sobrenome) {

                 var nomeCompleto = nome + " " + sobrenome;

                 SocioFactory.excluir(db, id, nomeCompleto);
             }
            
            $scope.editar = function (id) {

                $location.path("editar/"+id);


            }


        }]);

}());
