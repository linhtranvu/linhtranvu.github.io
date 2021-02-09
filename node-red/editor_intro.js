
$("#btn-editor-container").html(
  `<button id="btn-editor-intro" class="ui-button ui-widget ui-corner-all" style="color:white;background-color: orange;"  onclick="editorIntro()" ><b>Editor Intro</b></button>`
);


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