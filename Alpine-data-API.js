document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function() {
      return {
        init() {
            // call the api to load data into the screen here
            axios
            .get('https://pizza-cart-api.herokuapp.com/api/pizzas')
            .then((result) => {
             this.pizzas = result.data.pizzas;
             }) 

            .then(() => {
             return this.createCart();
             }) 

             .then((result) => {
                return this.cartId = result.data.cart_code;
                }) 
                .catch(err => alert(err) );
            },

            remove(pizza){

              const params = {

                cart_code: this.cartId,
                pizza_id : pizza.id
              } 

              return axios.post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove', params)
              
              
        
              .catch(err => alert(err) );
            },

        createCart(){

            return axios.get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username' + this.username)
        },
        showCart(){
        
            axios
            .get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/'+ this.cartId +'/get')
            .then((result) => {
                this.cart = result.data;
            });
        },

        pizzas: [],
        cartId: '',
        massage: '',
        username: 'Atlegang',
        cart: { total: 0 },
  
     add(pizza){
      
      const params = {

        cart_code: this.cartId,
        pizza_id : pizza.id
      } 

  axios
      .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
      .then( () => { 
        this.massage = "pizzas added to the cart"
        this.showCart();

      })

      .catch(err => alert(err) );
      },
        
        
      }
    });
})


