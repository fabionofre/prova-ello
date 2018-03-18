<template>
    <div>
        <div class="container">
            <div :class="{'fade': !msgSucesso, 'show': msgSucesso}" class="alert alert-success alert-dismissible" id="msgSucesso" role="alert">
                <strong>Alteração salva!</strong> Dados do parlamentar salvos com sucesso!
                <button type="button" class="close" @click="msgSucesso = false">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="row">
                <div class="col-md-11 offset-md-1">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Partido</th>
                                <th scope="col">UF</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(p, index) in parlamentares" :key="p.IdentificacaoParlamentar.CodigoParlamentar">
                                <th @click="infoSenador(index)" scope="row" data-toggle="modal" data-target="#infoSenador"><img class="align-self-end mr-3 image" v-bind:src="p.IdentificacaoParlamentar.UrlFotoParlamentar" alt="Generic placeholder image"></th>
                                <td>{{p.IdentificacaoParlamentar.NomeParlamentar}}</td>
                                <td>{{p.IdentificacaoParlamentar.SiglaPartidoParlamentar}}</td>
                                <td>{{p.IdentificacaoParlamentar.UfParlamentar}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="infoSenador" role="dialog">    
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content" v-if="parlamentar">
                    <div class="modal-header">
                        <h3 class="modal-title">{{parlamentar.IdentificacaoParlamentar.NomeParlamentar}}</h3>
                        <button type="button" @click="fecharModal" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="media">
                            <img class="align-self-start mr-3 image-modal" :src="parlamentar.IdentificacaoParlamentar.UrlFotoParlamentar" alt="Generic placeholder image">
                            <div class="media-body">
                                <div id="accordion">
                                    <div class="card">
                                        <div class="card-header" id="headingDp">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link" data-toggle="collapse" data-target="#dadosPessoais" aria-expanded="true" aria-controls="collapseOne">
                                                    Dados Pessoais
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="dadosPessoais" class="collapse" aria-labelledby="headingDp" data-parent="#accordion">
                                            <div class="card-body">
                                                <form>
                                                    <div class="form-group">
                                                        <label for="nome_completo">Nome Completo</label>
                                                        <input type="text" v-model="parlamentar.IdentificacaoParlamentar.NomeParlamentar" :disabled="!edit" class="form-control form-control-sm" id="nome_completo">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="email">E-mail Parlamentar</label>
                                                        <input type="email" v-model="parlamentar.IdentificacaoParlamentar.EmailParlamentar" :disabled="!edit" class="form-control form-control-sm" id="email">
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="partido">Partido</label>
                                                        <select class="form-control form-control-sm" v-model="parlamentar.IdentificacaoParlamentar.SiglaPartidoParlamentar" :disabled="!edit">
                                                            <option v-for="p in partidosOptions" :value="p.value" :key="p.sigla">{{p.sigla}}</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="partido">UF</label>
                                                        <select class="form-control form-control-sm" :disabled="!edit" v-model="parlamentar.IdentificacaoParlamentar.UfParlamentar">
                                                            <option v-for="uf in ufsOptions" :value="uf.value" :key="uf.value">{{uf.value}}</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card">
                                        <div class="card-header" id="headingMandato">
                                            <h5 class="mb-0">
                                                <button class="btn btn-link" data-toggle="collapse" data-target="#mandato" aria-expanded="true" aria-controls="mandato">
                                                    Suplentes
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="mandato" class="collapse" aria-labelledby="headingMandato" data-parent="#accordion">
                                            <div class="card-body">
                                                <div v-if="parlamentar.Mandato.Suplentes.Suplente.length > 0">
                                                    <div v-for="sup in parlamentar.Mandato.Suplentes.Suplente" :key="sup.NomeParlamentar">
                                                        <form>
                                                            <h5>{{sup.NomeParlamentar}}</h5>
                                                            <div class="form-group">
                                                                <label>Código</label>
                                                                <input type="text" v-model="sup.CodigoParlamentar" class="form-control form-control-sm" :disabled="!edit">
                                                            </div>
                                                            <div class="form-group">
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" :disabled="!edit" type="radio" v-model="sup.DescricaoParticipacao" name="participacaoOptions" id="suplente1" value="1º Suplente">
                                                                    <label class="form-check-label" for="suplente1">1º Suplente</label>
                                                                </div>
                                                                <div class="form-check form-check-inline">
                                                                    <input class="form-check-input" :disabled="!edit" type="radio" v-model="sup.DescricaoParticipacao" name="participacaoOptions" id="suplente2" value="2º Suplente">
                                                                    <label class="form-check-label" for="suplente2">2º Suplente</label>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                                <div v-else>
                                                    <form>
                                                        <h5>{{parlamentar.Mandato.Suplentes.Suplente.NomeParlamentar}}</h5>
                                                        <div class="form-group">
                                                            <label>Código</label>
                                                            <input type="text" v-model="parlamentar.Mandato.Suplentes.Suplente.CodigoParlamentar" class="form-control form-control-sm" :disabled="!edit">
                                                        </div>
                                                        <div class="form-group">
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" :disabled="!edit" type="radio" v-model="parlamentar.Mandato.Suplentes.Suplente.DescricaoParticipacao" name="participacaoOptions" id="suplente1" value="1º Suplente">
                                                                <label class="form-check-label" for="suplente1">1º Suplente</label>
                                                            </div>
                                                            <div class="form-check form-check-inline">
                                                                <input class="form-check-input" :disabled="!edit" type="radio" v-model="parlamentar.Mandato.Suplentes.Suplente.DescricaoParticipacao" name="participacaoOptions" id="suplente2" value="2º Suplente">
                                                                <label class="form-check-label" for="suplente2">2º Suplente</label>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="edit = true" v-if="!edit">Editar</button>
                        <button type="button" class="btn btn-secondary" @click="fecharModal" v-if="!edit" data-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-success" @click="fecharModal();msgSucesso = true" v-if="edit" data-dismiss="modal">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import * as Dados from '../dados.js'
export default {
  mounted(){
      axios.get('http://legis.senado.gov.br/dadosabertos/senador/lista/atual.json')
        .then(response => {
            console.log(response)
            this.parlamentares = response.data.ListaParlamentarEmExercicio.Parlamentares.Parlamentar
        })
        console.log(Dados)
        this.partidosOptions = Dados.partidos
        this.ufsOptions = Dados.ufs
  },
  name: 'senadores',
  data(){
    return {
        edit: false,
        msgSucesso: false,
        parlamentares: [],
        parlamentar: null,
        partidosOptions: [],
        ufsOptions: []
    }
  },
  methods: {
      infoSenador(index){
          this.msgSucesso = false
          this.parlamentar = this.parlamentares[index]
      },
      fecharModal(){
        this.edit = false
      }
  }
}
</script>
<style>
.image {
    max-width:200px;
    max-height:150px;
    width: auto;
    height: auto;
}
.image-modal {
    max-width:274px;
    max-height:400px;
    width: auto;
    height: auto;
}
</style>

