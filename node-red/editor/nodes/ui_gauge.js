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
    return `[{"id":"3bf71c55.2380dc","type":"ui_gauge","z":"a7b82102.9b8d38","name":"","group":"${groupId}","order":20,"width":0,"height":0,"gtype":"gage","title":"gauge","label":"units","format":"{{value}}","min":0,"max":10,"colors":["#00b500","#e6e600","#ca3838"],"seg1":"","seg2":"","x":90,"y":380,"wires":[]}]`;
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

var myNode = {
  id: newNodeId
}

ui_gauge.load(myNode)


          `;
  },
  edit: function (node) {
    let nodeId = $(node).attr("node-id");

    myChart[nodeId].data.datasets[0].backgroundColor[0] = $(
      "#node-input-color1"
    ).css("background-color");
    myChart[nodeId].data.datasets[0].backgroundColor[1] = $(
      "#node-input-color2"
    ).css("background-color");
    myChart[nodeId].data.datasets[0].backgroundColor[2] = $(
      "#node-input-color3"
    ).css("background-color");
    myChart[nodeId].options.title.text = $("#node-input-title").val();
    if ($("#node-input-title").val() === "") {
      myChart[nodeId].options.title.display = false;
    } else {
      myChart[nodeId].options.title.display = true;
    }
    switch ($("#node-input-gtype").val()) {
      case "gage":
        console.log("gage");
        myChart[nodeId].options.circumference = Math.PI;
        myChart[nodeId].options.rotation = -Math.PI;
        break;
      case "donut":
        myChart[nodeId].options.circumference = 2 * Math.PI;
        myChart[nodeId].options.rotation = -Math.PI / 2;
        break;
      case "compass":
        myChart[nodeId].options.circumference = 2 * Math.PI;
        myChart[nodeId].options.rotation = -Math.PI / 2;
        myChart[nodeId].data.datasets[0].backgroundColor[1] = $(
          "#node-input-color1"
        ).css("background-color");
        myChart[nodeId].data.datasets[0].backgroundColor[2] = $(
          "#node-input-color1"
        ).css("background-color");

        break;
      case "wave":
        myChart[nodeId].options.circumference = 2 * Math.PI;
        myChart[nodeId].options.rotation = -Math.PI / 2;
        myChart[nodeId].data.datasets[0].backgroundColor[1] = $(
          "#node-input-color1"
        ).css("background-color");
        myChart[nodeId].data.datasets[0].backgroundColor[2] = $(
          "#node-input-color1"
        ).css("background-color");
        break;
      default:
      // code block
    }

    myChart[nodeId].update();
  },
  size: function () {
    return {
      width: 6,
      height: 6,
    };
  },
  load: function (node) {
    let circumference = "";
    let rotation = "";
    let color2 = node.colors[1];
    let color3 = node.colors[2];

    if (node.gtype == "gage") {
      circumference = Math.PI;
      rotation = -Math.PI;
    }
    if (node.gtype == "donut") {
      circumference = 2 * Math.PI;
      rotation = -Math.PI / 2;
    }
    if (node.gtype == "compass") {
      circumference = 2 * Math.PI;
      rotation = -Math.PI / 2;
      color2 = node.colors[0];
      color3 = node.colors[0];
    }
    if (node.gtype == "wave") {
      circumference = 2 * Math.PI;
      rotation = -Math.PI / 2;
      color2 = node.colors[0];
      color3 = node.colors[0];
    }

    if (node.title == "") {
      var titleDisplay = false;
    } else {
      var titleDisplay = true;
    }

    var config = {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [60, 60, 60],
            backgroundColor: [node.colors[0], color2, color3],
            label: "Dataset 1",
          },
        ],
        labels: ["Red", "Orange", "Yellow"],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        circumference: circumference,
        rotation: rotation,
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

    iframe
      .find(`md-card[node-id*='${node.id}']`)
      .find(".grid-stack-item-content")
      .remove();
    iframe.find(`md-card[node-id*='${node.id}']`).prepend(`
      <canvas class='grid-stack-item-content' id='canvas-${node.id}'>        
      </canvas>
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
};//End JS Object

