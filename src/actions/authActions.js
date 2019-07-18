import { FETCH_AUTH } from './type';

export function fetchAuth(user, pass){
    return function(dispatch){
     
            var body = {
                username: user,
                password: pass
            }
            fetch('/api/accounts/auth', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json()).then(data => {dispatch({
                type: FETCH_AUTH,
                payload: data
            })
            window.sessionStorage.setItem('loggedIn', (data.session))
            const auth_firstName = data.result.firstName;
            const auth_lastName = data.result.lastName;
            const id = data.result._id
            const token = data.token
            window.sessionStorage.setItem('auth_firstName', auth_firstName)
            window.sessionStorage.setItem('auth_lastName', auth_lastName)
            window.sessionStorage.setItem('id', id)
            window.sessionStorage.setItem('token', token)
            })
            
           
      
        
    }
}

