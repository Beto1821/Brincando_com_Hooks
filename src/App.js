import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [ repositories, setRepositories ] = useState([]);

    useEffect(() => {
  async function fetchData() {
    const response = await fetch('https://api.github.com/users/Beto1821/repos');
    const data = await response.json();
    setRepositories(data);
  }
  fetchData();
    }, []);

    useEffect(() => {
      const filtered = repositories.filter(repo => repo.favorite);

      document.title = `You have ${filtered.length} favorited`;

    }, [repositories])


    function handleFavorite(id) {
      const newRepositories = repositories.map(repo => {
        return repo.id === id ? {...repo, favorite: !repo.favorite } : repo
      });
      setRepositories(newRepositories);
    }

  return (
    
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorite)</span> }
            <button onClick={() => handleFavorite(repo.id)}>Favorite</button>
          </li>
          ))}
      </ul>
  )
}

export default App;
