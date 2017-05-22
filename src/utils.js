import * as actionCreators from './actions';
import { bindActionCreators } from 'redux';

export function mapStateToProps(state) {
  console.log(state)
  props = {
    user: state.user.data,
    game: state.game.data,
  }
  if (props.game != null && props.user != null) {
    var player = props.game.players.find(function(player){return player.user.id === props.user.id;});
    if (player != null) {
      props.user.player = player
    }

  }
  return props
}

export function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
