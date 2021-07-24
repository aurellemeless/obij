<template>
  <div>
      <div class="container">
        <div class="row">
            
           <div class="col"> 
             <div   class="empty" v-if="total == 0">
              <h2> Votre panier est vide </h2>
              <router-link  class="btn btn-primary btn-lg" to="/">Retourner à l'acceuil </router-link>
             </div>
            <table class="table" v-if="total>0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Plat</th>
                    <th scope="col">Pu</th>
                    <th scope="col">Qte</th>
                    <th scope="col">S.Total</th>
                    <td>&nbsp;</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cart"  v-bind:key="item.name">
                    <th scope="row">#</th>
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.qty }}</td>
                    <td>{{ item.qty*item.price }}</td>
                    <td>
                      <button v-on:click="remove(item)" class="btn btn-primary">Supprimer</button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                    <tr>
                      <th  colspan="5">Total</th>
                      <td>{{ total }}</td>
                    </tr>
                  </tfoot>
              </table>
          </div>

        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Cart',
  data (){
      return {
        cart : [],
        total : 0
      }
  },
  methods : {
        sommeAll : function(){
            this.total = 0;
            for(let item of this.cart){
                this.total+= item.price;
            }
        },
        remove : function(meal){
          if(confirm(`${meal.name} sera supprimé de votre panier`)){
            let newCart = [];
            for(let item of this.cart){
                if(item.name !== meal.name){
                  newCart.push(item);
                }
            }

            this.cart = newCart;
            localStorage.setItem('CART',JSON.stringify(newCart));
            this.sommeAll();
            this.$root.$emit('cart-updated-event', meal);
          }
        }
  },
  mounted(){
    let CART = JSON.parse(localStorage.getItem('CART'))
    if( CART == undefined){
      localStorage.setItem('CART',[]);
    }else{
        this.cart = JSON.parse(localStorage.getItem('CART'));
        this.sommeAll();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.meal{
    margin-bottom: 15px;
}
.empty{
  text-align: center;
}
</style>
