import { Outlet, Link, useLoaderData, Form , redirect, NavLink} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function loader() {
    const contacts = await getContacts();
    return contacts
}

export async function action() {
    const contact = await createContact();

    return redirect(`/contacts/${contact.id}/edit`);
}


export default function Root() {
    // Returns the loader data of a route
    const contacts = useLoaderData();

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    {/* The Form component prevents an HTML form from sending the request to the server
                        instead it sends it to the route's action */}
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                    
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    {/* A special type of line that knows whether its active or pending.
                                        When the user is at the URL in the NavLink, then isActive will be true
                                        When it's about to be active (the data is still loading) then 
                                        isPending will be true. */}
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        // Passing a function to className to render based on NavLink state
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                    >
                                        {/* other code */}
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                    </NavLink>
                                    
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}