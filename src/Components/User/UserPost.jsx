import React from 'react';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import useFetch from '../../Hooks/useFetch';
import { USER_POST } from '../../Api';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helper/Error';

const UserPost = () => {
    const username = useForm();
    const email = useForm('email');
    const password = useForm('password');

    const {userLogin} = React.useContext(UserContext);
    const {loading, error, request} = useFetch();

    async function handleSubmit(event) {
        event.preventDefault();
        const {url, options} = USER_POST({
          username: username.value,
          email: email.value,
          password: password.value,
        });
        const {response} = await request(url, options);
        if(response.ok) userLogin(username.value, password.value);
      }

    return (
        <section className='animeLeft'>
            <form onSubmit={handleSubmit}>
                <Input label='Título' type='text' name='title' />
                <Input label='Autor' type='text' name='author' />
                <Input label='Editora' type='text' name='publisher' />
                <Input label='Número de páginas' type='number' name='pagnumber' />
                <Input label='País do autor' type='text' name='country-author' />
                
                {loading ? <Button disabled>Postando...</Button> : <Button>Postar</Button>}
                <Error error={error}/>
            </form>
            </section>
    )
}

export default UserPost;