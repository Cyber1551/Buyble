import io from 'socket.io-client';
import React from 'react';
let Client = {
    SERVER_URI: "http://localhost",
    SOCKET: null,
    ConnectToServer: function () {
        this.SOCKET = io(this.SERVER_URI);
    },
    OnConnect: function (data) {
        console.log("Connected To Server...")
    }, 
    OnDisconnect: function (data) {
        console.log("Disconnected To Server...")
    },
    HandleData: function (data) {
        console.log("Recieved Data...");
    },
    SendDataToServer: function (data) {
        console.log(data);
        this.SOCKET.emit("data", data);
    }
};

export default Client;