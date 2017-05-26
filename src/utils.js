import * as actionCreators from './actions';
import { bindActionCreators } from 'redux';

export function mapStateToProps(state) {
  console.log("mapping props")
  props = {
    user: state.user.data,
    game: state.game.data,
    public_listing: state.game.public_listing,
    votes_result: state.game.votes_result,
    winner: state.game.winner,
  }
  console.log("props mapped")
  if (props.game != null && props.user != null) {
    var player = props.game.players.find(function(player){return player.user.id === props.user.id;});
    if (player != null) {
      props.user.player = player
    }

  }
  console.log("returning props")

  return props
}

export function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
