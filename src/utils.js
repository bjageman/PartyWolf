import * as actionCreators from './actions';
import { bindActionCreators } from 'redux';

export function mapStateToProps(state) {
  try{
    props = {
      user: state.user.data,
      game: state.game.data,
      votes_result: state.game.votes_result,
      winner: state.game.winner,
    }
    if (state.game.public_listing && state.game.public_listing.length > 0){
      props.public_listing = state.game.public_listing
    }

    if (props.game != null && props.user != null) {
      var player = props.game.players.find(function(player){return player.user.id === props.user.id;});
      if (player != null) {
        props.user.player = player
      }

    }
  }catch(err){
    console.log("Error occurred", err)
  }
  return props
}

export function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
