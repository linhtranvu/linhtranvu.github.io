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
    return `[{"id":"182e1d16.4a00bb","type":"ui_gauge","z":"a7b82102.9b8d38","name":"","group":"${groupId}","order":20,"width":0,"height":0,"gtype":"gage","title":"gauge","label":"units","format":"{{value}}","min":0,"max":10,"colors":["#00b500","#e6e600","#ca3838"],"seg1":"","seg2":"","x":90,"y":380,"wires":[]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (newNodeId) {
    return /*html*/ `

<md-card ui-card-size="6x4" layout-align="center center" ng-class="{'nr-dashboard-disabled':me.item.disabled}"
    node-id="${newNodeId}" class="grid-stack-item ng-scope _md layout-align-center-center visible"
    style="margin: 0px; border: 3px solid green;;">
    <p class="label nr-dashboard-gauge-title ng-binding nr-dashboard-gauge-titlel"
        ng-class="{'nr-dashboard-gauge-titlel':(me.item.width > 3)}" ng-bind-html="me.item.getLabel()"
        ng-hide="(me.item.height <= 2)" aria-hidden="false">gauge</p>
    <div id="gauge_517" style="" class="grid-stack-item-content nr-dashboard-gauge"><svg height="100%" version="1.1" width="100%"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            style="overflow: hidden; position: relative;">
            <desc>Created with Raphaël 2.2.0</desc>
            <defs>
                <filter id="inner-shadow-gauge_517">
                    <feOffset dx="0" dy="3"></feOffset>
                    <feGaussianBlur result="offset-blur" stdDeviation="5"></feGaussianBlur>
                    <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"></feComposite>
                    <feFlood flood-color="black" flood-opacity="0.2" result="color"></feFlood>
                    <feComposite operator="in" in="color" in2="inverse" result="shadow"></feComposite>
                    <feComposite operator="over" in="shadow" in2="SourceGraphic"></feComposite>
                </filter>
            </defs>
            <path style="" fill="#7f7f7f" stroke="none"
                d="M68.4,132.24L27.36,132.24A109.44000000000001,109.44000000000001,0,0,1,246.24,132.24L205.20000000000002,132.24A68.4,68.4,0,0,0,68.4,132.24Z"
                fill-opacity="0.5"></path>
            <path style="" fill="#00b500" stroke="none"
                d="M68.4,132.24L27.36,132.24A109.44000000000001,109.44000000000001,0,0,1,27.36,132.24L68.4,132.24A68.4,68.4,0,0,0,68.4,132.24Z">
            </path>
            <path style="stroke-linecap: square;" fill="#111111" stroke="none"
                d="M86.64000000000001,129.50400000000002L86.64000000000001,134.976L17.784,132.24Z" stroke-width="0"
                stroke-linecap="square"></path><text
                style="text-anchor: middle; font-family: inherit; font-size: 21px; font-weight: bold; fill-opacity: 1;"
                x="136.8" y="130.09411764705885" text-anchor="middle" font-family="inherit" font-size="21px"
                stroke="none" fill="#010101" font-weight="bold" fill-opacity="1">
                <tspan dy="0">0</tspan>
            </text><text
                style="text-anchor: middle; font-family: Arial; font-size: 8px; font-weight: normal; fill-opacity: 1;"
                x="136.8" y="145.61719457013578" text-anchor="middle" font-family="Arial" font-size="8px" stroke="none"
                fill="#b3b3b3" font-weight="normal" fill-opacity="1">
                <tspan dy="2.50000707013578">units</tspan>
            </text><text
                style="text-anchor: middle; font-family: Arial; font-size: 8px; font-weight: normal; fill-opacity: 1;"
                x="47.88" y="145.61719457013578" text-anchor="middle" font-family="Arial" font-size="8px" stroke="none"
                fill="#b3b3b3" font-weight="normal" fill-opacity="1">
                <tspan dy="0">0</tspan>
            </text><text
                style="text-anchor: middle; font-family: Arial; font-size: 10px; font-weight: normal; fill-opacity: 1;"
                x="225.72" y="145.61719457013578" text-anchor="middle" font-family="Arial" font-size="10px"
                stroke="none" fill="#b3b3b3" font-weight="normal" fill-opacity="1">
                <tspan dy="0">10</tspan>
            </text>
        </svg></div>
</md-card>

          `;
  },
  edit: function (node) {

    $(node).find(".label").text($("#node-input-title").val());

  },
};//End JS Object

