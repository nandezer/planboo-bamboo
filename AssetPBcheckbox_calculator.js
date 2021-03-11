
{% if linklists.planboo-calculator.links.size > 0 and linklists.planboo-calculator.links.first.type == 'product_link' and linklists.planboo-calculator.links.first.object.variants.first.price == 0 %}


<div id="is-a-calculator" style="clear: left; margin: 0 25px 0 25px" class="clearfix rte">
  <p>

	<input id="planboo-calculator" type="checkbox" name="attributes[planboo-calculator]" value="yes" {% if cart.attributes.planboo-calculator %} checked="checked"{% endif %} style="float: none" />
	<label for="planboo-calculator" style="display:inline; padding-left: 5px; float: none;">
	I want to know my delivery carbon footprint.
	</label>
  </p>
</div>
{% render 'why-planboo' %}

{% assign id = linklists.planboo-calculator.links.first.object.variants.first.id %}

{% assign calculator_wraps_in_cart = 0 %}
{% for item in cart.items %}
{% if item.id == id %}
  {% assign calculator_wraps_in_cart = item.quantity %}
{% endif %}
{% endfor %}

<style>
#updates_{{ id }} { display: none; }
</style>

<script>

Shopify.Cart = Shopify.Cart || {};

Shopify.Cart.Calculator = {};

Shopify.Cart.Calculator.set = function() {
var headers = new Headers({ 'Content-Type': 'application/json' });

var request = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({ updates: { {{ id }}: 1 }, attributes: { 'planboo-calculator': true } })
};
fetch('/cart/update.js', request)
.then(function() {
  location.reload();
});
}

Shopify.Cart.Calculator.remove = function() {
var headers = new Headers({ 'Content-Type': 'application/json' });

var request = {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({ updates: { {{ id }}: 0 }, attributes: { 'planboo-calculator': '', 'Calculator-note': '' } })
};
fetch('/cart/update.js', request)
.then(function() {
  location.reload();
});
}

 // When the planboo-calculator checkbox is checked or unchecked.
document.addEventListener("DOMContentLoaded", function(){
document.querySelector('[name="attributes[planboo-calculator]"]').addEventListener("change", function(event) {
  if (event.target.checked) {
	Shopify.Cart.Calculator.set();
  } else {
	Shopify.Cart.Calculator.remove();
  }

});


});

</script>


{% elsif linklists.planboo-calculator.links.size > 0 and linklists.planboo-calculator.links.first.type == 'product_link' and linklists.planboo-calculator.links.first.object.variants.first.price <> 0 %}

{% else %}
  <div id="is-a-calculator" style="clear: left; margin: 5px 0" class="clearfix rte">	
    <p>	
      <label for="planboo-calculator" style="display:inline; padding-left: 5px; float: none;">	
         Please make sure Step 2 of the installation process is done correctly. 	
        <br>	
        If you have any questions <a href="mailto:grow@planboo.com" target="_blank">contact us</a>.	
      </label>	
    </p>	
  </div>

{% endif %}
