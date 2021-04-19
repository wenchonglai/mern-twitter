import React, { useState, useEffect } from 'react';
import TweetBox from "./tweet_box";

export default function TweetCompose({composeTweet, newTweet}){
  function handleSubmit(e){
    e.preventDefault();

    const tweet = {text: _text};

    composeTweet(tweet);
    _setText('');
  }

  function update(){
    return e => _setText(e.currentTarget.value);
  }

  const [_text, _setText] = useState("");
  const [, _setNewTweet] = useState("");

  useEffect(() => {
    if (newTweet)
      _setNewTweet({newTweet: newTweet.text});
  }, [newTweet]);

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <input type="textarea"
            value={_text}
            onChange={update()}
            placeholder="Write your tweet..."
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
      <br />
      <TweetBox text={newTweet.text} />
    </div>
  )
}