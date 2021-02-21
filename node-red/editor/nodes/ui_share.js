var ui_share = {

  edit: function (node) {
    node = {
      id: currentSelectNodeObject.id,
      d: $("#node-input-node-disabled").is(":checked"),
    }
    $(`md-card[node-id*='${node.id}']`).find(".md-card-img-dummy").remove()
    $(`md-card[node-id*='${node.id}']`).find(".md-card-ui-select").remove();
    $(`md-card[node-id*='${node.id}']`).append(this.load(node))
  },

  load: function (node) {
    if(node.d == true){
      opacity = 0.5
    }else{
      opacity = 0
    }
    return /*html*/ `
    
    <img style='width:100%;height:100%;opacity: ${opacity};position:absolute;z-index:5;inset:0' 
        class='grid-stack-item-content md-card-img-dummy' src="${editor_host}linhtranvu.github.io/node-red/editor_v2/images/blank.jpg">
    <div class="ui-button btn-editor ui-widget ui-corner-all md-card-ui-select" onclick='selectNode("${node.id}")'><i class="fa fa-hand-pointer-o" style='background-color:white'></i></div>        
    `;    
  },
  loadAll: function (node) {},
};//End JS Object

