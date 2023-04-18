import App from "./app";
import UserRoute from "./routes/user";

const server = new App();
server.initializedRoutes([new UserRoute()]);
server.listen();
