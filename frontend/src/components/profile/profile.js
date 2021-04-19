import React, { useState, useEffect } from "react";
import TweetBox from "../tweets/tweet_box";

function Profile({fetchUserTweets, currentUser, tweets}){
  const [, _setTweets] = useState(tweets);

  useEffect(() => {
    fetchUserTweets(currentUser.id)
  }, []);

  useEffect(() => {
    _setTweets(tweets);
  }, [tweets]);

  return (
    tweets.length === 0 ?
      <div>This user has no Tweets</div> :
      <div>
        <h2>All of This User's Tweets</h2>
        {tweets.map(tweet => (
          <TweetBox key={tweet._id} text={tweet.text} />
        ))}
      </div>
  )
}

export default Profile;