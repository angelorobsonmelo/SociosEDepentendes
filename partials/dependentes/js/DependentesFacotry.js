/**
 * Created by AngeloRobson on 11/01/2015.
 */
(function () {

    'use strict';

    angular.module('Club')
        .factory('DependenteFactory', ['$q', '$window', function ($q, $window) {

          function salvar(db, dependente){



              var dataFormadatada = moment(dependente.dataNascimento).format('L');

              db.transaction(function (tx) {

                  //criando nossa tabela se não existir com id nome e sobrenome
                  tx.executeSql('CREATE TABLE IF NOT EXISTS dependente(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, data_nascimento DATE NOT NULL, data_obj DATE NOT NULL, parentesco VARCHAR NOT NULL, cod_socio INTEGER)');

                  //nossa query para inserir
                  var query = "INSERT INTO dependente (nome, data_nascimento, data_obj, parentesco, cod_socio) VALUES (?, ?, ?, ?, ?);";

                  //executa e se tiver sucesso tivemos um callback
                  tx.executeSql(query, [dependente.nome, dataFormadatada, dependente.dataNascimento, dependente.parentesco, dependente.codSocio], function (transaction, results) {

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

            function buscarTodosSocios (db, sociosRetornado) {


                var retorno = $q.defer();

                //iniciando nossa transação
                db.transaction(function (tx) {


                    //nossa query para exibir e se tiver sucesso teremos um call back
                    tx.executeSql('SELECT * FROM socio  ', [], function (tx, results) {
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

            function buscarTodosDependentes (db, dependentesRetornado) {


                var retorno = $q.defer();

                //iniciando nossa transação
                db.transaction(function (tx) {


                    //nossa query para exibir e se tiver sucesso teremos um call back
                    tx.executeSql('SELECT SOCIO.id as id_socio, SOCIO.nome as nome_socio, SOCIO.sobrenome, SOCIO.numero_matricula, DEPENDENTE.id as id_dependente, DEPENDENTE.nome, DEPENDENTE.data_nascimento, DEPENDENTE.data_obj, DEPENDENTE.parentesco FROM socio, dependente WHERE SOCIO.id = DEPENDENTE.cod_socio;', [], function (tx, results) {
                        //pegaremos o total de dados

                        var len = results.rows.length, i;


                        dependentesRetornado = [];


                        function idadeAtual(nascimento, hoje) {
                            var diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
                            if ( new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) <
                                new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()) )
                                diferencaAnos--;
                            return diferencaAnos;
                        }



                        for (i = 0; i < len; i++) {
                            //obtendo o item i
                            var  dependentes = results.rows.item(i);

                           var dataConvertida  = new Date(dependentes.data_obj);

                         var idade =  idadeAtual(dataConvertida, new Date());

                            //verifica se existe para evitar erros
                            if (dependentes) {

                                dependentesRetornado.push(

                                    {id: dependentes.id_dependente, nome: dependentes.nome, dataNascimento:dependentes.data_nascimento, parentesco: dependentes.parentesco, nomeSocio: dependentes.nome_socio, sobrenome: dependentes.sobrenome, numeroMatricula: dependentes.numero_matricula, idade: idade }

                                );

                            }

                        }
                        retorno.resolve(dependentesRetornado);

                    });
                });

                return retorno.promise;
            }

            return {

                salvar: salvar,
                buscarTodosSocios: buscarTodosSocios,
                buscarTodosDependentes: buscarTodosDependentes
            }

        }]);

}());