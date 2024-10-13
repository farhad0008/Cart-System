import {userRoutes} from './users.js'

export const initRoutes = (app) => {
    app.use("/users",userRoutes);

    app.use("*",(req,resp) => {
        resp.status(404).send({message:"Route not found"})
    })
}