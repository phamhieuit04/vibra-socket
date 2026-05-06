import "dotenv/config";
import { APP } from "./configs/app.js";
import { createApp } from "./app.js";

const app = createApp();

app.listen(APP.PORT, () => {
    console.log("Socket server running on port " + APP.PORT);
});