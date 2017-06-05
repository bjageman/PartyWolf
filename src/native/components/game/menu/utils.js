import { Actions } from 'react-native-router-flux';

export function redirection(props){
  if (props.winner != null){
         Actions['finalResults']({type: 'reset'})
  }else if (props.votes_result != null && props.votes_result.length > 0) {
         Actions['turnResults']({type: 'reset'})
  }
  return true
}
