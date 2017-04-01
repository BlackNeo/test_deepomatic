/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
   var upload = $('img.upload');
   var result = $('.base64');
   var statusFromServer;
   
    upload.on('load', function(){
        var base64 = $(this).attr('ng-src');
	base64 = base64.replace("data:image/jpeg;base64,", "");
	//console.log(base64);
        var request = $.ajax({
                url: "https://api.deepomatic.com/v0.6/detect/fashion/",
                type: "POST",
                crossDomain: true,
                dataType: 'json',
                cache: false,
                success : callbackTask,
                beforeSend: function(xhr){
                    xhr.setRequestHeader("Content-Type","application/json");
                },
                headers: {
                    "x-app-id": "283723326633",
                    "x-api-key": "b01a86463f6e4d58978da77b912d7fa5"
                },
                data: '{"base64":"'+base64+'"}',
                error : function(jqXHR, textStatus) {
                alert( "Request failed: " + textStatus +"\njqXHR : " + jqXHR);
                console.log(jqXHR);
            }
        });
    });
        
    function callbackTask(data) {
        var task = JSON.stringify(data['task_id']);
        task = task.replace(/"/g, "");
                $.ajax({
                url: 'https://api.deepomatic.com/v0.6/tasks/'+task,
                type: "GET",
                crossDomain: true,
                dataType: 'json',                                    
                success: callbackStatus,
                beforeSend: function(xhr){
                    xhr.setRequestHeader("Content-Type","application/json");
                },
                headers: {
                    "x-app-id": "283723326633",
                    "x-api-key": "b01a86463f6e4d58978da77b912d7fa5"
                },
                error : function(jqXHR, textStatus) {
                alert( "Request failed: " + textStatus +"\njqXHR : " + jqXHR);
            }
        });
    }
            
    function callbackStatus(statusFromServer) {
        var status = statusFromServer.task.status;
        var pending = "pending";
        if (status == pending) {
            setTimeout(function () {
                callbackStatus(statusFromServer);
                console.log(status);
            }, 2000);
        }
        console.log(status == pending);
    }
});
