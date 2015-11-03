(function () {

    'use strict';

    angular.module('Club')
        .factory('SocioFactory', ['$q', '$window', function ($q, $window) {



            function salvar(db, socio) {

                db.transaction(function (tx) {

                    //criando nossa tabela se não existir com id nome e sobrenome
                    tx.executeSql('CREATE TABLE IF NOT EXISTS socio(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, sobrenome VARCHAR NOT NULL, numero_matricula VARCHAR NOT NULL)');

                    //nossa query para inserir
                    var query = "INSERT INTO socio (nome, sobrenome, numero_matricula) VALUES (?, ?, ?);";

                    //executa e se tiver sucesso tivemos um callback
                    tx.executeSql(query, [socio.nome, socio.sobreNome, socio.numeroMatricula], function (transaction, results) {

                        if (!results.rowsAffected) {
                            alert("Error");
                            //aconteceu algum error
                        } else {
                            alert('Cadastrado com sucesso!');
                            $window.location.reload();
                        }
                    });
                });
            }


           function buscarTodos (db, sociosRetornado) {


                var retorno = $q.defer();

                //iniciando nossa transação
                db.transaction(function (tx) {


                    //nossa query para exibir e se tiver sucesso teremos um call back
                    tx.executeSql('SELECT * FROM socio ', [], function (tx, results) {
                        //pegaremos o total de dados

                        var len = results.rows.length, i;


                        sociosRetornado = [];

                        for (i = 0; i < len; i++) {
                            //obtendo o item i
                          var  socios = results.rows.item(i);
                            //verifica se existe para evitar erros
                            if (socios) {

                                sociosRetornado.push(

                                        {id: socios.id, nome: socios.nome, sobrenome:socios.sobrenome, numero_matricula: socios.numero_matricula }

                                );

                            }

                        }
                        retorno.resolve(sociosRetornado);

                    });
                });

                return retorno.promise;
            }

            function excluir(db, id, nome) {

                if(window.confirm("Tem certeza que deseja excluir o sócio: " + nome)){

                db.transaction(function (tx) {

                    //criando nossa tabela se não existir com id nome e sobrenome

                    //nossa query para inserir
                    var query = "DELETE FROM socio WHERE id = ?;";

                    //executa e se tiver sucesso tivemos um callback
                    tx.executeSql(query, [id], function (transaction, results) {

                        if (!results.rowsAffected) {
                            alert("Error");
                            //aconteceu algum error
                        } else {
                            alert('Excluído com sucesso!');
                            $window.location.reload();
                        }
                    });
                });

                }else {

                }
            }

            return {

                salvar: salvar,
                buscarTodos: buscarTodos,
                excluir: excluir
            }

        }])


}());
