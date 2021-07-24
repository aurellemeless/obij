<template>
  <div>
      <div class="container">
        <div class="row">
          <div class="col">
            <div><h3 class="card-title"> Inscription </h3></div>
            <div class="card meal">
              <div class="card-body">
                <form>
                  <div class="form-group">
                    <label for="name">Nom & Prénom </label>
                    <input type="name" class="form-control" id="name" aria-describedby="nameHelp">
                  </div>
                  <div class="form-group">
                    <label for="email">Email </label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                  </div>
                  <div class="form-group">
                    <label for="pasword">Mot de passe</label>
                    <input type="password" class="form-control" id="pasword">
                  </div>
                  <button type="submit" class="btn btn-primary">Inscription</button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data (){
      return {
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
