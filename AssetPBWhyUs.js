<!-- Accordion Snippet by shopifya.com--><style><!--
.so-tab {
  position: relative;
  width: 100%;
  margin:15px 0 0 0;
}
.so-tab label {
  position: relative;
  display: block;
  padding: 0 0 0 0;
  margin-bottom: 5px;
  line-height: normal;
  cursor: pointer;
  font-weight: bold;
}

.so-tab a {
  position: relative;
  display: block;
  padding: 0 0 0 25px;
  font-size: 0.85em;
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
	margin:0 0 0 0;
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
  <label for="so-tab">with Planboo</label>
  <div class="so-tab-content">
    <a>• Plant bamboo to capture CO2</a>
    <a>• Support smallholder farmers</a>
    <a>• Follow your climate action</a>
  </div>
</div>
