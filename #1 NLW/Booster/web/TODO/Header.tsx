// Conceito de propriedades

import React from "react";

// Definir a tipagem de um objeto
interface HeaderProps {
    // Se for obrigatória, adicionar "?" antes do ":"
    title: string;
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    );
};

export default Header;
