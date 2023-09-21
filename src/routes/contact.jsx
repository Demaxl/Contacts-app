import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export async function loader({params}) {
    const contact = await getContact(params.contactId);
    return contact;
}

export async function action({ request, params }) {
    let formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get("favorite") === "true",
    });
}

export default function Contact() {
    const contact = useLoaderData()

    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || null}
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        // This specifies the path the form should submit to
                        action="delete/"
                        onSubmit={(event) => {
                            if (
                                !window.confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                        
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favorite({ contact }) {
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    

    // A hook that allows us to interact with the loaders and action without causing a navigation
    // Just like Form when submitted all data gets revalidated
    const fetcher = useFetcher()

    // Optimistic UI, Checks if the form is being submitted and behaves as if the submission is already true
    if (fetcher.formData) {
        favorite = fetcher.formData.get("favorite") === "true";
    }
    return (
        // since action was not specified it will post the same route the form is rendered
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}