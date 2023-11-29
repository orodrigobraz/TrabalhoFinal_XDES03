import React from 'react';
import User from './User/User';
import Head from './Helper/Head';

const Home = () => {
  return <section className='container mainContainer'>
    <Head title='Livros' description='Página inicial' />
    <User />
  </section>
}

export default Home;