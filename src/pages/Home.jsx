import { useState } from 'react';
import useUser from '../context/useUser';
import useIdeas from '../context/useIdeas';

export function Home() {
  const user = useUser();
  const ideas = useIdeas();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    try {
      await ideas.add({ userId: user.current.$id, title, description });
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {user.current ? (
        <section className="grid-center-col1">
          <h2 className="mb-15 text-center">Submit Idea</h2>
          <form className="w-full mb-15">
            <input
              className="block w-full mb-15 p-10"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <textarea
              className="block w-full mb-15 p-10"
              placeholder="Description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <button
              type="button"
              className="login-btn ml-auto block"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </section>
      ) : (
        <section>
          <p>Please login to submit an idea.</p>
        </section>
      )}
      <section>
        <h2 className="text-center">Latest Ideas</h2>
        <ul>
          {ideas.current.map(
            (idea) =>
              idea && (
                <li key={idea.$id}>
                  <strong>{idea.title}</strong>
                  <p>{idea.description}</p>
                  {user.current && user.current.$id === idea.userId && (
                    <button
                      type="button"
                      onClick={() => ideas.remove(idea.$id)}
                    >
                      Remove
                    </button>
                  )}
                </li>
              )
          )}
        </ul>
      </section>
    </>
  );
}
