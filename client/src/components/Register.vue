<template>
  <div>
      <div class="container">
        <div class="row">
          <div class="col">
            <div><h3 class="card-title" style="text-align:center"> Inscription </h3></div>
            <div class="card meal">
              <div class="card-body">
                
                  <div v-if="errorMsg.length>0" class="alert alert-danger" role="alert">
                    {{ errorMsg }}
                  </div>
                  <div v-if="successMsg.length>0" class="alert alert-success" role="alert">
                    {{ successMsg }}
                  </div>
                <form>
                  <div class="form-group">
                    <label for="name">Nom & Prénom </label>
                    <input type="text"  v-model="user.name"  class="form-control" id="name" aria-describedby="nameHelp">
                  </div>
                  <div class="form-group">
                    <label for="email">Email </label>
                    <input type="email"  v-model="user.email"  class="form-control" id="email" aria-describedby="emailHelp">
                  </div>
                  <div class="form-group">
                    <label for="pasword">Mot de passe</label>
                    <input type="password"  v-model="user.password"  class="form-control" id="pasword">
                  </div>
                  <button type="button" class="btn btn-primary btn-lg" v-on:click="doRegistration">Créer mon compte </button>
                  <router-link  class="btn btn-default  btn-lg" to="/login">Vous avez déjà un compte ?</router-link>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'Register',
  data (){
      return {
        errorMsg : "",
        successMsg : "",
        user : {
          name : "",
          email : "",
          password : ""
        }
      }
  },
  methods : {
      doRegistration : function(){
        axios
        .post('http://localhost:3001/register',this.user)
        .then(response => {
          this.successMsg = "Inscription reussie !";
          this.errorMsg = "";
          console.log(response)
          setTimeout(()=> {
            this.$router.push({name : 'Login'});
          },2000);
        })
        .catch(error => {
          this.errorMsg = "Inscription echouée";
          this.successMsg = "";
          console.log(error)
        })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.meal{
    margin-bottom: 15px;
}
</style>
