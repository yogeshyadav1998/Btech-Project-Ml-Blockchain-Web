const initialState = {
    authpage: false
}

const  authReducer = (state= initialState,action) =>{
    switch(action.type){
        case "OPEN_AUTH_PAGE":
            return{
                ...state, authpage: true
            }
        case "CLOSE_AUTH_PAGE":
            return{
                ...state, authpage: false
            }
        default :
            return state
    }
}

export default authReducer;