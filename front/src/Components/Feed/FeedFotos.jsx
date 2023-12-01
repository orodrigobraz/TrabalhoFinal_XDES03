import React from 'react';
import FeedItens from './FeedItens';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import styles from './FeedFotos.module.css';
import livros from 'C:/Users/Unifei/Documents/Trabalho-Final-ProgramacaoWeb-main/back/db/livros.json'

const FeedFotos = ({setModal}) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        try {
            setData(livros);
        } catch (error) {
            setError('Erro ao buscar os livros');
        } finally {
            setLoading(false);
        }
    }, []);

    if(error) return <Error error={error} />;
    if(loading) return <Loading />;
    if(data) {
        return (
            <ul className={`${styles.feed} animeLeft`}>
                {data.map(livro => <FeedItens key={livro.id} livro={livro} setModal={setModal} />)}
            </ul>
        )
    }
    else return null;
}   

export default FeedFotos;