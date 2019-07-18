import { FETCH_AUTH, INPUTCHANGE, CACHE_AUTH, LOGOUT} from '../actions/type';

const initialState = {
    auth: "",
    username: "",
    bool: "",
    logout: ""
}

export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_AUTH: 
            return {
                ...state,
                items: action.payload
            }
        case INPUTCHANGE: 
            return {
                ...state,
                name: action.payload
        }
        case CACHE_AUTH:
            return {
                ...state,
                bool: action.payload
            }
        case LOGOUT: 
            return {
                ...state,
                logout: action.payload
            }


        default: 
            return state;
        

    }
}