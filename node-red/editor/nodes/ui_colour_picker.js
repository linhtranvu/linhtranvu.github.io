var ui_colour_picker = {
  node: /*html*/ `

        <div
          class="red-ui-palette-node btn-add-node" type="ui_colour_picker"
          style="background-color: rgb(176, 223, 227); height: 40px;width:50%"
        >
          <div class="red-ui-palette-label" dir="">
            Colour picker
          </div>
          <div
            class="red-ui-palette-icon-container"
            data-palette-icon="icons/node-red-dashboard/ui_colour_picker.png"
          >
            <div
              class="red-ui-palette-icon"
              style='background-image: url("icons/node-red-dashboard/ui_colour_picker.png");'
            ></div>
          </div>
        </div>

    `,
  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"3bf71c55.2380dc","type":"ui_colour_picker","z":"a7b82102.9b8d38","name":"","label":"Color","group":"${groupId}","format":"hex","outformat":"string","showSwatch":true,"showPicker":false,"showValue":false,"showHue":false,"showAlpha":false,"showLightness":true,"square":"false","dynOutput":"false","order":24,"width":"4","height":1,"passthru":true,"topic":"","x":100,"y":640,"wires":[[]]}]`;
  },

  // CLASS:     grid-stack-item md-card-grid        grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (newNodeId) {
    return /*html*/ `

