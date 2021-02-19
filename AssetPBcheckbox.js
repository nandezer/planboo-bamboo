
{% if linklists.planboo-bamboo.links.size > 0 and linklists.planboo-bamboo.links.first.type == 'product_link' %}


<div id="is-a-bamboo" style="clear: left; margin: 0px 10px 0px 30px" class="clearfix rte">
	<input id="planboo-bamboo" type="checkbox" name="attributes[planboo-bamboo]" value="no" {% if cart.attributes.planboo-bamboo %} checked="checked"{% endif %} style="float: none" />
	<label for="planboo-bamboo" style="display:inline; float: none;">
		Carbon negative delivery with <a href="https://www.planboo.eco" target="_blank">Planboo.</a> +{{ linklists.planboo-bamboo.links.first.object.price | money }}
	</label>
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
	location.reload();
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

{% else %}

{% endif %}
