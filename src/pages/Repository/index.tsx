import React, { useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, RepositoryInfo, Issues } from './styles';
import logo from '../../assets/logotipo.svg';
import api from '../../services/api';

interface RepositoryParams {
    repository: string;
}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();

    useEffect(() => {
        api.get(`repos/$${params.repository}`).then((response) => {
            console.log(response.data);
        });
        api.get(`repos/$${params.repository}/issues`).then((response) => {
            console.log(response.data);
        });
    });

    return (
        <>
            <Header>
                <img src={logo} alt="github explorer" />
                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            <RepositoryInfo>
                <header>
                    <img
                        src="https://avatars.githubusercontent.com/u/69631?v=4"
                        alt="facebook"
                    />
                    <div>
                        <strong>facebook/react</strong>
                        <p>descricao</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>1800</strong>
                        <strong>Starts</strong>
                    </li>
                    <li>
                        <strong>48</strong>
                        <strong>Forks</strong>
                    </li>
                    <li>
                        <strong>67</strong>
                        <strong>Issues abertas</strong>
                    </li>
                </ul>
            </RepositoryInfo>
            <Issues>
                <Link to="dale">
                    <div>
                        <strong> repository.full_name </strong>
                        <p>repository.description</p>
                    </div>
                    <FiChevronRight size={20} />
                </Link>
            </Issues>
        </>
    );
};

export default Repository;
