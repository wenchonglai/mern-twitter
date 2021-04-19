import {connect} from "react-redux";
import {fetchTweets} from "../../actions/tweet_actions";
import Tweets from "./tweets";

const mapSTP = ({tweets}) => ({
  tweets: Object.values(tweets.all)
});

const mapDTP = dispatch => ({
  fetchTweets: () => dispatch(fetchTweets())
});

export default connect(mapSTP, mapDTP)(Tweets);