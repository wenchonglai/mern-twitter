import {connect} from "react-redux";
import {composeTweet} from "../../actions/tweet_actions";
import TweetCompose from "./tweet_compose";

const mapSTP = ({session, tweets}) => ({
  currentUser: session.user,
  newTweet: tweets.new 
});

const mapDTP = dispatch => ({
  composeTweet: data => dispatch(composeTweet(data))
});

export default connect(mapSTP, mapDTP)(TweetCompose);