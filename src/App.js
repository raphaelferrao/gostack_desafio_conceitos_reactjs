import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    
    const newRepository = {
      title: `New Repository ${Date.now()}`,
      url: 'http: //github.com/...',
      techs: ['ReactJS']
    };

    const response = await api.post('/repositories', newRepository);

    const createdRepository = response.data;

    setRepositories([...repositories, createdRepository]);
  }

  async function handleRemoveRepository(id) {
    console.log(`id repository to delete: ${id}`);

    const response = await api.delete(`/repositories/${id}`);
    
    if (response.status === 204) {
      const repositoryIndex = repositories.findIndex( repository => repository.id === id);

      if (repositoryIndex >= 0) {
        const changedRepositories = [...repositories];
        changedRepositories.splice(repositoryIndex, 1);
        setRepositories(changedRepositories);
      }
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { 
          repositories.map( repository => {
            return (
              <li key={repository.id}>
                {repository.title}

                <button onClick={ () => handleRemoveRepository(repository.id) }>
                  Remover
                </button>
              </li>
            );
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
