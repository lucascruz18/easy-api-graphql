import express from "express";
import cors from "cors";
import GraphHTTP from "express-graphql";
import Schema from "./schema";

import "./database";

class App {
  constructor() {
    this.server = express();

    this.middlewares();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(
      "/",
      GraphHTTP({
        schema: Schema,
        pretty: true,
        graphiql: true
      })
    );
  }
}

export default new App().server;
