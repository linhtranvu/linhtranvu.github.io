var ui_numeric = {

  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"ui_numeric","z":"a7b82102.9b8d38","name":"","label":"numeric","tooltip":"","group":"${groupId}","order":12,"width":3,"height":"1","wrap":false,"passthru":true,"topic":"","format":"{{value}}","min":0,"max":10,"step":1,"x":110,"y":460,"wires":[[]]}]`;
  },

  // CLASS:     grid-stack-item    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (node) {
    return /*html*/ `

<md-card ui-card-size="3x1" flex="" layout="row" layout-align="space-between center"
    class="nr-dashboard-numeric grid-stack-item ng-scope _md layout-align-space-between-center layout-row flex visible"
    ng-class="{'nr-dashboard-disabled':me.item.disabled}" node-id="${node.id}"
    data-gs-width='${node.width}' data-gs-height='${node.height}'
    data-gs-x='${node.xcord}' data-gs-y='${node.ycord}'        
    style="margin: 0px; border: 3px solid green; ">
    ${ui_share.load(node)}
    <p class="label ng-binding" ng-bind-html="me.item.getLabel()">${node.label}</p>
    <div layout="row" layout-align="center center" class=" layout-align-center-center layout-row"> <button
            class=" md-icon-button down-button md-button md-ink-ripple" type="button" ng-transclude=""
            aria-label="numeric" ng-mousedown="me.periodicChange(-me.item.step)" ng-mouseup="me.stopPeriodic()"
            ng-mouseleave="me.stopPeriodic()" style="z-index: 1; padding: 0px; inset: 0px;">
            <ui-icon icon="expand_more" class="ng-scope ng-isolate-scope">
                <!-- ngIf: iconType==='angular-material' -->
                <ng-md-icon ng-if="iconType==='angular-material'" icon="expand_more" class="ng-scope"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                    </svg></ng-md-icon>
            </ui-icon>
        </button>
        <center>
            <!-- ngIf: (me.item.ed === false) -->
            <p ng-if="(me.item.ed === false)" class="value ng-binding ng-scope" style="min-width:19px;"
                ng-bind-html="me.item.getText()">0</p><!-- end ngIf: (me.item.ed === false) -->
            <!-- ngIf: (me.item.ed === true) -->
        </center> <button class="md-icon-button up-button md-button md-ink-ripple" type="button" ng-transclude=""
            aria-label="numeric" ng-mousedown="me.periodicChange(me.item.step)" ng-mouseup="me.stopPeriodic()"
            ng-mouseleave="me.stopPeriodic()" style="z-index:1">
            <ui-icon icon="expand_less" class="ng-scope ng-isolate-scope">
                <!-- ngIf: iconType==='angular-material' -->
                <ng-md-icon ng-if="iconType==='angular-material'" icon="expand_less" class="ng-scope"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
                    </svg></ng-md-icon><!-- end ngIf: iconType==='angular-material' -->
            </ui-icon>
        </button>
    </div>
</md-card>

          `;
  },
  edit: function (node) {
    if ($("#node-input-label").val() !== "") {
      if ($(node).find(".label").length > 0) {
        $(node).find(".label").removeClass("ng-hide").show();
        $(node).find(".label").text($("#node-input-label").val());
      } else {
        $(node).prepend(
          `<p class="label ng-binding" ng-bind-html="me.item.getLabel()">${$(
            "#node-input-label"
          ).val()}</p>`
        );
      }
    } else {
      $(node).find(".label").addClass("ng-hide").hide();
    }
    ui_share.edit()
  },
  size: function () {
    return {
      width: 3,
      height: 1,
    };
  },
  load: function (node) {
  
  },
  loadAll: function (node) {},
};//End JS Object

