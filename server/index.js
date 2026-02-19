import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import connectDB from "./db/db.js";
import {app} from "./app.js"


const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed", error);
    }
})();

