import { useQuery } from "@tanstack/react-query";
import type { Post } from "../types";
/*type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};*/

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error("Error fetching data");
  return response.json();
};

export const Posts = () => {
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 10000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occured; {error.message}</p>;

  return (
    <>
      {data?.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </>
  );
};
