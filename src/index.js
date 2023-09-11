import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import "./index.css";
import Root, { 
    loader as rootLoader,
    action as rootAction
    } from "./routes/root";

import ErrorPage from "./error-page";
import Contact, {
    loader as contactLoader
} from "./routes/contact";


// Creates browser router to enable client side routing
const router = createBrowserRouter([
    {
        // Base layout
        path: "/",
        element: <Root />,
        // The component rendered when we navigate to a page that doesnt match any route
        errorElement: <ErrorPage />,
        // Defines a loader function that provides data to the route element before render,
        // useful for fetching data
        loader: rootLoader,
        // Actions are called whenever a non-GET http request is submitted to the route
        // e,g post, put, delete etc. After an action is completed all loader data get revalidated
        action: rootAction,
        // This is nested routing, the parent route(base layout) is rendered then the children are rendered
        // depending on the url path
        children: [
            {
                // :contactId represents a dynamic segment passed as URL Params
                // params are passed to the loader for the route
                path: "contacts/:contactId",
                element: <Contact />,
                loader: contactLoader
            }
        ]
    },

    
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);