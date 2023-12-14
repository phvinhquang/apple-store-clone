const cors = require("cors");
let io;

module.exports = {
  clients: [],
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: [
          "https://apple-store-client.firebaseapp.com/",
          "https://apple-store-admin.firebaseapp.com/",
        ],
        methods: ["GET", "POST"],
      },
    });
    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("No io !");
    }
    return io;
  },
};
