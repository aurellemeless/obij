<template>
  <div>
      <div class="container">
        <div class="row">
            
          <div class="col-md-4" v-for="meal in meals" v-bind:key="meal.name">
            <div class="card meal">
              <img src="https://loremflickr.com/100/60/food,meal" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">{{ meal.name }}</h5>
                <p class="card-text"> {{ meal.price }}  F CFA</p>
                <button v-on:click="add(meal)" class="btn btn-primary"><i class="bi bi-cart-fill"></i> Ajouter au panier</button>
                <!-- <button v-on:click="add(meal)" class="btn btn-primary">Details</button> -->
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
  name: 'Meals',
  data (){
      return {
        meals : []
      }
  },
  methods : {
      add : function(meal){
        if(confirm(`Voulez vous ajouter le plat "${meal.name}" au panier`)){
          let Cart = JSON.parse(localStorage.getItem('CART')) ;
          meal.qty = 1;
          Cart.push(meal);
          localStorage.setItem('CART',JSON.stringify(Cart))
          this.$root.$emit('cart-updated-event', meal);
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.meal{
    margin-bottom: 30px;
}
</style>
