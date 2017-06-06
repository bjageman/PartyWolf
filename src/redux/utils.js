import * as actionCreators from './actions';
import { bindActionCreators } from 'redux';

export function mapStateToProps(state) {
  var props = {}
  props = {
    user: state.user.data,
    game: state.game.data,
    votes_result: state.game.votes_result,
    winner: state.game.winner,
  }
  if (state.game.public_listing && state.game.public_listing.length > 0){
    props.public_listing = state.game.public_listing
  }

  if (state.game.data != null && state.user.data != null) {
    var player = state.game.data.players.find(function(player){return player.user.id === props.user.id;});
    if (player != null) {
      props.user.player = player
      props.user.player.creator = false
      if (props.user.id == props.game.creator.id){
        props.user.player.is_creator = true
      }
    }
  }else{
    if (props.user != null) {
      props.user.player = null
    }

  }

  return props
}

export function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
