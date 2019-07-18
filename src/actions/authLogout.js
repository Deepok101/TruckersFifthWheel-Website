import { LOGOUT } from './type';

export function logout(){
    return function(dispatch){
        fetch('/api/accounts/auth/logout', {
            method: 'GET'
          }).then((res) => res.json())
            .then((data)=> 
            {dispatch({
                type: LOGOUT,
                payload: data
            })
            window.sessionStorage.setItem('loggedIn', (data.session))
        })
            

        
    }
}