/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
   var upload = $('img.upload');
   var result = $('.base64');
   
   upload.on('load', function(){
        var base64 = $(this).attr('ng-src');
        var request = $.ajax({
            url: "https://api.deepomatic.com/v0.6/detect/fashion/",
            type: "POST",
            crossDomain: true,
            dataType: 'json',
            cache: false,
            beforeSend: function(xhr){
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                xhr.setRequestHeader("Content-Lenght",base64.length);
            },
            headers: {
                "Content-Type":"application/json",
                "x-api-key": "b01a86463f6e4d58978da77b912d7fa5",
                "x-app-id": "283723326633",
                //"Content-Lenght": base64.length
            },
            data: {                
                "base64":base64 
            }
          });
        request.done(function(data) {
            alert( data );
        });        
        request.fail(function(jqXHR, textStatus) {
            alert( "Request failed: " + textStatus +"\njqXHR : " + jqXHR);
            console.log(jqXHR);
        });
   });
   
   /*function ajaxPOSTTest() {
        try {
            // Opera 8.0+, Firefox, Safari
            ajaxPOSTTestRequest = new XMLHttpRequest();
        } catch (e) {
            // Internet Explorer Browsers
            try {
                ajaxPOSTTestRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    ajaxPOSTTestRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    // Something went wrong
                    alert("Your browser broke!");
                    return false;
                }
            }
        }

        ajaxPOSTTestRequest.onreadystatechange = ajaxCalled_POSTTest;
        var url = "https://api.deepomatic.com/v0.6/detect/fashion/";
        var params = "lorem=ipsum&name=binny";
        ajaxPOSTTestRequest.open("POST", url, true);
        ajaxPOSTTestRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajaxPOSTTestRequest.send(params);
    }

    //Create a function that will receive data sent from the server
    function ajaxCalled_POSTTest() {
        if (ajaxPOSTTestRequest.readyState == 4) {
            document.getElementById("output").innerHTML = ajaxPOSTTestRequest.responseText;
        }
    }*/
});
