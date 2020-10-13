import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import { Container, Content } from './styles';

import logo from '../../images/logo.svg';

const Landing: React.FC = () => {
    return (
        <Container>
            <Content>
                <img src={logo} alt="Logo Happy" />

                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>

                <div>
                    <strong>Natal</strong>
                    <span>Rio Grande do Norte</span>
                </div>

                <Link to="/app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
                </Link>
            </Content>
        </Container>
    );
}

export default Landing;
