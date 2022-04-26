import { get404 } from "./controller/404";
import createServer from "./util/server";

const app = createServer();

app.listen(8080);

app.use(get404);
