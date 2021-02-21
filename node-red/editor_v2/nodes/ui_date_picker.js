var ui_date_picker = {

  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"ui_date_picker","z":"a7b82102.9b8d38","name":"","label":"date","group":"${groupId}","order":23,"width":"4","height":1,"passthru":true,"topic":"","x":100,"y":580,"wires":[[]]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (node) {
    return /*html*/ `

<md-card ui-card-size="4x1" layout="row" 
    class="grid-stack-item nr-dashboard-date-picker visible"
    ng-class="{'nr-dashboard-disabled':me.item.disabled}" node-id="${node.id}"
    data-gs-width='${node.width}' data-gs-height='${node.height}'
    data-gs-x='${node.xcord}' data-gs-y='${node.ycord}'     
    style="border: 3px solid green;margin: 0px; ">
    ${ui_share.load(node)}
    <md-input-container style='padding:0px;margin:0px' flex="" layout="row"
        class=" md-auto-horizontal-margin md-input-has-placeholder _md-datepicker-floating-label _md-datepicker-has-calendar-icon layout-row flex">
        <!-- ngIf: me.item.label -->
        <p class="nr-dashboard-date-picker-label ng-binding ng-scope" ng-if="me.item.label"
            ng-bind-html="me.item.getLabel()">date</p>
        <md-datepicker
            class="nr-dashboard-date-picker ng-pristine ng-untouched ng-valid _md-datepicker-has-triangle-icon ng-isolate-scope"
            md-placeholder="date" md-open-on-focus="" ng-model="me.item.ddd" ng-change="me.setDate()" tabindex="-1"
            aria-owns="md-date-pane-1" type="date" aria-label="date" aria-invalid="false"><div
                class="md-datepicker-button md-icon-button md-button md-ink-ripple" type="button" ng-transclude=""
                tabindex="-1" aria-hidden="true" ng-click="ctrl.openCalendarPane($event)">
                <md-icon class="md-datepicker-calendar-icon ng-scope" aria-label="md-calendar"
                    md-svg-src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgM2gtMVYxaC0ydjJIOFYxSDZ2Mkg1Yy0xLjExIDAtMS45OS45LTEuOTkgMkwzIDE5YzAgMS4xLjg5IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY4aDE0djExek03IDEwaDV2NUg3eiIvPjwvc3ZnPg=="
                    role="img"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"
                        fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                        <path
                            d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z">
                        </path>
                    </svg></md-icon>
            </div>
            <div class="md-datepicker-input-container" ng-class="{'md-datepicker-focused': ctrl.isFocused}"><input
                    aria-label="" class="md-datepicker-input md-input" aria-haspopup="dialog"
                    ng-focus="ctrl.setFocused(true)" ng-blur="ctrl.setFocused(false)" id="input_2" placeholder="date">
                <div class="md-datepicker-triangle-button md-icon-button md-button" type="button" ng-transclude=""
                    md-no-ink="" ng-click="ctrl.openCalendarPane($event)" aria-label="Open calendar">
                    <div class="md-datepicker-expand-triangle ng-scope"></div>
                </div></div>
            <div class="md-datepicker-calendar-pane md-whiteframe-z1" id="md-date-pane-1">
                <div class="md-datepicker-input-mask">
                    <div class="md-datepicker-input-mask-opaque"></div>
                </div>
                <div class="md-datepicker-calendar">
                </div>
            </div>
        </md-datepicker>
        <div>
            <div class="md-errors-spacer"></div>
        </div>
    </md-input-container>
</md-card>

          `;
  },

  // Label          $("#node-input-label").val()

  edit: function (node) {
    if ($("#node-input-label").val() !== "") {
      if ($(node).find(".nr-dashboard-date-picker-label").length > 0) {
        $(node).find(".nr-dashboard-date-picker-label").removeClass("ng-hide").show();
        $(node)
          .find(".nr-dashboard-date-picker-label")
          .text($("#node-input-label").val());
      } else {
        $(node)
          .find("md-input-container")
          .prepend(
            `   <p class="nr-dashboard-date-picker-label ng-binding ng-scope" ng-if="me.item.label"
            ng-bind-html="me.item.getLabel()">${$(
              "#node-input-label"
            ).val()}</p> `
          );
      }
    } else {
      $(node).find(".nr-dashboard-date-picker-label").hide();
    }
    ui_share.edit()
  },
  size: function () {
    return {
      width: 4,
      height: 1,
    };
  },
  load: function (node) {
   
  },
  loadAll: function (node) {},
};//End JS Object

