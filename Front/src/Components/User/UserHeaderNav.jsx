import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import {ReactComponent as MeusLivros} from '../../Assets/feed.svg';
import {ReactComponent as Estatisticas} from '../../Assets/estatisticas.svg';
import {ReactComponent as AdicionarLivro} from '../../Assets/adicionar.svg';
import {ReactComponent as Sair} from '../../Assets/sair.svg';
import styles from './UserHeaderNav.module.css'
import useMedia from '../../Hooks/useMedia';


const UserHeaderNav = () => {
    const {userLogout} = React.useContext(UserContext);
    const mobile = useMedia('(max-width: 40rem)');
    const [mobileMenu, setMobileMenu] = React.useState(false);
    const navigate = useNavigate();
    
    const {pathname} = useLocation();
    React.useEffect(() => {
        setMobileMenu(false);
    }, [pathname]); 

    function handleLogout() {
        userLogout(navigate('/login'));
    }

    return (
        <>
            {mobile && <button aria-label='Menu' className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`} onClick={() => setMobileMenu(!mobileMenu)}></button>}
            <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
                <NavLink to='/conta' end><MeusLivros />{mobile && 'Meus livros'}</NavLink>
                <NavLink to='/conta/estatisticas'><Estatisticas />{mobile && 'Estatísticas'}</NavLink>
                <NavLink to='/conta/postar'><AdicionarLivro />{mobile && 'Adicionar livro'}</NavLink>
                <button onClick={handleLogout}><Sair />{mobile && 'Sair'}</button>
            </nav>
        </>
    )
}

export default UserHeaderNav;