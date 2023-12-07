import React from 'react';
import FeedModal from './FeedModal';
import FeedFotos from './FeedFotos';


const Feed = ({user}) => {
    const [modal, setModal] = React.useState(null);
    const [pages, setPages] = React.useState([1]);
    const [infinite, setInfinite] = React.useState(true);

    React.useEffect(() => {
        let wait = false;
        function infiniteScroll() {
            if(infinite){
                const scroll = window.scrollY;
                const height = document.body.offsetHeight - window.innerHeight;
                if(scroll > height * 0.75 && !wait) {
                    setPages((pages) => [...pages, pages.length + 1]);
                    wait = true;
                    setTimeout(() => {
                        wait = false
                    }, 500);
                }
            }
        }

        window.addEventListener('wheel', infiniteScroll);
        window.addEventListener('scholl', infiniteScroll);
        return () => {
            window.removeEventListener('wheel', infiniteScroll);
            window.removeEventListener('scholl', infiniteScroll);
        }
    }, [infinite]);

    return <div>
        {modal && <FeedModal foto={modal} setModal={setModal} />}
        {pages.map(page => <FeedFotos key={page} user={user} page={page} setModal={setModal} setInfinite={setInfinite} />)}
    </div>
}

export default Feed;