<md-card ui-card-size="4x1" flex="" layout="row" layout-align="space-between center"
    class="grid-stack-item md-card-grid nr-dashboard-colour-picker ng-scope _md layout-align-space-between-center layout-row flex visible"
    ng-class="{'nr-dashboard-disabled':me.item.disabled}" node-id="${newNodeId}"
    style="0px; border: 3px solid green;">
    <p class='grid-stack-item-content'> <span ng-hide="(me.item.width < 2) || (me.item.width < 5 &amp;&amp; (me.item.inline || me.item.textValue))"
            class="label ng-binding" ng-bind-html="me.item.getLabel()" aria-hidden="false">Color</span> </p>
    <color-picker style='padding: 0px; inset: 0px;' ng-model="me.item.value" aria-label="Color" ng-attr-options="me.item.options"
        ng-attr-event-api="me.item.eventapi" ng-keypress="me.item.key($event)"
        ng-swipe-right="$event.stopPropagation();" ng-swipe-left="$event.stopPropagation();"
        class="ng-pristine ng-untouched ng-isolate-scope ng-empty ng-invalid ng-invalid-color" options="me.item.options"
        event-api="me.item.eventapi" aria-invalid="true">
        <div class="color-picker-wrapper color-picker-swatch-only color-picker-closed"
            ng-class="{'color-picker-disabled': AngularColorPickerController.options.disabled,'color-picker-swatch-only': AngularColorPickerController.options.swatchOnly,'color-picker-open': AngularColorPickerController.is_open,'color-picker-closed': !AngularColorPickerController.is_open,'color-picker-horizontal': AngularColorPickerController.options.horizontal,}"
            style="">
            <div class="color-picker-input-wrapper input-group"
                ng-class="{'input-group': AngularColorPickerController.options.swatchBootstrap &amp;&amp; AngularColorPickerController.options.swatch}">
                <!-- ngIf: AngularColorPickerController.options.swatchPos === 'left' --><input
                    ng-attr-id="{{AngularColorPickerController.options.id}}"
                    ng-attr-name="{{AngularColorPickerController.options.name}}" class="color-picker-input  ng-empty"
                    type="text" ng-model="AngularColorPickerController.internalNgModel"
                    ng-model-options="AngularColorPickerController.ngModelOptions"
                    ng-readonly="AngularColorPickerController.options.swatchOnly"
                    ng-disabled="AngularColorPickerController.options.disabled"
                    ng-change="AngularColorPickerController.onChange($event)" size="7"
                    ng-class="{'color-picker-input-swatch': AngularColorPickerController.options.swatch &amp;&amp; !AngularColorPickerController.options.swatchOnly &amp;&amp; AngularColorPickerController.options.swatchPos === 'left'}"
                    placeholder="" ng-required="AngularColorPickerController.options.required" readonly="readOnly"
                    aria-invalid="false"><!-- ngIf: AngularColorPickerController.options.swatchPos === 'right' --><span
                    ng-if="AngularColorPickerController.options.swatchPos === 'right'"
                    class="color-picker-swatch ng-scope color-picker-swatch-right input-group-addon"
                    ng-click="AngularColorPickerController.onSwatchClick($event)"
                    ng-show="AngularColorPickerController.options.swatch"
                    ng-class="{'color-picker-swatch-left': AngularColorPickerController.options.swatchPos !== 'right', 'color-picker-swatch-right': AngularColorPickerController.options.swatchPos === 'right', 'input-group-addon': AngularColorPickerController.options.swatchBootstrap}"
                    role="button" tabindex="0" aria-hidden="false"></span>
                <!-- end ngIf: AngularColorPickerController.options.swatchPos === 'right' -->
            </div>
            <div class="color-picker-panel color-picker-panel-bottom color-picker-panel-right color-picker-panel-round color-picker-show-lightness"
                ng-class="{'color-picker-panel-top color-picker-panel-right': AngularColorPickerController.options.pos === 'top right','color-picker-panel-top color-picker-panel-left': AngularColorPickerController.options.pos === 'top left','color-picker-panel-bottom color-picker-panel-right': AngularColorPickerController.options.pos === 'bottom right','color-picker-panel-bottom color-picker-panel-left': AngularColorPickerController.options.pos === 'bottom left','color-picker-panel-round': AngularColorPickerController.options.round,'color-picker-show-hue': AngularColorPickerController.options.hue,'color-picker-show-saturation': AngularColorPickerController.options.saturation,'color-picker-show-lightness': AngularColorPickerController.options.lightness,'color-picker-show-alpha': AngularColorPickerController.options.alpha &amp;&amp; AngularColorPickerController.options.format !== 'hex','color-picker-show-inline': AngularColorPickerController.options.inline,}">
                <div class="color-picker-grid-wrapper">
                    <div class="color-picker-row">
                        <div class="color-picker-grid">
                            <div class="color-picker-overlay"></div>
                            <div class="color-picker-grid-inner"></div>
                            <div class="color-picker-picker">
                                <div></div>
                            </div>
                        </div>
                        <div class="color-picker-hue ng-hide" ng-show="AngularColorPickerController.options.hue"
                            aria-hidden="true">
                            <div class="color-picker-overlay"></div>
                            <div class="color-picker-slider" style="left: 0px; top: 150px;"></div>
                        </div>
                        <div class="color-picker-saturation ng-hide"
                            ng-show="AngularColorPickerController.options.saturation" aria-hidden="true">
                            <div class="color-picker-overlay"></div>
                            <div class="color-picker-slider"></div>
                        </div>
                        <div class="color-picker-lightness" ng-show="AngularColorPickerController.options.lightness"
                            aria-hidden="false">
                            <div class="color-picker-overlay"></div>
                            <div class="color-picker-slider"></div>
                        </div>
                        <div class="color-picker-opacity ng-hide"
                            ng-show="AngularColorPickerController.options.alpha &amp;&amp; AngularColorPickerController.options.format !== 'hex'"
                            aria-hidden="true">
                            <div class="color-picker-overlay"></div>
                            <div class="color-picker-slider"></div>
                        </div>
                    </div>
                </div>
                <div class="color-picker-actions"><button type="button"
                        class="color-picker-action color-picker-action-clear ng-binding ng-hide" tabindex="-1"
                        ng-class="AngularColorPickerController.options.clear.class"
                        ng-show="AngularColorPickerController.options.clear.show"
                        ng-click="AngularColorPickerController.api.clear($event)"
                        aria-hidden="true">Clear</button><button type="button"
                        class="color-picker-action color-picker-action-reset ng-binding ng-hide" tabindex="-1"
                        ng-class="AngularColorPickerController.options.reset.class"
                        ng-show="AngularColorPickerController.options.reset.show"
                        ng-click="AngularColorPickerController.api.reset($event)"
                        aria-hidden="true">Reset</button><button type="button"
                        class="color-picker-action color-picker-action-close ng-binding ng-hide" tabindex="-1"
                        ng-class="AngularColorPickerController.options.close.class"
                        ng-show="AngularColorPickerController.options.close.show"
                        ng-click="AngularColorPickerController.api.close($event)" aria-hidden="true">Close</button>
                </div>
            </div>
        </div>
    </color-picker>
</md-card>

          `;
  },

  // Label          ${$("#node-input-label").val()}

  edit: function (node) {
    if ($("#node-input-label").val() !== "") {
      if ($(node).find(".label").length > 0) {
        $(node).find(".label").removeClass("ng-hide");
        $(node).find(".label").text($("#node-input-label").val());
      } else {
        $(node)
          .find("md-input-container")
          .prepend(
            `<p> <span ng-hide="(me.item.width < 2) || (me.item.width < 5 &amp;&amp; (me.item.inline || me.item.textValue))"
            class="label ng-binding" ng-bind-html="me.item.getLabel()" aria-hidden="false">${$(
              "#node-input-label"
            ).val()}</span> </p> `
          );
      }
    } else {
      $(node).find(".label").addClass("ng-hide");
    }
  },
  size: function () {
    return {
      width: 3,
      height: 1,
    };
  },
  load: function (node) {},
  loadAll: function (node) {},
};//End JS Object

