import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import TweetBox from "./tweet_box";

function Tweets({tweets, fetchTweets, newState}){
  const [, _setTweets] = useState([]);

  useEffect(() => {
    fetchTweets()
  }, []);

  useEffect(() => {
    _setTweets(tweets);
  }, [tweets]);
console.log(tweets.map(t => t));
  return (
    tweets.length === 0 ?
      <div>There are no Tweets</div> :
      <div>
        <h2>All Tweets</h2>
        { tweets.map(tweet => (
          <TweetBox key={tweet._id} text={tweet.text}/>
        ))}
      </div>
  )
}

export default withRouter(Tweets);