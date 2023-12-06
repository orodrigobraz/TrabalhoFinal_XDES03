import React from 'react';
import styles from './FeedItens.module.css';

const FeedItens = ({ livro, setModal }) => {
    function handleClick() {
        setModal(livro);
    }

    return (
        <li className={styles.foto} onClick={handleClick}>
            <img src={livro.img} alt={livro.titulo} />
            <div>
                <h2>{livro.titulo}</h2>
                <p>{livro.autor}</p>
                <p>{livro.editora}</p>
                <p>{livro.pagnum} páginas</p>
            </div>
        </li>
    )
}

export default FeedItens;
