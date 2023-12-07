import React from 'react';
import styles from './ContentDelete.module.css';
import { CONTENT_DELETE } from '../../Api';
import useFetch from '../../Hooks/useFetch';

const ContentDelete = ({id}) => {
    const {loading, request} = useFetch();
    
    async function handleClick() {
        const confirm = window.confirm('Apagar publicação?');
        if(confirm) {
            const {url, options} = CONTENT_DELETE(id);
            const {response} = await request(url, options);
            if(response.ok) window.location.reload();
        }
    }

    return (
        <>
            {loading ? <button className={styles.delete} disabled>Deletando</button> : <button onClick={handleClick} className={styles.delete}>Deletar</button>}   
        </>
    )
}

export default ContentDelete;