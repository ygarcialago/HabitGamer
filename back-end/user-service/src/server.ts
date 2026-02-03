import 'dotenv/config'
import app from "./Config/config.js"
import route from './Routes/routes.js'

const port = process.env.PORT
const commonURLEndpoint = '/user'

app.listen(port, () => {
    console.log(`Microservicio iniciado en el puerto ${port}`)
})

app.use(commonURLEndpoint, route)