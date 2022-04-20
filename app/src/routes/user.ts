import { HTTPVersion } from "find-my-way";
import { IRoute } from "@routes/index";
import { login, signup } from "@service/user-service";

const userRoutes: IRoute<HTTPVersion>[] = [
    {
        method: "POST",
        path: "/login",
        handler: login,
        protected: false,
    },
    {
        method: "POST",
        path: "/signup",
        handler: signup,
        protected: false,
    },
];

export default userRoutes;