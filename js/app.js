(function() {

    'use strict';

    angular.module('Club', ['ngRoute'])
        .config(['$routeProvider', function($routeProvider) {


            $routeProvider
                .when('/socios', {
                    controller: 'SocioCtrl',
                    templateUrl: 'partials/socios/cad-socio.html'

                })
                .when('/editar/:id', {

                    controller: 'EditarCtrl',
                    templateUrl: 'partials/socios/edit.html'

                })
                .when('/dependentes', {

                    controller: 'DepentesCtrl',
                    templateUrl: 'partials/dependentes/dependentes.html'

                })
                .otherwise('/socios');

        }]);

    var db = openDatabase('club', '1.0', 'Club de sócios', 2 * 1024 * 1024);


}());
