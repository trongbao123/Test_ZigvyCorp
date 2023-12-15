import React from "react"

import { useRoutes, Router } from "react-router"
import PostTemplates from "../template/PostTemplates"
import Post from "../page/post"


const Routers = () => {
    const routing = useRoutes([
        {
            path: "/",
            element: <PostTemplates />,

            children: [
                {
                    path: "/",
                    element: <Post />

                }
            ]
        }
    ])
    return routing
}

export default Routers