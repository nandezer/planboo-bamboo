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
  
  let formData = { updates: { {{ id }}: 1 }, attributes: { 'planboo-bamboo': 'true', 'planboo-create' : 'true'} };
  
 fetch('/cart/update.js', {
   method: 'POST',
   headers: headers,
   body: JSON.stringify(formData)
 })
 .then(response => {
    console.log("succes creation added");
   	
   	return response.json();
   
 })
 .catch((error) => {
   console.error('Error:', error);
 });
}

Shopify.Cart.Bamboo.removeCreationAttribute = function() {
  var headers = new Headers({ 'Content-Type': 'application/json' });
  
  console.log("Creation attribute removed");
  
  let formData = {attributes: { 'planboo-bamboo': '', 'planboo-create': ''} };
  
 fetch('/cart/update.js', {
   method: 'POST',
   headers: headers,
   body: JSON.stringify(formData)
 })
 .then(response => {
    console.log("succes creation removal");
   return response.json();
 })
 .catch((error) => {
   console.error('Error:', error);
 });
}

Shopify.Cart.Bamboo.set = function() {
    var headers = new Headers({ 'Content-Type': 'application/json' });
  
    console.log("Add bamboo product");

    let formData = { updates: { {{ id }}: 1 }, attributes: { 'planboo-bamboo': 'true'} };

   fetch('/cart/update.js', {
     method: 'POST',
     headers: headers,
     body: JSON.stringify(formData)
   })
   .then(response => {
     console.log("succes added");
     
     return response.json();
   })
   .catch((error) => {
     console.error('Error:', error);
   });
}

Shopify.Cart.Bamboo.remove = function() {
  var headers = new Headers({ 'Content-Type': 'application/json' });
  
  console.log("remove bamboo product");
  
  
 let formData = { updates: { {{ id }}: 0 }, attributes: { 'planboo-bamboo': ''} };
  
 fetch('/cart/update.js', {
   method: 'POST',
   headers: headers,
   body: JSON.stringify(formData)
 })
 .then(response => {
    console.log("succes removal");
   	
   return response.json();
 })
 .catch((error) => {
   console.error('Error:', error);
 });
}
</script>

{% if cart.items.size == 0%}

<div id="is-a-bamboo" style="clear: left; margin: 0 0 0 0" class="clearfix rte">
  <p>
	<input id="planboo-bamboo" type="checkbox" name="attributes[planboo-bamboo]" value="yes" checked="checked" style="float: none" />
	<label for="planboo-bamboo" style="display:inline; padding-left: 5px; float: none;">
	Climate friendly delivery
	</label>
  </p>
</div>
{% render 'why-planboo' %}

<style>
#updates_{{ id }} { display: none; }
</style>

  
<script>

 
//if cart has been recently emptied out
{% if cart.attributes.planboo-create != blank %}  
document.addEventListener("DOMContentLoaded", function(){
  Shopify.Cart.Bamboo.removeCreationAttribute();
});
  
{% endif %}
  
  
document.addEventListener("click", function(){  
  // When the planboo-bamboo checkbox is checked or unchecked.
  console.log("click");
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
	
     <input id="planboo-bamboo" type="checkbox" name="attributes[planboo-bamboo]" {% if cart.attributes.planboo-bamboo %} value="yes" checked="checked"{% endif %} style="float: none" />
	<label for="planboo-bamboo" style="display:inline; padding-left: 5px; float: none;">
	Climate friendly delivery
	</label>
  </p>
</div>
{% render 'why-planboo' %}

<script>

// If we just created the cart and no planboo-bamboo was added to start with.
{% if cart.items.size > 0 and cart.attributes.planboo-create == blank %}
  document.addEventListener("DOMContentLoaded", function(){    
	Shopify.Cart.Bamboo.setCreationAttribute();
  });
{% endif %}
  
// If we have a planboo-bamboo item in the cart but our planboo-bamboo cart attribute has not been set.
{% if bamboo_wraps_in_cart > 0 and cart.attributes.planboo-bamboo == blank  %}
    document.addEventListener("DOMContentLoaded", function(){
      console.log("remove bamboo check 1");
      Shopify.Cart.Bamboo.remove();
  });
  // If we have no planboo-bamboo item in the cart but our planboo-bamboo cart attribute has been set.
{% elsif bamboo_wraps_in_cart == 0 and cart.attributes.planboo-bamboo != blank  %}
  document.addEventListener("DOMContentLoaded", function(){
    console.log("remove bamboo check 2");
    Shopify.Cart.Bamboo.remove();
  });

{% endif %}

document.addEventListener("click", function(){  
  // When the planboo-bamboo checkbox is checked or unchecked.
  console.log("click");
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
        console.log(cartObjUpdate1);
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
