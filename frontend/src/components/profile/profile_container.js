
import {connect} from "react-redux";
import {fetchUserTweets} from "../../actions/tweet_actions";
import Profile from "./profile";

const mapSTP = ({tweets, session}) => ({
  tweets: Object.values(tweets.user),
  currentUser: session.user
});

const mapDTP = dispatch => ({
  fetchUserTweets: id => dispatch(fetchUserTweets(id))
});

export default connect(mapSTP, mapDTP)(Profile);