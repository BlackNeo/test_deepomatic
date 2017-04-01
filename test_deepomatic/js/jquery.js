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
	base64 = base64.replace("data:image/jpeg;base64,", "");
	console.log(base64);
        var request = $.ajax({
                url: "https://api.deepomatic.com/v0.6/detect/fashion/",
                type: "POST",
                crossDomain: true,
                dataType: 'json',
                cache: false,
                beforeSend: function(xhr){
                    xhr.setRequestHeader("Content-Type","application/json");
                },
                headers: {
                    "x-app-id": "283723326633",
                    "x-api-key": "b01a86463f6e4d58978da77b912d7fa5"
                },
                data: '{"base64":"'+base64+'"}',
                success: function(data) {
//                    console.log(data);
                            var task = JSON.stringify(data['task_id']);
                            task = task.replace(/"/g, "");
                                    $.ajax({
                                    url: 'https://api.deepomatic.com/v0.6/tasks/'+task,
                                    type: "GET",
                                    crossDomain: true,
                                    dataType: 'json',
                                    beforeSend: function(xhr){
                                        xhr.setRequestHeader("Content-Type","application/json");
                                    },
                                    headers: {
                                        "x-app-id": "283723326633",
                                        "x-api-key": "b01a86463f6e4d58978da77b912d7fa5"
                                    },
                                    success: function(data) {
                                        alert('OK Status' + data);
                                        console.log(data);
                                    },
                                    error : function(jqXHR, textStatus) {
                                    alert( "Request failed: " + textStatus +"\njqXHR : " + jqXHR);
                                }
                            });
                },
                error : function(jqXHR, textStatus) {
                alert( "Request failed: " + textStatus +"\njqXHR : " + jqXHR);
                console.log(jqXHR);
            }
        });
    });   
});
