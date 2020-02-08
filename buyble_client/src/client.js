import io from 'socket.io-client';
let Client = {
    SERVER_URI: "http://localhost",
    ConnectToServer: function () {
        return io(this.SERVER_URI);
    },
    OnConnect: function (data) {
        console.log("Connected To Server...")
    }, 
    OnDisconnect: function (data) {
        console.log("Disconnected To Server...")
    },
    HandleData: function (data) {
        console.log("Recieved Data...");
    }
};

export default Client;