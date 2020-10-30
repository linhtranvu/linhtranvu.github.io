//Add HTML for iframe Dashboard

function addIframeHtml() {

    if ($("#iframe_dahsboard").length) {
        $('#iframe_dahsboard').toggle()
        $('.editor-mode').hide();
        $('.no-editor').show();
    } else {
        // alert(params_dashboard.url);
        myAdminHtml = /*html*/ `
      <iframe id = "iframe_dahsboard"
      src = "${params_dashboard.url}"
      style = "z-index:1200;position: fixed;top: 40px;left: 0;background-color: white"
      width = "100%"
      height = "100%" > No iframe support </iframe>
      `
        $("#btn-editor").html("ON/OFF");
        $('.editor-mode').show();
        $('.no-editor').hide();
        $("html").append(myAdminHtml);
        $('#iframe_dahsboard').on('load', function () {
            loadDashboarIframe(2000);
        });
    }

}

//Login
function login(url, username, password) {


    var element = document.getElementById('nr-dashboard');

    if (typeof (element) != 'undefined' && element != null) { //If already login


        var checkExist = setInterval(function () {
                //IF DASHBOARD FOUND, INJECT EDITOR
                loadDashboarIframe(2000);

            },
            500); // check every 500ms


    } else { //Process to login

        var str = '<iframe id="MyIFrame" width="100%" height="100%"></iframe>'
        document.body.insertAdjacentHTML('beforeend', str);

        var iframeURL = url;
        var iframeID = 'MyIFrame';

        function loadIframe() {
            //pre-authenticate
            var req = new XMLHttpRequest();
            req.open("POST", iframeURL, false, username, password); //use POST to safely send combination
            req.send(null); //here you can pass extra parameters through

            //setiFrame's SRC attribute
            var iFrameWin = document.getElementById(iframeID);
            iFrameWin.src = iframeURL + "?extraParameters=true";
        }

        //onload, call loadIframe() function
        loadIframe();

    }


}

//Load iframeDashboard

function loadDashboarIframe(interval) {

    var checkExist = setInterval(function () {

            var iframe = $("#iframe_dahsboard").contents()
            var attr = iframe.find('md-card').attr('ui-card-position');
            //DASHBOARD UI FOUND
            if (iframe.find('md-card').length && (typeof attr !== typeof undefined && attr !== false)) {

                // alert('To use this feature. Node-RED 1.1.3 above required. For dashboard: Need to pull latest `node-red-dashboard` source code and copy the content of pull folder to replace code in module node-red-dashboard (mean `dist` replace `dist` and other files). @dceejay are working to implement some features for editor and not yet in NPM ')
                clearInterval(checkExist);


                iframe.find("body").removeAttr("ng-app")
                $("#iframe_dahsboard").contents().find("head").append($('<link rel="stylesheet" type="text/css" />').attr('href', 'http://localhost/learn/gridstack064/gridstack.min.css'));
                $("#iframe_dahsboard").contents().find("head").append($('<link rel="stylesheet" type="text/css" />').attr('href', 'http://localhost/learn/gridstack064/gridstack-extra.min.css'));
                $("#iframe_dahsboard").contents().find("head").append($('<link rel="stylesheet" type="text/css" />').attr('href', 'http://localhost/learn/gridstack.css'));

                //Add Save button
                let node_id = iframe.find('.select-tab').attr('node-id').split('.')
                $('.container_btn_save_layout').html( /*html*/ `<button class="btn-save-layout ui-button ui-widget ui-corner-all" style="color:white;background-color: #21ba45" onclick='layout_save()' node-id='${node_id[0]}-${node_id[1]}' ><b>Save</b></button>`)


                //Change Button to DIV to prevent click action

                iframe.find('ui-card-panel').find("button").each(function () {
                    let node_id = $(this).closest('md-card').attr('node-id')
                    // let btn_style = $(this).attr('style')
                    $(this).parent().append(`<div class='md-button' style='${$(this).attr('style')}' node-id=${node_id}></div>`)
                    $(this).children().appendTo($(this).parent().find(`div[node-id='${node_id}']`))
                    $(this).remove()
                });

                //Processing md-card

                $("#iframe_dahsboard").contents().find("md-card").each(function () {

                    $(this).addClass("grid-stack-item")
                    $(this).children().addClass("grid-stack-item-content").css('inset', 0)

                    $(this).find('input').attr('disabled', 'disabled')

                    //Calculate Width and Height
                    let ui_size = $(this).attr("ui-card-size").split("x");
                    $(this).attr("data-gs-width", ui_size[0])
                    $(this).attr("data-gs-height", ui_size[1])

                    //Calculate X and Y
                    let blockWidth = 54;

                    // let xPostion = parseInt($(this).css('left'), 10) / blockWidth
                    // let yPosition = parseInt($(this).css('top'), 10) / blockWidth
                    // $(this).attr("data-gs-x", xPostion)
                    // $(this).attr("data-gs-y", yPosition)

                    // console.log($(this).css('top'))

                    let ui_position = $(this).attr("ui-card-position").split("x");
                    $(this).attr("data-gs-x", ui_position[0] / blockWidth)
                    $(this).attr("data-gs-y", ui_position[1] / blockWidth)




                    //These two line in bottom of md-card processing, nothing is allowed below


                    if ($(this).children().length == 0) { //Remove empty md-card
                        $(this).remove();
                    }

                }) //end processing md-card

                //* Move all md-card to new DIV under ui-card-panel. Must be done after processing md-card and element
                $("#iframe_dahsboard").contents().find("ui-card-panel").append(
                    /*html*/
                    `
          <div div id="grid0" class="grid-stack grid-stack-6" 
              style="width: 324px; background-size: 16.6667% 54px;">
          </div>        
        `)

                setTimeout(() => {
                    $("#iframe_dahsboard").contents().find("ui-card-panel").each(function () {
                        $(this).find('md-card').appendTo($(this).find('.grid-stack'))
                        setTimeout(() => {
                            //These processing MUST be here to force remove all style of md-card
                            $("#iframe_dahsboard").contents().find('.nr-dashboard-cardcontainer').remove()
                            $("#iframe_dahsboard").contents().find('md-card').removeAttr('style').css({
                                margin: '0px',
                                border: '3px solid green'
                            })
                        }, 100); //Wait 0.1s for to remove old container             
                    })
                }, 100); //Wait 0.1s for grid-stack initialize  


                //Apply Grid Event

                setTimeout(() => {
                    iframe.find('.grid-stack').gridstack({
                        cellHeight: 54,
                        verticalMargin: 1,
                        float: true,
                        alwaysShowResizeHandle: true,
                        disableOneColumnMode: true,
                        acceptWidgets: true
                    })
                }, 300);



                //FINISH GRID STACK INITIALIZE


                $("#iframe_dahsboard").contents().find("md-card").click(function (event) {
                    event.preventDefault()
                    /*
                    let labelName = $(this).find("label").html();
                    console.log(labelName);
                    if (labelName == undefined) {
                      labelName = $(this).find(".label").html();
                    }
                    RED.actions.invoke("core:search");
                    $(".red-ui-searchBox-input").val(labelName)

                    // RED.actions.invoke("core:edit-selected-node");
                    $("#red-ui-search").css("z-index","9999");

                    var e = $.Event("keydown");
                    e.which = 13; //choose the one you want
                    e.keyCode = 13;
                    $(".red-ui-searchBox-input").trigger(e);
                    $(".red-ui-searchBox-form").submit();
                    */

                    // let searchNode = RED.search.search($(this).attr("node-id"));
                    // RED.editor.edit(searchNode[0].node);
                    // setEditPanelLayout(1);

                }) //End handle click on UI node


                $("#iframe_dahsboard").contents().find("ui-card-panel").css("border", "1px solid red")


            } //end if check existed

        },
        500); // check every 500ms	   editor-button-afd9c0f1-b47828
}

