import { dbService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const thisDocRef = doc(dbService, 'nweets', `${nweetObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      await deleteDoc(thisDocRef);
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = (event) => {
    event.preventDefault();
    updateDoc(thisDocRef, {
      text: newNweet,
    });
    toggleEditing();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form action='' onSubmit={onSubmit}>
            <input
              value={newNweet}
              type='text'
              required
              placeholder='Edit youre nweet'
              onChange={onChange}
            />
            <input type='submit' value='Update Nweet' />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
