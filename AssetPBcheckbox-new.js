{% assign planbooProduct = all_products['planboo-bamboo'] %}

{% assign id = planbooProduct.variants.first.id %}


{% assign bamboo_wraps_in_cart = 0 %}

{% for item in cart.items %}
  {% if item.id == id %}
    {% assign bamboo_wraps_in_cart = item.quantity %}
  {% endif %}
{% endfor %}

{% if planbooProduct.variants.first.price >= 0 %}


<div id="is-a-bamboo" style="clear: left; margin: 0 0 0 0" class="clearfix rte">
  <p>

	
	<label for="planboo-bamboo" style="display:inline; padding-left: 5px; float: none;">
	Climate friendly delivery
	</label>
    <input id="planboo-bamboo" type="checkbox" name="attributes[planboo-bamboo]" value="yes" {% if cart.attributes.planboo-bamboo %} checked="checked"{% endif %} style="float: none" />
  </p>
</div>
{% render 'why-planboo' %}


<style>
#updates_{{ id }} { display: none; }
</style>

<script>

Shopify.Cart = Shopify.Cart || {};

Shopify.Cart.Bamboo = {};

Shopify.Cart.Bamboo.set = function() {
  var headers = new Headers({ 'Content-Type': 'application/json' });
  
  var request = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ updates: { {{ id }}: 1 }, attributes: { 'planboo-bamboo': true } })
  };
  fetch('/cart/update.js', request)
  .then(function() {
    //location.reload();
  });
}

Shopify.Cart.Bamboo.remove = function() {
  var headers = new Headers({ 'Content-Type': 'application/json' });
  
  var request = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ updates: { {{ id }}: 0 }, attributes: { 'planboo-bamboo': '' } })
  };
  fetch('/cart/update.js', request)
  .then(function() {
    //location.reload();
  });
}
  
// If we have a planboo-bamboo item in the cart but our planboo-bamboo cart attribute has not been set.
{% if bamboo_wraps_in_cart > 0 and cart.attributes.planboo-bamboo == blank  %}
    document.addEventListener("DOMContentLoaded", function(){
      console.log("add bamboo check");
      Shopify.Cart.Bamboo.set();
  });
  // If we have no planboo-bamboo item in the cart but our planboo-bamboo cart attribute has been set.
{% elsif bamboo_wraps_in_cart == 0 and cart.attributes.planboo-bamboo != blank  %}
  document.addEventListener("DOMContentLoaded", function(){
    console.log("remove bamboo check");
    Shopify.Cart.Bamboo.remove();
  });

{% endif %}




// When the planboo-bamboo checkbox is checked or unchecked.
document.addEventListener("click", function(){
  document.querySelector('[name="attributes[planboo-bamboo]"]').addEventListener("change", function(event) {
    if (event.target.checked) {
      Shopify.Cart.Bamboo.set();
    } else {
      Shopify.Cart.Bamboo.remove();
    }

  });
  
});
  

</script>


{% elsif planbooProduct.variants.first.price < 0 %}


{% endif %}
