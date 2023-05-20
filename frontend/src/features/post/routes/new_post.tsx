import { Form, useActionData } from "react-router-dom";
import { FormValidationErrors } from "@/types";
import { useEffect, useState } from "react";


export const getItemFromStorage = (key: string): string => {
    const value = JSON.parse(localStorage.getItem(key) + "");
    return value;
}

export const setItemToStorage = (key: string, value: string): void => {
  localStorage.setItem(key, JSON.stringify(value));
}

export function NewPost(): JSX.Element {
  const actionData = useActionData() as
    | { errors: FormValidationErrors }
    | undefined;
  const [newPostInput, setNewPostInput] = useState("");

  useEffect(() => {
    const value = getItemFromStorage("newPostInput");
    setNewPostInput(value);
  }, [newPostInput]);

  const handleNewPostInput = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    setNewPostInput(value);
    setItemToStorage("newPostInput", value);
  };

  return (
    <div className="main posts-new">
      <div className="container">
        <h1 className="form-heading">Create a new post</h1>
        <Form method="POST" data-test="form">
          <div className="form">
            <div className="form-body">
              {actionData?.errors &&
                actionData.errors.map((error) => (
                  <div
                    key={error.msg}
                    className="form-error"
                    data-test={`error-${error.path}`}
                  >
                    {error.msg}
                  </div>
                ))}
              <textarea
                name="content"
                data-test="textarea-content"
                onChange={handleNewPostInput}
                value={newPostInput}
              />
              <input type="submit" value="Post" data-test="submit" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
