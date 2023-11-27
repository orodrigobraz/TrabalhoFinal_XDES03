import React from 'react';
import styles from './UserPost.module.css'
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_POST } from '../../Api';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';

const UserPost = () => {
    const titulo = useForm();
    const autor = useForm();
    const editora = useForm();
    const numPag = useForm('number');
    const [img, setImg] = React.useState({});
    const {data, error, loading, request} = useFetch();
    const navigate = useNavigate();

    React.useEffect(() => {
      if(data) navigate('/conta');
    }, [data, navigate])

    function handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData();
      formData.append('img', img.raw);
      formData.append('titulo', titulo.value);
      formData.append('autor', autor.value);
      formData.append('editora', editora.value);
      formData.append('pagnum', numPag.value);

      const token = window.localStorage.getItem('token');
      const {url, options} = PHOTO_POST(formData, token);
      request(url, options);
    }

    function handleImgChange({target}) {
      setImg({
        preview: URL.createObjectURL(target.files[0]),
        raw: target.files[0],
      });
    }

    return <section className={`${styles.userPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label='Título' type='text' name='titulo' {...titulo}/>
        <Input label='Autor' type='text' name='autor' {...autor}/>
        <Input label='Editora' type='text' name='editora' {...editora}/>
        <Input label='Número de páginas' type='number' name='pagnum' {...numPag}/>
        <label>Imagem de capa</label>
        <input className={styles.file} type="file" name='img' id='img' onChange={handleImgChange}/>
        {loading ? <Button disabled>Postando...</Button> : <Button>Postar</Button>}
        <Error error={error}/>
      </form>
      <div>
        {img.preview && <div className={styles.preview} style={{backgroundImage: `url('${img.preview}')`}}></div>}
      </div>
    </section>
}

export default UserPost;