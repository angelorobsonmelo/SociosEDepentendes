(function () {

    'user strict';

    angular.module('Club')
        .controller('DepentesCtrl', ['$scope', 'DependenteFactory',  function ($scope, DependenteFactory) {

            var db = openDatabase('club', '1.0', 'Club de sócios', 2 * 1024 * 1024);



            DependenteFactory.buscarTodosSocios(db).then(function(sociosRetornado){



                    var matriculaENomeCopy = angular.copy(sociosRetornado);

                    $scope.matriculaENome = matriculaENomeCopy;

                },
                function(){
                    alert('erro');
                });

            DependenteFactory.buscarTodosDependentes(db).then(function(dependentesRetornado){



                    var dependentesRetornadoCopy  = angular.copy(dependentesRetornado);



                    $scope.dependentes = dependentesRetornadoCopy;




                },
                function(){
                    alert('erro');
                });


            $scope.salvar = function () {


                DependenteFactory.salvar(db, $scope.dependente);
            }

        }]);

}());
