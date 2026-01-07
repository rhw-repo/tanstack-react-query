//import { useState } from "react";
import "./App.css";
import { Posts } from "./components/Posts";
import { PostsById } from "./components/PostsById";
import { CreatePost } from "./components/CreatePost";

/* 
Source of fake data for examples:
"https://jsonplaceholder.typicode.com/posts"
"https://jsonplaceholder.typicode.com/users"
*/

function App() {
  // const [isMounted, setIsMounted] = useState(false);
  return (
    <main>
      <div className="main__toggle-wrapper">
        {/*} <button onClick={() => setIsMounted((prev) => !prev)}>Toggle</button>
        {isMounted && <Posts />} */}
      </div>
      <PostsById id={3} />
      <CreatePost />
      <Posts />
    </main>
  );
}

export default App;
