{% assign planbooProduct = all_products['planboo-bamboo'] %}

{% assign id = planbooProduct.variants.first.id %}


{% assign bamboo_wraps_in_cart = 0 %}

{% for item in cart.items %}
  {% if item.id == id %}
    {% assign bamboo_wraps_in_cart = item.quantity %}
  {% endif %}
{% endfor %}

  
<script>

Shopify.Cart = Shopify.Cart || {};

Shopify.Cart.Bamboo = {};

Shopify.Cart.Bamboo.setCreationAttribute = function() {
  
  var headers = new Headers({ 'Content-Type': 'application/json' });
  
  console.log("Creation attribute set");
  
  var request = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ updates: { {{ id }}: 1 }, attributes: { 'planboo-create': true, 'planboo-bamboo': true } })

  };
  fetch('/cart/update.js', request)
  .then(function() {
    //location.reload();
  });
}

Shopify.Cart.Bamboo.removeCreationAttribute = function() {
  var headers = new Headers({ 'Content-Type': 'application/json' });
  
  console.log("Creation attribute removed");
  
  var request = {
      method: 'POST',
      headers: headers,
    body: JSON.stringify({ attributes: { 'planboo-create': '', 'planboo-bamboo' : ''} })
  };
  fetch('/cart/update.js', request)
  .then(function() {
    //location.reload();
  });
}

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
</script>

{% if cart.items.size == 0%}

<style>
#updates_{{ id }} { display: none; }
</style>

  
<script>

//if cart is empty remove the attribute of planboo-create
document.addEventListener("DOMContentLoaded", function(){
  Shopify.Cart.Bamboo.removeCreationAttribute();
});
  

const open = window.XMLHttpRequest.prototype.open;

function openReplacement() {
  this.addEventListener("load", function () {
    if (
      [
        "/cart/add.js",
      ].includes(this._url)
    ) {
        console.log("add");
      	const cartObjAdd = JSON.parse(this.response);
        //console.log(cartObj);
        Shopify.Cart.Bamboo.setCreationAttribute();
    }
    else if (
      [
        "/cart/update.js",
        "/cart/change.js",
      ].includes(this._url)
    ) {
        console.log("update/change");
        const cartObjUpdate = JSON.parse(this.response);
        console.log(cartObjUpdate);
        if(cartObjUpdate.attributes["planboo-create"] == "true" & cartObjUpdate.item_count == 0){
      		Shopify.Cart.Bamboo.removeCreationAttribute();
    	}
        
    }
    
    else if (
      [
        "/cart/clear.js",
      ].includes(this._url)
    ) {
      	console.log("clear"); 
        Shopify.Cart.Bamboo.removeCreationAttribute();
    }
        
  });
  return open.apply(this, arguments);
}

window.XMLHttpRequest.prototype.open = openReplacement;

</script>



{% elsif planbooProduct.variants.first.price >= 0 and cart.items.size > 0 %}


<div id="is-a-bamboo" style="clear: left; margin: 0 0 0 0" class="clearfix rte">
  <p>

	
	<label for="planboo-bamboo" style="display:inline; padding-left: 5px; float: none;">
	Climate friendly delivery
	</label>
    <input id="planboo-bamboo" type="checkbox" name="attributes[planboo-bamboo]" value="yes" {% if cart.attributes.planboo-bamboo %} checked="checked"{% endif %} style="float: none" />
  </p>
</div>
{% render 'why-planboo' %}

<script>

// If we just created the cart and no planboo-bamboo was added to start with.
{% if cart.items.size > 0 and cart.attributes.planboo-create == blank %}
  document.addEventListener("DOMContentLoaded", function(){    
	Shopify.Cart.Bamboo.setCreationAttribute();
  });

//comment this if statement if don't want to add bamboo automatically at cart creation 
{% endif %}
  
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
  
  
const open = window.XMLHttpRequest.prototype.open;

function openReplacement() {
  this.addEventListener("load", function () {
    if (
      [
        "/cart/add.js",
      ].includes(this._url)
    ) {
        console.log("add extra product");
    }
    else if (
      [
        "/cart/update.js",
        "/cart/change.js",
      ].includes(this._url)
    ) {
        console.log("update/change");
        const cartObjUpdate1 = JSON.parse(this.response);
        //console.log(cartObj);
        if(cartObjUpdate1.attributes["planboo-create"] == "true" & cartObjUpdate1.item_count == 0){
      		Shopify.Cart.Bamboo.removeCreationAttribute();
    	}
        
    }
    
    else if (
      [
        "/cart/clear.js",
      ].includes(this._url)
    ) {
      	console.log("clear"); 
        Shopify.Cart.Bamboo.removeCreationAttribute();
    }
        
  });
  return open.apply(this, arguments);
}

window.XMLHttpRequest.prototype.open = openReplacement;
  
  

  
</script>


{% elsif planbooProduct.variants.first.price < 0 %}


{% endif %}

