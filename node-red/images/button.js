$(document).ready(function(){
	
	$('.alert-primary').append(`<input type="text"  readonly="" id="linkInput"  value="${window.location.href}"><span  class="btn-copy btn btn-primary">Copy URL</span></div>`)

	$('.btn-copy').click(function() {
	  /* Get the text field */
	  var copyText = document.getElementById("linkInput");

	  /* Select the text field */
	  copyText.select();
	  copyText.setSelectionRange(0, 99999); /* For mobile devices */

	  /* Copy the text inside the text field */
	  document.execCommand("copy");

	  /* Alert the copied text */
	  alert("Copied the text: " + copyText.value);
	})           


})