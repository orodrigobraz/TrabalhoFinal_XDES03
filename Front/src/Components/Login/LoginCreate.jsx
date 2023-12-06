import React from 'react'
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { UserContext } from '../../UserContext';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';


const LoginCreate = () => {
  const username = useForm('username');
  const email = useForm('email');
  const password = useForm('password');
  const passwordConf = useForm('passwordConf');

  const {userLogin} = React.useContext(UserContext);
  const {loading, error} = useFetch();


  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/criar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      usuario: username.value,
      email: email.value,
      senha: password.value,
      confirmasenha: passwordConf.value,
    }),
  });

  if (response.ok) {
    const result = await response.json();
    console.log(result);
    userLogin(username.value, password.value);
  } else {
    
    console.log('Erro ao criar usuário');
  }
}

  return (
    <section className='animeLeft'>
      <h1 className='title'>Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label='Usuário' type='text' name='username' {...username} />
        <Input label='E-mail' type='email' name='email' {...email} />
        <Input label='Senha' type='password' name='password' {...password}  />
        <Input label='Confirma Senha' type='password' name='passwordConf' {...passwordConf}/>


        {loading ? <Button disabled>Cadastrando...</Button> : <Button>Cadastrar</Button>}
        <Error error={error}/>
      </form>
    </section>
  )
}

export default LoginCreate