import postRouter from "./postRouter";
import userRouter from "./userRouter";
import commentRouter from "./commentRouter";

function rootRouter(app: any, prefix: any) {
    app.use(prefix, commentRouter);
    app.use(prefix, userRouter);
    app.use(prefix, postRouter);
}

export default rootRouter;