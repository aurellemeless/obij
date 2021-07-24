<template>
  <div>
      <div class="container">
        <div class="row">
          <div class="col">
            <div><h3 class="card-title" style="text-align:center"> Gestion des plats </h3></div>
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
                    <label for="name">Nom </label>
                    <input type="text"  v-model="record.name"  class="form-control" id="name" aria-describedby="nameHelp">
                  </div>
                  <div class="form-group">
                    <label for="email">Prix </label>
                    <input type="number" min="0" step="1" v-model="record.price"  class="form-control" id="price" aria-describedby="priceHelp">
                  </div>
                  <div class="form-group">
                    <label for="pasword">Quantité</label>
                    <input type="number" min="0" step="1" v-model="record.qty"  class="form-control" id="qty">
                  </div>
                  <button type="button" class="btn btn-primary btn-lg" v-on:click="saveMeal"> Enregister </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-4" v-for="meal in meals" v-bind:key="meal.id">
            <div class="card meal">
              <img src="https://loremflickr.com/100/60/food,meal" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">{{ meal.name }}</h5>
                <p class="card-text"> {{ meal.price }}  F CFA</p>
                <button v-on:click="remove(meal)" class="btn btn-danger"><i class="bi bi-x-circle"></i></button>
                <button v-on:click="edit(meal)" class="btn btn-default"><i class="bi bi-pencil-square"></i></button> 
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
  name: 'AdminMeal',
  data (){
      return {
        errorMsg : "",
        successMsg : "",
        meals : [],
        record : {
          name : "",
          price : 0,
          qty : 1
        }
      }
  },
  methods : {
      saveMeal : function(){
          if(this.record.id !== undefined){
               axios
                .put('http://localhost:3001/meals/'+this.record.id,this.record)
                .then(response => {
                    this.record =  {
                        name : "",
                        price : 0,
                        qty : 1
                    };
                this.$root.$emit("meal-updated-event", this.record);
                this.successMsg = "Plat modifié !";
                this.errorMsg = "";
                console.log(response)
                })
                .catch(error => {
                this.errorMsg = "Enregistrement plat echoué";
                this.successMsg = "";
                console.log(error)
                })
      
          }else{ // create
               axios
                .post('http://localhost:3001/meals',this.record)
                .then(response => {
                    this.record =  {
                        name : "",
                        price : 0,
                        qty : 1
                    };
                this.$root.$emit("meal-updated-event", this.record);
                this.successMsg = "Plat ajouté !";
                this.errorMsg = "";
                console.log(response)
                })
                .catch(error => {
                this.errorMsg = "Enregistrement plat echoué";
                this.successMsg = "";
                console.log(error)
                })
      
          }
       },
      edit : function(meal){
        this.record = meal;
      },
      remove: function(meal) {
      if (confirm(`${meal.name} sera supprimé `)) {
         axios
        .delete('http://localhost:3001/meals/'+meal.id)
        .then(response => {
           
          this.$root.$emit("meal-updated-event", meal);
          this.successMsg = "Plat supprimé !";
          this.errorMsg = "";
          console.log(response)
        })
        .catch(error => {
          this.errorMsg = "Suppression plat echoué";
          this.successMsg = "";
          console.log(error)
        })
      }
    },
      loadMeals : function(){
        axios
        .get('http://localhost:3001/meals')
        .then(response => (this.meals = response.data))
        .catch(error => console.log(error))
      }
  },
  mounted(){
    this.loadMeals();
  },
  created() {
    this.$root.$on("meal-updated-event", (meal) =>{
      console.log("meal-updated-event", meal);
      this.loadMeals();
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.meal{
    margin-bottom: 15px;
}
</style>
