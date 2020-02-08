import $ from 'jquery';
const URI = "http://127.0.0.1:5000";
let Client = {};
Client.SendToServer = function (method, endpoint, data, callback) {

    $.ajax({
        url: `${URI}/${endpoint}`,
        dataType: 'text',
        type: method,
        contentType: 'application/x-www-form-urlencoded',
        data: JSON.stringify(data, null, 2),
        success: function( data ){
            if (callback) callback(data)
        },
        error: function( errorThrown){
            console.log( errorThrown );
        }
    });
}

export default Client;