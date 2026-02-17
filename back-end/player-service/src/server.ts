import 'dotenv/config'
import app from "./Config/config.js"
import route from './Routes/routes.js'
import cors from "cors";
import path from 'path';
import * as express from 'express'

const port = process.env.PORT
const commonURLEndpoint = '/player'

var corsOptions = {
    origin: 'http://localhost:5173'
}

app.use(cors(corsOptions))
app.use(
  "/avatars",
  express.static(path.join(process.cwd(), "public/avatars"), {
    maxAge: "30d",
    immutable: true
  })
);

/*app.use("/avatars", express.static("public/avatars", {
  maxAge: "30d",
  immutable: true
}));
*/
app.listen(port, () => {
    console.log(`Microservicio iniciado en el puerto ${port}`)
})

app.use(commonURLEndpoint, route)