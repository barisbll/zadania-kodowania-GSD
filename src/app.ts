import { get404 } from "./controller/404";
import createServer from "./util/server";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

const app = createServer();

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(8080);

app.use(get404);
