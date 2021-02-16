var ui_gauge = {
  node: /*html*/ `

        <div
          class="red-ui-palette-node btn-add-node" type="ui_gauge"
          style="background-color: rgb(176, 223, 227); height: 40px;width:50%"
        >
          <div class="red-ui-palette-label" dir="">
            Gauge
          </div>
          <div
            class="red-ui-palette-icon-container"
            data-palette-icon="icons/node-red-dashboard/ui_gauge.png"
          >
            <div
              class="red-ui-palette-icon"
              style='background-image: url("icons/node-red-dashboard/ui_gauge.png");'
            ></div>
          </div>
        </div>

    `,
  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"ui_gauge","z":"a7b82102.9b8d38","name":"","group":"${groupId}","order":20,"width":0,"height":0,"gtype":"gage","title":"gauge","label":"units","format":"{{value}}","min":0,"max":10,"colors":["#00b500","#e6e600","#ca3838"],"seg1":"","seg2":"","x":90,"y":380,"wires":[]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       node-id       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (newNodeId) {
    return /*html*/ `
<md-card
    layout-align="center center"
    ng-class="{'nr-dashboard-disabled':me.item.disabled}"
    node-id="${newNodeId}"
    class="ng-scope _md layout-align-center-center visible grid-stack-item chart-container "
    style="margin: 0px; border: 3px solid green;"
>
</md-card>
          `;
  },
  edit: function (node) {
    console.log(node)
    let nodeId = $(node).attr("node-id");

    let currentNodeData = {
      gtype: $("#node-input-gtype").val(),
      colors: [
        $("#node-input-color1").css("background-color"),
        $("#node-input-color2").css("background-color"),
        $("#node-input-color3").css("background-color"),
      ],
      title: $("#node-input-title").val(),      
    };
    let config = this.loadConfig(currentNodeData)
    myChart[nodeId].destroy()
    var myiframe = document.getElementById("iframe_dashboard");
    var ctx = myiframe.contentWindow.document
      .getElementById(`canvas-${nodeId}`)
      .getContext("2d");
    myChart[nodeId] = new Chart(ctx, config);
    
  },
  size: function () {
    return {
      width: 6,
      height: 6,
    };
  },
  load: function (node) {

    var config = this.loadConfig(node)
    iframe
      .find(`md-card[node-id*='${node.id}']`)
      .find(".grid-stack-item-children")
      .remove();
    iframe.find(`md-card[node-id*='${node.id}']`).prepend(/*html*/ `
      <!-- <div class='grid-stack-item-content chart-container' style='postion:relative'> -->
        <img class='grid-stack-item-content' style='width:100%;height:100%;opacity: 0;position:absolute'  src="${editor_host}linhtranvu.github.io/node-red/editor/images/blank.jpg" />
        <canvas   id='canvas-${node.id}'>        
        </canvas>
      <!-- </div> -->
    `);
    var myiframe = document.getElementById("iframe_dashboard");
    var ctx = myiframe.contentWindow.document
      .getElementById(`canvas-${node.id}`)
      .getContext("2d");
    myChart[node.id] = new Chart(ctx, config);
    iframe
      .find(`md-card[node-id*='${node.id}']`)
      .css("postion", "relative")
      .addClass("chart-container");
    // iframe.find(`canvas[id*='canvas-${node.id}']`).removeAttr("style");
  },
  loadAll: function (node) {},
  loadConfig: function(node) {
    var config

    if (node.title == "") {
      var titleDisplay = false;
    } else {
      var titleDisplay = true;
    }    

    if (node.gtype == "gage") {

      config = {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [60, 60, 60],
              backgroundColor: [node.colors[0], node.colors[1], node.colors[2]],
              label: "Dataset 1",
            },
          ],
          labels: ["Red", "Orange", "Yellow"],
        },
        options: {
          responsive: true,
          cutoutPercentage: 60,
          maintainAspectRatio: false,
          circumference: Math.PI,
          rotation: -Math.PI,
          legend: {
            display: false,
            position: "top",
          },
          title: {
            display: titleDisplay,
            text: node.title,
          },
          animation: {
            animateScale: false,
            animateRotate: false,
          },
        },
      };

    }
    if (node.gtype == "donut") {

      config = {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [60, 60, 60],
              backgroundColor: [node.colors[0], node.colors[1], node.colors[2]],
              label: "Dataset 1",
            },
          ],
          labels: ["Red", "Orange", "Yellow"],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          circumference: 2 * Math.PI,
          cutoutPercentage: 60,
          rotation: -Math.PI / 2,
          legend: {
            display: false,
            position: "top",
          },
          title: {
            display: titleDisplay,
            text: node.title,
          },
          animation: {
            animateScale: false,
            animateRotate: false,
          },
        },
      };      
    }
    if (node.gtype == "compass" || node.gtype == "wave") {
      config = {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [100],
              backgroundColor:
                globalDashboardNode.theme.themeState["base-color"]["value"],
              label: "Dataset 1",
              borderWidth: 0,
              // weight: 0.1,
            },
          ],
          labels: ["Red"],
        },
        options: {
          responsive: true,
          cutoutPercentage: 90,
          maintainAspectRatio: false,
          circumference: 2 * Math.PI,
          rotation: -Math.PI / 2,
          legend: {
            display: false,
            position: "top",
          },
          title: {
            display: titleDisplay,
            text: node.title,
          },
          animation: {
            animateScale: false,
            animateRotate: false,
          },
        },
      };
    }
 
    return config;
  }
  
};//End JS Object

