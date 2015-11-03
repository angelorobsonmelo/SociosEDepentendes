/**
 * Created by AngeloRobson on 11/01/2015.
 */
(function () {

    'use strict';

    angular.module('Club')
        .factory('EditarFabrica', ['$q', '$window', function ($q, $window) {


            function listarSocio(db, id, socios){

                var retorno = $q.defer();

                //iniciando nossa transação
                db.transaction(function (tx) {


                    //nossa query para exibir e se tiver sucesso teremos um call back
                    tx.executeSql('SELECT * FROM socio WHERE id=?', [id], function (tx, results) {
                        //pegaremos o total de dados

                        var len = results.rows.length, i;

                        for (i = 0; i < len; i++) {
                            //obtendo o item i
                              socios = results.rows.item(i);
                            //verifica se existe para evitar erros


                        }
                        retorno.resolve(socios);

                    });
                });

                return retorno.promise;


            }

            function atualizar(db, id, socio) {

                db.transaction(function (tx) {

                    //criando nossa tabela se não existir com id nome e sobrenome

                    //nossa query para inserir
                    var query = "UPDATE socio set nome=?, sobrenome=?, numero_matricula=?  WHERE id=?;";

                    //executa e se tiver sucesso tivemos um callback
                    tx.executeSql(query, [socio.nome, socio.sobrenome, socio.numero_matricula, id], function (transaction, results) {

                        if (!results.rowsAffected) {
                            alert("Error");
                            //aconteceu algum error
                        } else {
                            alert('Atualizado com sucesso!');
                            $window.location = "/club/index.html#/socios";
                        }
                    });
                });
            }

            return {

                listarSocio: listarSocio,
                atualizar: atualizar
            }

        }]);


}());
