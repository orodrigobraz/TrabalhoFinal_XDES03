import React from 'react';
import styles from './ModalContent.module.css';
import { Link } from 'react-router-dom';
import FotoComments from './FotoComments';
import { UserContext } from '../../UserContext';
import ContentDelete from './ContentDelete';
import Image from '../Helper/Image';

const ModalContent = ({data}) => {
    const user = React.useContext(UserContext);
    const {foto, coment} = data;

    return (
        <div className={styles.content}>
            <div className={styles.img}>
                <Image src={foto.src} alt={foto.title} />
            </div>
            <div className={styles.details}>
                <div>
                    <p className={styles.author}>
                        {user.data && user.data.username === foto.author ? <ContentDelete id={foto.id} /> : <Link to={`/perfil/${foto.author}`}></Link>}
                        <span className={styles.estrelas}>{foto.estrelas}</span>
                    </p>
                    <h1 className='title'>
                        <Link to={`/foto/${foto.id}`}>{foto.title}</Link>
                    </h1>
                    <ul className={styles.attributes}>
                        <li>{foto.titulo}</li>
                        <li>{foto.autor}</li>
                        <li>{foto.editora}</li>
                        <li>{foto.numPag}</li>
                    </ul>
                </div>
            </div>
            <FotoComments to={foto.id} coment={coment}/>
        </div>
    )
}

export default ModalContent;