import React from 'react';
import styles from './UserPost.module.css'
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';

const UserPost = () => {

  const titulo = useForm();
  const autor = useForm();
  const editora = useForm();
  const pagnum = useForm();
  const img = useForm();

    const {data, error, loading, request} = useFetch();
    const navigate = useNavigate();

    React.useEffect(() => {
      if(data) navigate('/conta');
    }, [data, navigate])

    async function handleSubmit(event) {
      event.preventDefault();

      const formData = new FormData();
      formData.append('titulo', titulo.value);
      formData.append('autor', autor.value);
      formData.append('editora', editora.value);
      formData.append('pagnum', pagnum.value);
      formData.append('img', img.value);
      const token = localStorage.getItem('token'); 

      const response = await fetch('http://localhost:3000/postar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);

      } else {
        console.log('Erro ao cadastrar o livro');
      }

    }

    return <section className={`${styles.userPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label='Título' type='text' name='titulo' {...titulo}/>
        <Input label='Autor' type='text' name='autor' {...autor}/>
        <Input label='Editora' type='text' name='editora' {...editora}/>
        <Input label='Número de páginas' type='number' name='pagnum' {...pagnum}/>
        <Input label='Imagem de capa (Somente URL)' type='text' name='img' {...img}/>
        {loading ? <Button disabled>Postando...</Button> : <Button>Postar</Button>}
        <Error error={error}/>
      </form>
      <div>
        {img.preview && <div className={styles.preview} style={{backgroundImage: `url('${img.preview}')`}}></div>}
      </div>
    </section>
}

export default UserPost;
