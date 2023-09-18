import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";

// -- Root
import Root, { 
    loader as rootLoader,
    action as rootAction,
} from "./routes/root";

// -- Contact
import Contact, {
    loader as contactLoader,
    action as contactAction
} from "./routes/contact";

// -- Edit Contact
import EditContact, {
    action as editAction
} from "./routes/edit";

// -- Deletecontact
import { action as deleteAction } from "./routes/delete";

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
                loader: contactLoader,
                action: contactAction
            },
            {
                path: "contacts/:contactId/edit",
                element: <EditContact />,
                loader: contactLoader,
                action: editAction
            },
            {
                path: "contacts/:contactId/delete",
                action: deleteAction,
                // Adds its own error element so it doesnt use the route own
                errorElement: <div>Oops! There was an error!</div>
            }
        ]
    },

    
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);