//Save layout

function layout_save() {

    var node_id = $('.btn-save-layout').attr('node-id')
    $('.editor-button-' + node_id).click()

    var checkExist = setInterval(function () {

            if ($(".grid-stack").length) {
                clearInterval(checkExist);


                $("#iframe_dahsboard").contents().find("md-card").each(function () {

                    let currentItem = $(".grid-stack-item[data-gs-id='" + $(this).attr('node-id') + "']")

                    let currentItemNodeData = currentItem.data('_gridstack_node');

                    currentItemNodeData.width = $(this).attr('data-gs-width')
                    currentItemNodeData.height = $(this).attr('data-gs-height')
                    currentItemNodeData.x = $(this).attr('data-gs-x')
                    currentItemNodeData.y = $(this).attr('data-gs-y')

                    console.log(currentItemNodeData)


                    currentItem.attr('data-gs-width', $(this).attr('data-gs-width'))
                    currentItem.attr('data-gs-height', $(this).attr('data-gs-height'))
                    currentItem.attr('data-gs-x', $(this).attr('data-gs-x'))
                    currentItem.attr('data-gs-y', $(this).attr('data-gs-y'))

                })

            } //end if check existed

        },
        500); // check every 500ms	   editor-button-afd9c0f1-b47828




}


function setEditPanelLayout(deploy) {

    setTimeout(function () {
        $("#red-ui-editor-stack").css("z-index", "9999")
        // $("#red-ui-editor-stack").css("width", screen.width)

        $("#node-input-method").css("width", "50%")
        $(".red-ui-typedInput-container").css("width", "37%")
        $(".red-ui-tab-link-buttons,#node-input-lookup-group").css("right", "70px")
        $("#red-ui-editor-stack").find("select").css("width", "50%")
        $("#red-ui-editor-stack").find("input:text").css("width", "50%")
        $("#red-ui-editor-stack").find("#node-input-format-editor").css("width", "80%")


        $("#node-input-size").click(function () {

            setTimeout(function () {

                $('a:contains("auto")').parent().parent().css("z-index", "9999");

            }, 100) //End settimeout, wait 0.1s after open panel

        })


        if (deploy == 1) { //If allow deploy after saved (editor mode)

            let count = 0;
            $("#node-dialog-ok").click(function () {

                count++;
                var checkExist = setInterval(function () {

                        if (count == 6) {
                            clearInterval(checkExist);
                        }

                        if (!$("#red-ui-header-button-deploy").hasClass("disabled")) {
                            clearInterval(checkExist);
                            RED.actions.invoke("core:deploy-flows");
                            loadDashboarIframe(2000)
                        }

                    },
                    500); // check every 500ms

            })
        }
    }, 1000) //End settimeout, wait 1 min after open panel

}