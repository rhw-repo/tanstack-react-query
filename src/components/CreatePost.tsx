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

  /* Typical use cases for useMutate gook: create / update / delete operations
  useMutate allows us to create changes in the state and keep the server state 
  in sync with the UI. Typically 3 callback situations: 
  onSuccess
  onMutate
  onError
  */
  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // if add new post, previously executed query is now
      // out of date -  invalidate it to cause a refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);
      queryClient.setQueryData<Post[]>(["posts"], (old) => {
        // Guard to handle the default type of any for property old
        if (!old)
          // Cache was empty
          return [{ id: Date.now(), ...newPost }];
        // Cache existed
        return [...old, { id: Date.now(), ...newPost }];
      });

      return { previousPosts };
    },
    /* State was set for previousPosts so can now simply revert to 
    the state before the error happened without handling the mutation 
    from the onMutate block */
    onError: (err, newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData<Post[]>(["posts"], context.previousPosts);
      }
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
