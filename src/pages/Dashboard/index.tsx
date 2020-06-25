import React from 'react';
import logo from '../../assets/logo.svg';
import { Title, Form, Repositories } from './styles';
import { FiChevronRight } from 'react-icons/fi';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>Explorer respositórios no Github</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="button">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/3128408?s=460&u=ca5efe074f71f07d0d08f668f66589610b8df018&v=4"
            alt=""
          />
          <div>
            <strong>gostack-typeorm-upload</strong>
            <p>Desafio sobre Typeorm aplicado no Bootcamp GoStack</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/3128408?s=460&u=ca5efe074f71f07d0d08f668f66589610b8df018&v=4"
            alt=""
          />
          <div>
            <strong>gostack-typeorm-upload</strong>
            <p>Desafio sobre Typeorm aplicado no Bootcamp GoStack</p>
          </div>
          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars3.githubusercontent.com/u/3128408?s=460&u=ca5efe074f71f07d0d08f668f66589610b8df018&v=4"
            alt=""
          />
          <div>
            <strong>gostack-typeorm-upload</strong>
            <p>Desafio sobre Typeorm aplicado no Bootcamp GoStack</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
