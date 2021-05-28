import React, { useState, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logo from '../../assets/logotipo.svg';
import api from '../../services/api';
import Repository from '../Repository';
import { Title, Form, Repositories } from './styles';

interface Repository {
    // eslint-disable-next-line camelcase
    full_name: string;
    // full_name: string;
    description: string;
    owner: {
        login: string;
        // eslint-disable-next-line camelcase
        avatar_url: string;
    };
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>([]);

    async function handleAddRepository(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        event.preventDefault();

        const response = await api.get<Repository>(`repos/${newRepo}`);

        const repository = response.data;

        setRepositories([...repositories, repository]);
        setNewRepo('');
    }

    return (
        <>
            <img src={logo} alt="Github_Explorer" />
            <Title> Explore repositórios no GitHub </Title>
            <Form onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositorio"
                />
                <button type="submit"> Pesquisar </button>
            </Form>
            <Repositories>
                {repositories.map((repository) => (
                    <a key={repository.full_name} href="teste">
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong> {repository.full_name} </strong>
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
