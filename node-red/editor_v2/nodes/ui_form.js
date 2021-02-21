var ui_form = {

  //        ${groupId}
  createNode: function (groupId) {
    return `[{"id":"${Math.random().toString(36).substr(2, 15)}","type":"ui_form","z":"a7b82102.9b8d38","name":"","label":"","group":"${groupId}","order":29,"width":0,"height":0,"options":[{"label":"","value":"","type":"text","required":true,"rows":null}],"formValue":{"":""},"payload":"","submit":"submit","cancel":"cancel","topic":"","x":300,"y":520,"wires":[[]]}]`;
  },

  // CLASS:     grid-stack-item md-card-grid    grid-stack-item-content
  // VAR:       ${newNodeId}
  // CSS:       item:  margin: 0px; border: 3px solid green;        item-content:   z-index: 1; padding: 0px; inset: 0px;
  createHTML: function (node) {
    return /*html*/ `

<md-card ui-card-size="6x2" layout="row" layout-align="space-between center"
    class="grid-stack-item md-card-grid nr-dashboard-form ng-scope _md layout-align-space-between-center layout-row visible"
    node-id="${node.id}"  
    data-gs-width='${node.width}' data-gs-height='${node.height}'
    data-gs-x='${node.xcord}' data-gs-y='${node.ycord}'     
    style="margin: 0px; border: 3px solid green; ">
    ${ui_share.load(node)}
    ${this.loadForm(node)}
</md-card>
          `;
  },

  // Label          $("#node-input-label").val()

  edit: function (node) {

    var vm = this
    
    var checkExist = setInterval(function () {				
      if ($("#node-dialog-ok-save").length == 0) {
        clearInterval(checkExist);		        
        $(node).find('form').remove()
        $(node).append(vm.loadForm(RED.search.search($(node).attr('node-id'))[0].node))
      } //end if check existed
    }, 200); // end chek exist

    ui_share.edit()
  }, //end function edit
  size: function () {
    return {
      width: 4,
      height: 4,
    };
  },
  load: function (node) {
 
  },
  loadAll: function (node) {},
  loadForm: function(node){

    var html = /*html*/ `
    <form name="form" ng-submit="me.submit(form)" style="margin-top: 20.279999999999998px;" class="ng-pristine ng-invalid ng-invalid-required ng-valid-step ng-valid-email">`

    for (i=0;i<node.options.length;i++){

      html += this.drawFormNode(node.options[i],node)

    }

    var cancelStyle = node.cancel == '' ? 'display:none' : ''

    html += /*html*/ `
      <div class="form-control form-control-no-label" ng-class="{'form-control-single':me.item.cancel == '','form-control-no-label':me.item.label == ''}" style="margin-top: 10.14px;">
          <button class="md-raised nr-dashboard-form-button md-button md-ink-ripple" type="submit" ng-transclude="" style="height: 44px; line-height: 44px;">
              ${node.submit}
              <div class="md-ripple-container" style=""></div>
          </button>
          <!---->
          <button style='${cancelStyle}' class="md-raised nr-dashboard-form-button md-button md-ink-ripple" type="button" ng-transclude="" ng-if="me.item.cancel != ''" style="height: 44px; line-height: 44px;" ng-click="me.reset()">${node.cancel}</button>
          <!---->
      </div>
    </form>    
    `
    return html
  },

  drawFormNode: function(node,form){

    splitClass = form.splitLayout == true ? 'formElementSplit ' : ''

    switch(node.type){
      case 'text':
      case 'number':
      case 'email':
      case 'password':
        html =  /*html*/ `
    <!---->
    <div class="formElement ${splitClass} layout-gt-sm-row" ng-class="{'formElementSplit':(me.item.splitLayout)}" layout-gt-sm="row" ng-repeat="opt in me.item.options track by $index">
        <md-input-container class="md-block md-auto-horizontal-margin flex" style="height: 50.699999999999996px;" flex="">
            <!---->
            <label ng-if="(opt.type=='text' || opt.type=='number' || opt.type=='email' || opt.type=='multiline' || opt.type=='password' || opt.type=='date') &amp;&amp; opt.label" class="md-required" for="input_173">${node.label}</label>
            <!---->
            <!---->
            <input
                ng-if="opt.type=='text' || opt.type=='email' || opt.type=='password'"
                type="text"
                class="ng-pristine ng-untouched md-input ng-empty ng-invalid ng-invalid-required"
                id="input_173"
                required="required"
                aria-invalid="true"
            />
            <div class="md-errors-spacer"></div>
            <!---->
            <!---->
            <!---->
            <!---->
            <!---->
            <!---->
            <!---->
        </md-input-container>
        <!-- <md-datepicker ng-if="opt.type=='date'" ></md-datepicker> -->
    </div>
    <!---->        
        `
        break
      case 'multiline':
        html = /*html*/ `
    <div class="formElement  ${splitClass}  layout-gt-sm-row" ng-class="{'formElementSplit':(me.item.splitLayout)}" layout-gt-sm="row" ng-repeat="opt in me.item.options track by $index">
        <md-input-container class="md-block md-auto-horizontal-margin flex" style="height: 152.1px;" flex="">
            <!---->
            <label ng-if="(opt.type=='text' || opt.type=='number' || opt.type=='email' || opt.type=='multiline' || opt.type=='password' || opt.type=='date') &amp;&amp; opt.label" for="input_174">${node.label}</label>
            <!---->
            <!---->
            <!---->
            <!---->
            <!---->
            <!---->
            <div class="md-resize-wrapper">
                <textarea
                    ng-if="opt.type=='multiline'"
                    style="height: ${globalDashboardNode.site.sizes.sy*node.rows}"
                    class="ng-pristine ng-untouched ng-valid md-input ng-empty ng-valid-required"
                    id="input_174"
                    aria-invalid="false"
                ></textarea>
                <div class="md-resize-handle" style="touch-action: pan-x;"></div>
            </div>
            <div class="md-errors-spacer"></div>
            <!---->
            <!---->
            <!---->
        </md-input-container>
        <!-- <md-datepicker ng-if="opt.type=='date'" ></md-datepicker> -->
    </div>        
        `
        break         
      case 'checkbox':
        html = /*html*/ `
    <!---->
    <div class="formElement  ${splitClass}  layout-gt-sm-row" ng-class="{'formElementSplit':(me.item.splitLayout)}" layout-gt-sm="row" ng-repeat="opt in me.item.options track by $index">
        <md-input-container class="md-block md-auto-horizontal-margin flex" style="height: 50.699999999999996px;" flex="">
            <md-checkbox
                ng-if="opt.type=='checkbox'"
                md-no-ink=""
                aria-label="Checkbox No Ink"
                
                tabindex="0"
                type="checkbox"
                role="checkbox"
                class="md-auto-horizontal-margin ng-pristine ng-untouched ng-valid ng-empty"
                aria-checked="false"
                aria-invalid="false"
            >
                <div class="md-container" md-ink-ripple="" md-ink-ripple-checkbox=""><div class="md-icon"></div></div>
                <div ng-transclude="" class="md-label">${node.label}</div>
            </md-checkbox>
            <!---->
        </md-input-container>
        <!-- <md-datepicker ng-if="opt.type=='date'" ></md-datepicker> -->
    </div>        
        `
        break  
      case 'switch':
        html = /*html*/ `
  <!---->
    <div class="formElement  ${splitClass}  layout-gt-sm-row" ng-class="{'formElementSplit':(me.item.splitLayout)}" layout-gt-sm="row" ng-repeat="opt in me.item.options track by $index">
        <md-input-container class="md-block md-auto-horizontal-margin flex" style="height: 50.699999999999996px;" flex="">
            <!---->
            <!---->
            <!---->
            <!---->
            <!---->
            <!---->
            <!---->
            <md-switch
                ng-if="opt.type=='switch'"
                md-no-ink=""
                
                tabindex="0"
                type="checkbox"
                role="checkbox"
                class="md-auto-horizontal-margin ng-pristine ng-untouched ng-valid ng-empty"
                aria-checked="false"
                aria-invalid="false"
                aria-label="7"
            >
                <div class="md-container" style="touch-action: pan-x;">
                    <div class="md-bar"></div>
                    <div class="md-thumb-container"><div class="md-thumb" md-ink-ripple="" md-ink-ripple-checkbox=""></div></div>
                </div>
                <div ng-transclude="" class="md-label">${node.label}</div>
            </md-switch>
            <!---->
            <!---->
        </md-input-container>
        <!-- <md-datepicker ng-if="opt.type=='date'" ></md-datepicker> -->
    </div>        
        `      
        break  
      case 'date':
        html = /*html*/ `
    <!---->
    <div class="formElement  ${splitClass}  layout-gt-sm-row" ng-class="{'formElementSplit':(me.item.splitLayout)}" layout-gt-sm="row" ng-repeat="opt in me.item.options track by $index">
        <md-input-container class="md-block md-auto-horizontal-margin md-input-has-placeholder flex" style="height: 50.699999999999996px;" flex="">
            <!---->
            <label ng-if="(opt.type=='text' || opt.type=='number' || opt.type=='email' || opt.type=='multiline' || opt.type=='password' || opt.type=='date') &amp;&amp; opt.label" for="input_178">${node.label}</label>
            <!---->
            <!---->
            <!---->
            <input
                ng-if="opt.type=='date'"
                type="date"
                placeholder="yyyy-mm-dd"
                class="ng-pristine ng-untouched ng-valid md-input ng-empty ng-valid-required"
                id="input_178"
                aria-invalid="false"
            />
            <div class="md-errors-spacer"></div>
            <!---->
            <!---->
            <!---->
            <!---->
            <!---->
            <!---->
        </md-input-container>
        <!-- <md-datepicker ng-if="opt.type=='date'" ></md-datepicker> -->
    </div>        
        `
        break  
      case 'time':
        html = /*html*/ `
  <!---->
    <div class="formElement  ${splitClass}  layout-gt-sm-row" ng-class="{'formElementSplit':(me.item.splitLayout)}" layout-gt-sm="row" ng-repeat="opt in me.item.options track by $index">
        <md-input-container class="md-block md-auto-horizontal-margin md-icon-float flex" style="height: 50.699999999999996px;" flex="">
            <label  tabindex="-1" aria-hidden="true" role="button" for="input_179">HH:MM</label>
            <input
                ng-if="opt.type=='time'"
                type="time"  
                class="ng-pristine ng-untouched ng-valid md-input ng-empty ng-valid-required"
                id="input_179"
                aria-invalid="false"
            />
            <div class="md-errors-spacer"></div>
            <!---->
            <!---->
            <!---->
            <!---->
            <!---->
        </md-input-container>
        <!-- <md-datepicker ng-if="opt.type=='date'" ></md-datepicker> -->
    </div>
    <!---->        
        `
        break                                                                         
    }

    return html

  }
};//End JS Object

