import { useState } from "react";

export const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");

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
