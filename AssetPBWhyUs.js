<!-- Accordion Snippet by shopifya.com--><style><!--
.so-tab {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 15px 0;
}
.so-tab label {
  position: relative;
  display: block;
  padding: 0 25px 0 0;
  margin-bottom: 5px;
  line-height: normal;
  cursor: pointer;
  font-weight: bold;
}

.so-tab a {
  position: relative;
  display: block;
  line-height: normal;
  font-size: 0.75em;
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

--></style>

<div class="so-tab">
  <input id="so-tab" type="checkbox"/> 
  <label for="so-tab">Why Planboo?</label>
  <div class="so-tab-content">
    <a>• Plant bamboo and follow its growth.</a>
    <a>• Absorb 3x the emissions of shipping.</a>
    <a>• Empower rural communities and restore land.</a>
  </div>
</div>
