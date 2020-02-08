import io from 'socket.io-client';
let Client = {
    SERVER_URI: "http://localhost",
    ConnectToServer: function () {
        return io(this.SERVER_URI);
    }
};

export default Client;