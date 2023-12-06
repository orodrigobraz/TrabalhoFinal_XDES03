import React from 'react';
import styles from './FeedItens.module.css';
import Image from '../Helper/Image';

const FeedItens = ({foto, setModal}) => {
    function handleClick() {
        setModal(foto);
    }


    return (
        <li className={styles.foto} onClick={handleClick}>
            <Image src={foto.src} alt={foto.title} />
            <span></span>
        </li>
    )
}

export default FeedItens;