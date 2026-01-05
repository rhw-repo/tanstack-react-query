import { useQuery } from "@tanstack/react-query";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const fetchPosts = async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  if (!response.ok) throw new Error("Error fetching data");
  return response.json();
};

type PostsByIdProps = {
  id: number;
};

export const PostsById: React.FC<PostsByIdProps> = ({ id }) => {
  const { data, isLoading, error } = useQuery<Post>({
    queryKey: ["posts", id],
    // anonymous function calls fetchPosts
    // fetchPosts(id) alone would mean whatever is returned set to queryFn
    // correct = assign the function to queryFn not it's return
    queryFn: () => fetchPosts(id),
    staleTime: 10000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occured; {error.message}</p>;

  return <>{data?.title}</>;
};
