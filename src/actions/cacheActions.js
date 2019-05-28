import { CACHE_AUTH } from './type';

export function changeCache(){
    return function(dispatch){
        fetch('/api/accounts/auth', {
            method: 'GET'
          }).then((res) => res.json())
            .then((data)=> 
            {dispatch({
                type: CACHE_AUTH,
                payload: data
            })})
        
    }
}