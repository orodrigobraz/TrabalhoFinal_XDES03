import React from 'react';
import FeedModal from './FeedModal';
import FeedFotos from './FeedFotos';


const Feed = () => {
    const [modal, setModal] = React.useState(null);

    return <div>
        {modal && <FeedModal foto={modal} />}
        <FeedFotos setModal={setModal} />
    </div>
}

export default Feed;