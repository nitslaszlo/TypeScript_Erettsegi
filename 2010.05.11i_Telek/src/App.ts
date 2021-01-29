import http from "http";
import Content from "./Content";

class Program {
    constructor() {
        http.createServer(Content.content).listen(process.env.PORT || 8080);
    }
}

new Program();
