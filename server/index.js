import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./db/db.js";
import { app } from "./app.js";
import { initializeSocket } from "./socket.js";

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await connectDB();

    // Create HTTP server from Express app
    const httpServer = createServer(app);

    // Attach Socket.IO
    const io = new Server(httpServer, {
      cors: {
        origin: ["http://localhost:5173", "http://localhost:3000"],
        credentials: true,
      },
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    // Initialize socket handlers
    initializeSocket(io);

    httpServer.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
      console.log(`Socket.IO attached ✓`);
    });
  } catch (error) {
    console.error("Server startup failed", error);
  }
})();
