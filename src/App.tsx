//import { useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
/* 
Source of fake data for examples:
"https://jsonplaceholder.typicode.com/posts"
"https://jsonplaceholder.typicode.com/users"
*/

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error("Error fetching data");
  return response.json();
};

function App() {
  const { data } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  if (!data) return <div>Loading…</div>;

  return (
    <>
      {data.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </>
  );
}

export default App;
