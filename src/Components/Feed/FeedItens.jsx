import React from 'react';
import styles from './FeedItens.module.css';

const FeedItens = ({foto, setModal}) => {
    function handleClick() {
        setModal(foto);
    }


    return (
        <li className={styles.foto} onClick={handleClick}>
            <img src={foto.src} alt={foto.title} />
            <span></span>
        </li>
    )
}

export default FeedItens;