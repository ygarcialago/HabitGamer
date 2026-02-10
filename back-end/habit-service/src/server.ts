import 'dotenv/config'
import app from "./Config/config.js"
import route from './Route/routes.js'

const port = process.env.PORT
const commonURLEndpoint = '/habit'

app.listen(port, () => {
    console.log(`Microservicio iniciado en el puerto ${port}`)
})

app.use(commonURLEndpoint, route)