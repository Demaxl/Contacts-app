import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Contact from "./routes/contact";


// Creates browser router to enable client side routing
const router = createBrowserRouter([
    {
        // Base layout
        path: "/",
        element: <Root />,
        // The component rendered when we navigate to a page that doesnt match any route
        errorElement: <ErrorPage />,
        // This is nested routing, the parent route(base layout) is rendered then the children are rendered
        // depending on the url path
        children: [
            {
                path: "contacts/:contactId",
                element: <Contact />
            }
        ]
    },

    
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);