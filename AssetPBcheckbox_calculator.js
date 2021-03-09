
{% if linklists.planboo-bamboo.links.size > 0 and linklists.planboo-bamboo.links.first.type == 'product_link' and linklists.planboo-bamboo.links.first.object.variants.first.price >= 0 %}


<div id="is-a-bamboo" style="clear: left; margin: 0 25px 0 25px" class="clearfix rte">
  <p>

	<input id="planboo-bamboo" type="checkbox" name="attributes[planboo-bamboo]" value="yes" {% if cart.attributes.planboo-bamboo %} checked="checked"{% endif %} style="float: none" />
	<label for="planboo-bamboo" style="display:inline; padding-left: 5px; float: none;">
	I want to know my delivery carbon footprint.
	</label>
  </p>
</div>
{% render 'why-planboo' %}

{% assign id = linklists.planboo-bamboo.links.first.object.variants.first.id %}

{% assign bamboo_wraps_in_cart = 0 %}
{% for item in cart.items %}
{% if item.id == id %}
  {% assign bamboo_wraps_in_cart = item.quantity %}
{% endif %}
{% endfor %}

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
  location.reload();
});
}

Shopify.Cart.Bamboo.remove = function() {
var headers = new Headers({ 'Content-Type': 'application/json' });

var request = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({ updates: { {{ id }}: 0 }, attributes: { 'planboo-bamboo': '', 'Bamboo-note': '' } })
};
fetch('/cart/update.js', request)
.then(function() {
  location.reload();
});
}

 // When the planboo-bamboo checkbox is checked or unchecked.
document.addEventListener("DOMContentLoaded", function(){
document.querySelector('[name="attributes[planboo-bamboo]"]').addEventListener("change", function(event) {
  if (event.target.checked) {
	Shopify.Cart.Bamboo.set();
  } else {
	Shopify.Cart.Bamboo.remove();
  }

});


});

</script>


{% elsif linklists.planboo-bamboo.links.size > 0 and linklists.planboo-bamboo.links.first.type == 'product_link' and linklists.planboo-bamboo.links.first.object.variants.first.price < 0 %}

{% else %}
  <div id="is-a-bamboo" style="clear: left; margin: 5px 0" class="clearfix rte">	
    <p>	
      <label for="planboo-bamboo" style="display:inline; padding-left: 5px; float: none;">	
         Please make sure Step 2 of the installation process is done correctly. 	
        <br>	
        If you have any questions <a href="mailto:grow@planboo.com" target="_blank">contact us</a>.	
      </label>	
    </p>	
  </div>

{% endif %}
