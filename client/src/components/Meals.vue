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
                <button v-on:click="add(meal)" class="btn btn-primary">Ajouter</button>
                <!-- <button v-on:click="add(meal)" class="btn btn-primary">Details</button> -->
              </div>
            </div>
          </div>

        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Meals',
  data (){
      return {
        meals : [
            {name : "foutou", price: 1200, qty:1, url:"https://unsplash.com/photos/-YHSwy6uqvk"},
            {name : "foufou", price: 1500, qty:1,  url:"https://unsplash.com/photos/-YHSwy6uqvk"},
            {name : "placali", price: 1600, qty:1,  url:"https://unsplash.com/photos/-YHSwy6uqvk"},
            {name : "Attiéké", price: 1700, qty:1,  url:"https://unsplash.com/photos/-YHSwy6uqvk"}
        ]
      }
  },
  methods : {
      add : function(meal){
        let Cart = JSON.parse(localStorage.getItem('CART')) ;
          Cart.push(meal);
          localStorage.setItem('CART',JSON.stringify(Cart))
          this.$root.$emit('cart-updated-event', meal);
          alert('plat ajouté au panier');
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
