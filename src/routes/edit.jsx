import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateContact } from "../contacts";


export async function action({ request, params }) {
    // Gets the formData that contains the submitted form input in key value pairs
    const formData = await request.formData();

    // Converts the form data to objects
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    // redirect to a url
    return redirect(`/contacts/${params.contactId}`);
}


export default function EditContact() {
    const contact = useLoaderData();

    // Hook that returns a function that allows you to programmatically navigate
    // between routes
    const navigate = useNavigate();

    return (
        <Form method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="First"
                    aria-label="First name"
                    type="text"
                    name="first"
                    defaultValue={contact.first}
                />
                <input
                    placeholder="Last"
                    aria-label="Last name"
                    type="text"
                    name="last"
                    defaultValue={contact.last}
                />
            </p>
            <label>
                <span>Twitter</span>
                <input
                    type="text"
                    name="twitter"
                    placeholder="@jack"
                    defaultValue={contact.twitter}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL"
                    type="text"
                    name="avatar"
                    defaultValue={contact.avatar}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    defaultValue={contact.notes}
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button 
                    type="button"
                    onClick={() => {
                        // Navigate to the previous route i.e go back in history
                        navigate(-1)
                    }}>
                        Cancel
                </button>
            </p>
        </Form>
    );
}