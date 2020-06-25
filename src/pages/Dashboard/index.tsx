import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import { Error, Form, Repositories, Title } from './styles';

interface Repository {
  name?: string;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const LOCALSTORAGE_KEY = '@GithubExplore:repositories';
const NEW_REPO_SUGGESTION = 'alextavella/gostack-typeorm-upload';

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState<string>(NEW_REPO_SUGGESTION);

  const [inputError, setInputError] = useState<string>('');

  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const repos = localStorage.getItem(LOCALSTORAGE_KEY);
    return repos ? JSON.parse(repos) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(repositories));
  }, [repositories]);

  async function handleAddRepository(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    const repo = repositories.find((r) => r.name === newRepo);
    if (repo) {
      const repoIndex = repositories.findIndex((r) => r.name === newRepo);
      repositories.splice(repoIndex, 1);

      setRepositories([repo, ...repositories]);

      setInputError('');
      setNewRepo('');
      return;
    }

    try {
      const response = await api.get<Repository>(`/repos/${newRepo}`);
      const {
        full_name,
        description,
        owner: { login, avatar_url },
      } = response.data;

      const repository = {
        name: newRepo,
        full_name,
        description,
        owner: { login, avatar_url },
      };

      setRepositories([repository, ...repositories]);
      setInputError('');
    } catch (e) {
      setInputError('Error ao pesquisar repositórios');
    } finally {
      setNewRepo('');
    }
  }

  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <a key={repository.full_name} href="teste">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
