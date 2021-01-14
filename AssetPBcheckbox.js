
{% if linklists.planboo-bamboo.links.size > 0 and linklists.planboo-bamboo.links.first.type == 'product_link' %}

<div id="is-a-bamboo" style="clear: left; margin: 30px 0" class="clearfix rte">
  <p>

	<input id="planboo-bamboo" type="checkbox" name="attributes[planboo-bamboo]" value="yes" {% if cart.attributes.planboo-bamboo %} checked="checked"{% endif %} style="float: none" />
	<label for="planboo-bamboo" style="display:inline; padding-left: 5px; float: none;">
	For {{ linklists.planboo-bamboo.links.first.object.price | money }}
	add a bamboo in your order to offset the shipping emissions with <a href="https://www.planboo.eco" target="_blank">Planboo</a>.
	</label>
  </p>
</div>

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
  location.href = '/cart';
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
  location.href = '/cart';
});
}

// If we have a bamboo item in the cart but our planboo-bamboo cart attribute has not been set.
{% if bamboo_wraps_in_cart > 0 and cart.attributes.planboo-bamboo == blank  %}
document.addEventListener("DOMContentLoaded", function(){
Shopify.Cart.Bamboo.set();
});
// If we have no bamboo item in the cart but our planboo-bamboo cart attribute has been set.
{% elsif bamboo_wraps_in_cart == 0 and cart.attributes.planboo-bamboo != blank  %}
document.addEventListener("DOMContentLoaded", function(){
Shopify.Cart.Bamboo.set();
});
{% endif %}

// When the planboo-bamboo checkbox is checked or unchecked.
document.addEventListener("DOMContentLoaded", function(){
document.querySelector('[name="attributes[planboo-bamboo]"]').addEventListener("change", function(event) {
  if (event.target.checked) {
	Shopify.Cart.Bamboo.set();
  } else {
	Shopify.Cart.Bamboo.remove();
  }

});

document.querySelector('#bamboo-note').addEventListener("change", function(evt) {
  var note = evt.target.value;
  var headers = new Headers({ 'Content-Type': 'application/json' });

  var request = {
	method: 'POST',
	headers: headers,
	body: JSON.stringify({ attributes: { 'bamboo-note': note } })
  };

  fetch('/cart/update.js', request);
});
});

</script>

{% else %}

<p style="clear: left; margin: 30px 0" class="rte">
There has been an error, please contact Planboo
<a href="https:www.planboo.eco" target="_blank" rel="noopener noreferrer nofollow">here</a>.
</p>

{% endif %}
