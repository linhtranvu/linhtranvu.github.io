


var checkExistContainer = setInterval(function () {

  var element_container = document.getElementById("btn-editor-container");
  if (typeof element_container != "undefined" && element_container != null) {

    clearInterval(checkExistContainer);
    $("#btn-editor-container").html(
      `<button id="btn-editor-intro" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;"  onclick="editorIntro()" ><b>Editor Intro</b></button>`
    );   
  }    

}, 1000); // check every 500ms



function editorIntro() {
  Swal.fire({
    title: "WYSIWYG Editor for Dashboard",
    text:
      "Exclusive feature, please by PRO version to drag and drop UI for Dashboard on mobile",
    // icon: "warning",
    // showCancelButton: true,
    confirmButtonColor: "#3085d6",
    // cancelButtonColor: "#d33",
    confirmButtonText: "BUY PRO VERSION",
  }).then((result) => {
    if (result.isConfirmed) {
      webkit.messageHandlers.cordova_iab.postMessage(
        JSON.stringify({
          buypro: "buypro",
        })
      );
    }
  });
}