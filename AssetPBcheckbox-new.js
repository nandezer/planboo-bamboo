{% assign planbooProduct = all_products['planboo-bamboo'] %}



{% if planbooProduct.available == true%}

  {% assign id = planbooProduct.variants.first.id %}	 
  {% assign bamboo_wraps_in_cart = 0 %}

  {% for item in cart.items %}
    {% if item.id == id %}
      {% assign bamboo_wraps_in_cart = item.quantity %}
    {% endif %}
  {% endfor %}

  <div id="is-a-bamboo" style="clear: left; margin: 0 0 0 0" class="clearfix rte">
    <input id="planboo-bamboo" type="checkbox" name="attributes[planboo-bamboo]" {% if cart.attributes.planboo-bamboo %} value="yes" checked="checked"{% endif %} style="float: none" />
    <label for="planboo-bamboo" style="display:inline; padding-left: 5px; float: none;">
      Climate friendly delivery
    </label>
    {% render 'why-planboo' %}
  </div>

  <script>

  Shopify.Cart = Shopify.Cart || {};

  Shopify.Cart.Bamboo = {};

  Shopify.Cart.Bamboo.set = function() {
      var headers = new Headers({ 'Content-Type': 'application/json' });


      let formData = { updates: { {{ id }}: 1 }, attributes: { 'planboo-bamboo': 'true'} };

     fetch('/cart/update.js', {
       method: 'POST',
       headers: headers,
       body: JSON.stringify(formData)
     })
     .then(response => {

       return response.json();
     })
     .catch((error) => {
       console.error('Error:', error);
     });
  }

  Shopify.Cart.Bamboo.remove = function() {
    var headers = new Headers({ 'Content-Type': 'application/json' });


   let formData = { updates: { {{ id }}: 0 }, attributes: { 'planboo-bamboo': ''} };

   fetch('/cart/update.js', {
     method: 'POST',
     headers: headers,
     body: JSON.stringify(formData)
   })
   .then(response => {

     return response.json();
   })
   .catch((error) => {
     console.error('Error:', error);
   });
  }

  // If we have a planboo-bamboo item in the cart but our planboo-bamboo cart attribute has not been set.
  {% if bamboo_wraps_in_cart > 0 and cart.attributes.planboo-bamboo == blank  %}
  document.addEventListener("DOMContentLoaded", function(){
    Shopify.Cart.Bamboo.remove();
  });
  // If we have no planboo-bamboo item in the cart but our planboo-bamboo cart attribute has been set.
  {% elsif bamboo_wraps_in_cart == 0 and cart.attributes.planboo-bamboo != blank  %}
  document.addEventListener("DOMContentLoaded", function(){
    Shopify.Cart.Bamboo.remove();
  });

  {% endif %}

  document.addEventListener("click", function(){  
  // When the planboo-bamboo checkbox is checked or unchecked.
    document.querySelector('[name="attributes[planboo-bamboo]"]').addEventListener("change", function(event) {
      if (event.target.checked) {
          Shopify.Cart.Bamboo.set();
      } else {
          Shopify.Cart.Bamboo.remove();
      }
    });  

  });

  </script>

{% else %}


{% endif %}

