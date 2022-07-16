<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="empty" v-if="!total">
            <h2>Votre panier est vide</h2>
            <router-link class="btn btn-primary btn-lg" to="/">Retourner à l'acceuil</router-link>
          </div>
          <div v-if="total">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Plat</th>
                  <th scope="col">P.U.</th>
                  <th scope="col">Qte</th>
                  <th scope="col">S.Total</th>
                  <td>&nbsp;</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart" v-bind:key="item.name">
                  <th scope="row">#</th>
                  <td>{{ item.name }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.qty }}</td>
                  <td>{{ item.qty * item.price }}</td>
                  <td>
                    <button v-on:click="remove(item)" title="Supprimer" class="btn btn-danger">
                      <i class="bi bi-x-circle"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th colspan="5">Total</th>
                  <td>{{ total }}</td>
                </tr>
              </tfoot>
            </table>

            <div><h3 class="card-title">Detail livraison</h3></div>
            <div class="card meal">
              <div class="card-body">
                <div
                  v-if="errorMsg.length > 0"
                  class="alert alert-danger"
                  role="alert"
                >
                  {{ errorMsg }}
                </div>
                <div
                  v-if="successMsg.length > 0"
                  class="alert alert-success"
                  role="alert"
                >
                  {{ successMsg }}
                </div>
                <form>
                  <div class="form-group">
                    <label for="name">Nom & Prénom </label>
                    <input
                      type="text"
                      v-model="user.name"
                      class="form-control"
                      id="name"
                      aria-describedby="nameHelp"
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email </label>
                    <input
                      type="email"
                      v-model="user.email"
                      class="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="form-group">
                    <label for="phone">Téléphone</label>
                    <input
                      type="text"
                      v-model="user.phone"
                      class="form-control"
                      id="phone"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-if="total">
        <div class="col" style="padding-bottom:50px;text-align:right">
          <button v-on:click="checkout" class="btn btn-primary btn-lg">
            Soumettre ma commande
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Cart",
  data() {
    return {
      cart: [],
      total: 0,
      errorMsg: "",
      successMsg: "",
      user: {
        name: "",
        email: "",
        phone: "",
      },
    };
  },
  methods: {
    sommeAll: function() {
      this.total = 0;
      for (let item of this.cart) {
        this.total += item.price;
      }
    },
    remove: function(meal) {
      if (confirm(`${meal.name} sera supprimé de votre panier`)) {
        let newCart = [];
        for (let item of this.cart) {
          if (item.name !== meal.name) {
            newCart.push(item);
          }
        }

        this.cart = newCart;
        localStorage.setItem("CART", JSON.stringify(newCart));
        this.sommeAll();
        this.$root.$emit("cart-updated-event", meal);
      }
    },
    checkout: function() {
      axios
        .post("http://localhost:3001/checkout", { cart: this.cart, user : this.user })
        .then((response) => {
          this.successMsg = "Votre comande a bien été enrégistrée !";
          this.errorMsg = "";
          console.log(response);
          // clean the cart
          localStorage.setItem("CART", JSON.stringify([]));
          this.$root.$emit("cart-updated-event", {});
          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 2000);
        })
        .catch((error) => {
          this.errorMsg = "l'enregistrement de votre comande a echouée";
          this.successMsg = "";
          console.log(error);
        });
    },
  },
  mounted() {
    let CART = JSON.parse(localStorage.getItem("CART"));
    if (!!CART) {
      localStorage.setItem("CART", []);
    } else {
      this.cart = JSON.parse(localStorage.getItem("CART"));
      this.sommeAll();
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.meal {
  margin-bottom: 25px;
}
.empty {
  text-align: center;
}
</style>
