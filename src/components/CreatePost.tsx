//import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { NewPost, Post } from "../types";

export const createPost = async (newPost: NewPost): Promise<Post> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  return response.json();
};

export const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");

  //const {} = useMutation()

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    // mutate
  };

  return (
    <section>
      <form>
        <input
          type="text"
          placeholder="Post title..."
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <button onClick={handleSubmit}>Create</button>
      </form>
    </section>
  );
};
