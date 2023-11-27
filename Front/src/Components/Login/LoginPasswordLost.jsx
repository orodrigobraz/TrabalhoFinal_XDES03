import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../Api';

const LoginPasswordLost = () => {
    const login = useForm();
    const {data, loading, error, request} = useFetch();

    async function handleSubmit(event) {
      event.preventDefault();
      const {url, options} = PASSWORD_LOST({login: login.value, url: window.location.href.replace('perdeu', 'resetar'),})
      request(url, options)
    }

    return <section>
      <h1 className='title'>Perdeu a senha?</h1>
      <form onSubmit={handleSubmit}>
        <Input label='Email / Usuário' type='text' name='login' {...login} />
        <Button>Enviar Email</Button>
      </form>
    </section>
}

export default LoginPasswordLost;