import React from 'react';
import FeedItens from './FeedItens';
import useFetch from '../../Hooks/useFetch';
import { PHOTOS_GET } from '../../Api';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import styles from './FeedFotos.module.css';

const FeedFotos = ({setModal}) => {
    const {data, loading, error, request} = useFetch();

    React.useEffect(() => {
        async function fetchFotos() {
            const {url, options} = PHOTOS_GET({page: 1, total: 6, user: 0});
            const {response, json} = await request(url, options);
        }
        fetchFotos();
    }, [request]);

    if(error) return <Error error={error} />;
    if(loading) return <Loading />;
    if(data) {
        return (
            <ul className={`${styles.feed} animeLeft`}>
                {data.map(foto => <FeedItens key={foto.id} foto={foto} setModal={setModal} />)}
            </ul>
        )
    }
    else return null;
}   

export default FeedFotos;