import routes from "./routes";
import { createApp, initOpenAPI, middleware } from "./utils/app.utils";

const app = createApp();

initOpenAPI(app);

middleware(app);

app.route("/", routes);

export default app;
