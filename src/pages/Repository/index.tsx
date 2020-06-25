import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import { Header, Issues, RepositoryInfo } from './styles';

interface RepoParams {
  name: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: string;
  title: string;
  user: {
    login: string;
  };
}

const Respository: React.FC = () => {
  const { params } = useRouteMatch<RepoParams>();

  const [repository, setRepository] = useState<Repository>();
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    async function loadData(): Promise<void> {
      const [repo, issues] = await Promise.all([
        api.get<Repository>(`/repos/${params.name}`),
        api.get<Issue[]>(`/repos/${params.name}/issues`),
      ]);

      setRepository(repo.data);
      setIssues(issues.data);
    }

    try {
      loadData();
    } catch {
      console.log('Erro ao carregar dados do repositorio');
    }
  }, [params]);

  return (
    <>
      <Header>
        <img src={logo} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      {issues.map((issue) => (
        <Issues>
          <Link key={issue.id} to="/">
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        </Issues>
      ))}
    </>
  );
};

export default Respository;
