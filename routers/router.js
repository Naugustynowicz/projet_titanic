import { Router } from "express"

const appRouter = new Router()

// appRouter.get("/", (req, res) => {
//   res.render("home")
// })

// Route vers la page de connexion
appRouter.get("/login", (req, res) => {
    res.render("login");
});

export default appRouter;