// import { dbService } from 'fbase';
import { dbService, nweetsCollection } from 'fbase';
import { addDoc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import React, {useState} from "react";
import { useEffect } from 'react';
import Nweet from 'components/Nweet';

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        onSnapshot(nweetsCollection, (snapshot) => {
            console.log(snapshot.docs)
            const nweetArray = snapshot.docs.map((doc) => (
                {id: doc.id, ...doc.data()}
            ))
            setNweets(nweetArray)
        })
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()
        await addDoc(nweetsCollection, {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        })
        setNweet('');
    }
    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value)
    }

    console.log(nweets)
    return(
        <div>
            <form action="" onSubmit={onSubmit}>
                <input type="text" value={nweet} onChange={onChange} placeholder="What's on your mind?" />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map(nweet => 
                    (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={userObj.uid === nweet.creatorId}/>
                    )
                )}
            </div>
        </div>
    )
};
export default Home;