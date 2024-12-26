import { useState } from 'react';
import useUser from '../context/useUser';

export function Login() {
  const user = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="grid">
      <h1>Login or register</h1>
      <form>
        <input
          className="block"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          className="block"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div>
          <button
            className="button"
            type="button"
            onClick={() => user.login(email, password)}
          >
            Login
          </button>
          <button
            className="button"
            type="button"
            onClick={() => user.register(email, password)}
          >
            Register
          </button>
        </div>
      </form>
    </section>
  );
}
