import React from 'react';
import FeedModal from './FeedModal';
import FeedFotos from './FeedFotos';


const Feed = ({user}) => {
    const [modal, setModal] = React.useState(null);

    return <div>
        {modal && <FeedModal foto={modal} setModal={setModal} />}
        <FeedFotos user={user} setModal={setModal} />
    </div>
}

export default Feed;