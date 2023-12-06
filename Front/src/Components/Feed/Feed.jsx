import React from 'react';
import FeedModal from './FeedModal';
import FeedFotos from './FeedFotos';


const Feed = () => {
    const [modal, setModal] = React.useState(null);
    const userId = Number(localStorage.getItem('userId')); 

    return <div>
        {modal && <FeedModal foto={modal} />}
       <FeedFotos setModal={setModal} userId={userId}/>
    </div>
}

export default Feed;