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
                //xhr.setRequestHeader("Content-Length",base64.length);
            },
            headers: {
                "Content-Type":"application/x-www-form-urlencoded",
                "x-api-key": "b01a86463f6e4d58978da77b912d7fa5",
                "x-app-id": "283723326633",
                //"Content-Length": base64.length,
                //"Authorization": "OAuth api_key=ACCESSTOKEN"
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
});
