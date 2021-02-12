var ui_chart = {
  node: /*html*/ `

        <div
          class="red-ui-palette-node btn-add-node" type="ui_chart"
          style="background-color: rgb(176, 223, 227); height: 40px;width:50%"
        >
          <div class="red-ui-palette-label" dir="">
            Chart
          </div>
          <div
            class="red-ui-palette-icon-container"
            data-palette-icon="icons/node-red-dashboard/ui_chart.png"
          >
            <div
              class="red-ui-palette-icon"
              style='background-image: url("icons/node-red-dashboard/ui_chart.png");'
            ></div>
          </div>
        </div>

    `,
  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"a353dba9.0637","type":"ui_chart","z":"a7b82102.9b8d38","name":"","group":"${groupId}","order":21,"width":0,"height":0,"label":"chart","chartType":"line","legend":"false","xformat":"HH:mm:ss","interpolate":"linear","nodata":"","dot":false,"ymin":"","ymax":"","removeOlder":1,"removeOlderPoints":"","removeOlderUnit":"3600","cutout":0,"useOneColor":false,"useUTC":false,"colors":["#1f77b4","#aec7e8","#ff7f0e","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5"],"useOldStyle":false,"outputs":1,"x":90,"y":440,"wires":[[]]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (newNodeId) {
    return /*html*/ `

<md-card ui-card-size="6x4" layout-align="center center" ng-class="{'nr-dashboard-disabled':me.item.disabled}"
    node-id="${newNodeId}" class="grid-stack-item ng-scope _md layout-align-center-center visible"
    style="margin: 0px; border: 3px solid green; ">
    <div class="grid-stack-item-content nr-dashboard-chart-container" style="width:100%; height:100%;">
        <p class="label nr-dashboard-chart-title ng-binding nr-dashboard-chart-titlel"
            ng-class="{'nr-dashboard-chart-titlel':(me.item.width > 3)}" ng-bind-html="me.item.getLabel()">chart</p>
        <div class="nr-dashboard-chart" ng-class="{'nr-dashboard-chart-nolabel':me.item.getLabel() == ''}"
            ng-swipe-right="$event.stopPropagation();" ng-swipe-left="$event.stopPropagation();">
            <canvas ng-if="me.item.look==='line'"
                class="chart chart-line ng-scope ng-isolate-scope" chart-data="config.data" chart-series="config.series"
                chart-labels="config.labels" chart-options="config.options" chart-dataset-override="config.overrides"
                chart-colors="config.colours"> </canvas>
        </div> 
        <p class="blank-label ng-binding ng-scope" ng-if="config &amp;&amp; config.nodata" style=""> </p>
    </div>
</md-card>

          `;
  },
  edit: function (node) {
    // $(node).find(".label").text($("#node-input-title").val());
  },
  size: function () {
    return {
      width: 4,
      height: 4,
    };
  },
  load: function (node) {},
  loadAll: function (node) {},
};//End JS Object

