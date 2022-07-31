import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [ repositories, setRepositories ] = useState([]);
  const [ user, setUser ] = useState('');

    useEffect(() => {
  async function fetchData(user) {
    const response = await fetch('https://api.github.com/users/${user}/repos');
    const data = await response.json();
    setRepositories(data);
  }
  fetchData();
    }, []);

    useEffect(() => {
      const filtered = repositories.filter(repo => repo.favorite);

      document.title = `You have ${filtered.length} favorited`;

    }, [repositories])

    function handleUser({ target }) {
    const { value } = target;
    setUser(value);
  };

    function handleFavorite(id) {
      const newRepositories = repositories.map(repo => {
        return repo.id === id ? {...repo, favorite: !repo.favorite } : repo
      });
      setRepositories(newRepositories);
    }

  return (
    <div>
      <input 
      type="string"
      onChange={handleUser}
      placeholder="Usuario GIthub"
      />
        <ul>
          {repositories.map(repo => (
            <li key={repo.id}>
              {repo.name}
              {repo.favorite && <span>(Favorite)</span> }
              <button onClick={() => handleFavorite(repo.id)}>Favorite</button>
            </li>
            ))}
        </ul>

    </div>
  )
}

export default App;
