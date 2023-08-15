import { Router } from "express"
import {csvRouter} from "./csv.router"

const routers = Router()

routers.use(csvRouter)

export {
  routers
}
