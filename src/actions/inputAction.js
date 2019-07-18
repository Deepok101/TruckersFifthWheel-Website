import { INPUTCHANGE } from './type'


export function inputChange(value){
    return function(dispatch){
        dispatch({
            type: INPUTCHANGE,
            payload: value
        }) 
        
    }
}
