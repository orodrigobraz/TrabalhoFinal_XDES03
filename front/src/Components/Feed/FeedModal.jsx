import React from 'react';
import styles from './FeedModal.module.css';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_GET } from '../../Api';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import ModalContent from '../Content/ModalContent';

const FeedModal = ({foto}) => {
    const {data, error, loading, request} = useFetch();

    React.useEffect(() => {
        const {url, options} = PHOTO_GET(foto.id);
        request(url, options);
    }, [foto, request]);

    return (
        <div className={styles.modal}>
            {error && <Error error={error} />}
            {loading && <Loading />}
            {data && <ModalContent data={data} />}
            <img src={foto.src} alt="" />
        </div>
    )
}

export default FeedModal;