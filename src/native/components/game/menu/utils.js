import { Actions } from 'react-native-router-flux';

export function redirection(props){

  if (props.winner != null){
    console.log("REDIRECT WINNER")
    Actions['finalResults']({type: 'reset'})
  }else if (props.votes_result != null) {
    console.log("REDIRECT RESULTS")
    Actions['turnResults']({type: 'reset'})
  }
  return true
}
