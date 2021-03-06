var ui_chart = {
  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"${Math.random()
      .toString(36)
      .substr(
        2,
        15
      )}","type":"ui_chart","z":"a7b82102.9b8d38","name":"","group":"${groupId}","order":21,"width":0,"height":0,"label":"chart","chartType":"line","legend":"false","xformat":"HH:mm:ss","interpolate":"linear","nodata":"","dot":false,"ymin":"","ymax":"","removeOlder":1,"removeOlderPoints":"","removeOlderUnit":"3600","cutout":0,"useOneColor":false,"useUTC":false,"colors":["#1f77b4","#aec7e8","#ff7f0e","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5"],"useOldStyle":false,"outputs":1,"x":90,"y":440,"wires":[[]]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (node) {
    return /*html*/ `

      <md-card ui-card-size="6x4" layout-align="center center" load='load' 
          node-id="${node.id}" class="grid-stack-item ng-scope _md layout-align-center-center visible"
          data-gs-width='${node.width}' data-gs-height='${node.height}'
          data-gs-x='${node.xcord}' data-gs-y='${node.ycord}'           
          style="margin: 0px; border: 3px solid green; ">
          ${ui_share.load(node)} 
          <canvas  id='canvas-${node.id}'> 
            
          </canvas>
      </md-card>

          `;
  },
  edit: function (node) {
    let nodeId = $(node).attr("node-id");
    let currentNodeData = {
      chartType: $("#node-input-chartType").val(),
      label: $("#node-input-label").val(),
      legend: $("#node-input-legend").val(),
      colors: [
        $("#node-input-color1").val(),
        $("#node-input-color2").val(),
        $("#node-input-color3").val(),
        $("#node-input-color4").val(),
        $("#node-input-color5").val(),
      ],
      xformat: $("#node-input-xformat").val(),
      interpolate: $("#node-input-interpolate").val(),
      ymin: $("#node-input-ymin").val(),
      ymax: $("#node-input-ymax").val(),
    };
    console.log(currentNodeData);
    let config = this.loadConfig(currentNodeData);

    myChart[nodeId].destroy();

    var myiframe = document.getElementById("iframe_dashboard");
    var ctx = document.getElementById(`canvas-${nodeId}`).getContext("2d");
    myChart[nodeId] = new Chart(ctx, config);
    ui_share.edit();    
  },
  size: function () {
    return {
      width: 6,
      height: 6,
    };
  },
  load: function (node) {

    let config = this.loadConfig(node);
    var ctx = document.getElementById(`canvas-${node.id}`).getContext("2d");
    myChart[node.id] = new Chart(ctx, config);
    iframe
      .find(`md-card[node-id*='${node.id}']`)
      .css("postion", "relative")
      .addClass("chart-container");

    // var resizeChart = new ResizeObserver(function () {
    //   myChart[node.id] = new Chart(ctx, config);
    //   iframe
    //     .find(`md-card[node-id*='${node.id}']`)
    //     .css("postion", "relative")
    //     .addClass("chart-container");
    // });

    // resizeChart.observe(
    //   document.querySelector(`md-card[node-id="${node.id}"]`)
    // );
    // iframe.find(`canvas[id*='canvas-${node.id}']`).removeAttr("style");
  },
  loadAll: function (node) {},
  loadConfig: function (node) {
    var config;
    if (node.label == "") {
      var titleDisplay = false;
    } else {
      var titleDisplay = true;
    }
    if (node.legend == "false") {
      var legendDisplay = false;
    } else {
      var legendDisplay = true;
    }
    if (node.interpolate == "step") {
      var stepLine = true;
    } else {
      var stepLine = false;
    }
    var ymin = node.ymin == "" ? 0 : parseInt(node.ymin);
    if (node.ymax == "") {
      var ymax = node.ymin == "" ? 100 : parseInt(node.ymin) + 100;
    } else {
      var ymax = parseInt(node.ymax);
    }

    if (node.chartType == "line") {
      // line bar horizontalBar pie polar-area radar
      config = {
        type: "line",
        data: {
          labels: ["", "", "", "", "", "", ""],
          datasets: [
            {
              label: "1",
              backgroundColor: node.colors[0],
              borderColor: node.colors[0],
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
              fill: false,
              steppedLine: stepLine,
            },
            {
              label: "2",
              fill: false,
              steppedLine: stepLine,
              backgroundColor: node.colors[1],
              borderColor: node.colors[1],
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
            },
            {
              label: "3",
              fill: false,
              steppedLine: stepLine,
              backgroundColor: node.colors[2],
              borderColor: node.colors[2],
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
            },
            {
              label: "4",
              fill: false,
              steppedLine: stepLine,
              backgroundColor: node.colors[3],
              borderColor: node.colors[3],
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
            },
            {
              label: "5",
              fill: false,
              steppedLine: stepLine,
              backgroundColor: node.colors[4],
              borderColor: node.colors[4],
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
            },
          ],
        },
        options: {
          responsive: true,
          title: {
            display: titleDisplay,
            text: node.label,
          },
          legend: {
            display: legendDisplay,
            position: "top",
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          animation: {
            animateRotate: false,
            animateScale: false,
            duration: 0,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: node.xformat,
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                },
              },
            ],
          },
        },
      };
    }

    if (node.chartType == "bar" || node.chartType == "horizontalBar") {
      // line bar horizontalBar pie polar-area radar
      config = {
        type: node.chartType,
        data: {
          labels: ["", "", "", "", "", "", ""],
          datasets: [
            {
              label: "1",
              backgroundColor: node.colors[0],
              borderColor: node.colors[0],
              borderWidth: 1,
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
              fill: false,
            },
            {
              label: "2",
              fill: false,
              borderWidth: 1,
              backgroundColor: node.colors[1],
              borderColor: node.colors[1],
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
            },
            {
              label: "3",
              fill: false,
              borderWidth: 1,
              backgroundColor: node.colors[2],
              borderColor: node.colors[2],
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
            },
            {
              label: "4",
              fill: false,
              borderWidth: 1,
              backgroundColor: node.colors[3],
              borderColor: node.colors[3],
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
            },
            {
              label: "5",
              fill: false,
              borderWidth: 1,
              backgroundColor: node.colors[4],
              borderColor: node.colors[4],
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
            },
          ],
        },
        options: {
          responsive: true,
          title: {
            display: titleDisplay,
            text: node.label,
          },
          legend: {
            display: legendDisplay,
            position: "top",
          },
          animation: {
            animateRotate: false,
            animateScale: false,
            duration: 0,
          },
          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: node.xformat,
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                },
              },
            ],
          },
        },
      };
    } // end a chart type

    if (node.chartType == "pie") {
      // line bar horizontalBar pie polar-area radar
      config = {
        type: node.chartType,
        data: {
          datasets: [
            {
              data: [
                randomScalingFactor(-100, 100),
                randomScalingFactor(-100, 100),
                randomScalingFactor(-100, 100),
                randomScalingFactor(-100, 100),
                randomScalingFactor(-100, 100),
              ],
              backgroundColor: [
                node.colors[0],
                node.colors[1],
                node.colors[2],
                node.colors[3],
                node.colors[4],
              ],
              label: "Dataset 1",
            },
          ],
          labels: ["1", "2", "3", "4", "5"],
        },
        options: {
          responsive: true,
          title: {
            display: titleDisplay,
            text: node.label,
          },
          legend: {
            display: legendDisplay,
            position: "top",
          },
          animation: {
            animateRotate: false,
            animateScale: false,
            duration: 0,
          },          
        },
      };
    } // end a chart type

    if (node.chartType == "polar-area") {
      // line bar horizontalBar pie polar-area radar
      config = {
        type: "polarArea",
        data: {
          datasets: [
            {
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
              backgroundColor: [
                node.colors[0],
                node.colors[1],
                node.colors[2],
                node.colors[3],
                node.colors[4],
              ],
              label: "Dataset 1",
            },
          ],
          labels: ["1", "2", "3", "4", "5"],
        },
        options: {
          responsive: true,
          title: {
            display: titleDisplay,
            text: node.label,
          },
          legend: {
            display: legendDisplay,
            position: "top",
          },
          scale: {
            ticks: {
              beginAtZero: true,
            },
            reverse: false,
          },
          animation: {
            animateRotate: false,
            animateScale: false,
            duration: 0,
          },
        },
      };
    } // end a chart type

    if (node.chartType == "radar") {
      // line bar horizontalBar pie polar-area radar
      config = {
        type: "radar",
        data: {
          datasets: [
            {
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
              // backgroundColor: node.colors[0],
              borderColor: node.colors[0],
              label: "1",
              fill: false,
            },
            {
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
              // backgroundColor: node.colors[0],
              borderColor: node.colors[1],
              label: "1",
              fill: false,
            },
            {
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
              // backgroundColor: node.colors[0],
              borderColor: node.colors[2],
              label: "1",
              fill: false,
            },
            {
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
              // backgroundColor: node.colors[0],
              borderColor: node.colors[3],
              label: "1",
              fill: false,
            },
            {
              data: [
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
                randomScalingFactor(ymin, ymax),
              ],
              // backgroundColor: node.colors[0],
              borderColor: node.colors[4],
              label: "1",
              fill: false,
            },
          ],
          labels: ["1", "2", "3", "4", "5"],
        },
        options: {
          responsive: true,
          title: {
            display: titleDisplay,
            text: node.label,
          },
          legend: {
            display: false,
            position: "top",
          },
          animation: {
            animateRotate: false,
            animateScale: false,
            duration: 0,
          },
          spanGaps: false,
          elements: {
            line: {
              tension: 0.000001,
            },
          },
        },
      };
    } // end a chart type

    //end if case
    return config;
  },
  randomScalingFactor: function () {
    let min = min === undefined ? 0 : min;
    let max = max === undefined ? 1 : max;
    let seed = (seed * 9301 + 49297) % 233280;
    var value = min + (seed / 233280) * (max - min);
    return Math.round(value);
  },
};//End JS Object

