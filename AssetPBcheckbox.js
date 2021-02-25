
{% if linklists.planboo-bamboo.links.size > 0 and linklists.planboo-bamboo.links.first.type == 'product_link' %}

<!-- Accordion Snippet by shopifya.com--><style><!--
.so-tab {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 25px 0;
}
.so-tab label {
  position: relative;
  display: block;
  padding: 0 25px 0 0;
  margin-bottom: 15px;
  line-height: normal;
  cursor: pointer;
  font-weight: bold;
}
.so-tab input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.so-tab-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height .35s;
}
/* :checked */
.so-tab input:checked ~ .so-tab-content {
	max-height: none;	
}
/* Icon */
.so-tab label::after {
  position: absolute;
  right: -5px;
  top: -20px;
  display: block;
  width: 3em;
  height: 3em;
  line-height: 3;
  text-align: center;
  -webkit-transition: all .35s;
  -o-transition: all .35s;
  transition: all .35s;
}
.so-tab input[type=checkbox] + label::after {
	content: "+";
}
.so-tab input[type=radio] + label::after {
	content: "\25BC";
}
.so-tab input[type=checkbox]:checked + label::after {
	transform: rotate(315deg);
}
.so-tab input[type=radio]:checked + label::after {
	transform: rotateX(180deg);
}
--></style>


<div id="is-a-bamboo" style="clear: left; margin: 0 25px 0 25px" class="clearfix rte">
  <p>

	<input id="planboo-bamboo" type="checkbox" name="attributes[planboo-bamboo]" value="yes" {% if cart.attributes.planboo-bamboo %} checked="checked"{% endif %} style="float: none" />
	<label for="planboo-bamboo" style="display:inline; padding-left: 5px; float: none;">
	+{{ linklists.planboo-bamboo.links.first.object.price | money }} for climate friendly delivery.
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
