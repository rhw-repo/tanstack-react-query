import { useMutation, useQueryClient } from "@tanstack/react-query";
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

  const queryClient = useQueryClient();

  // Typical use cases: create / update / delete operations
  // useMutate allows us to create changes in the state and keep the
  // server state in sync with the UI
  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // if add new post, previously executed query is now
      // out of date -  invalidate it to cause a refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    mutate({ title, body: "This is a new post" });
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
