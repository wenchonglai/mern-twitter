import * as TweetActions from "../actions/tweet_actions";

const TweetsReducer = (state = {all: {}, user: {}, new: undefined}, action) => {
  Object.freeze(state);
  const newState = {...state};

  switch(action.type){
    case TweetActions.RECEIVE_TWEETS:
      newState.all = action.tweets.data;
      return newState;
    case TweetActions.RECEIVE_USER_TWEETS:
      newState.user = action.tweets.data;
      return newState;
    case TweetActions.RECEIVE_NEW_TWEET:
      newState.new = action.tweet.data;
      return newState;
    default:
      return state;
  }
}

export default TweetsReducer;