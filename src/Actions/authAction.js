import axios from 'axios';

export const openAuthPage = dispatch =>{
    dispatch({
        type: "OPEN_AUTH_PAGE"
    })
};

export const closeAuthPage = dispatch =>{
    dispatch({
        type: "CLOSE_AUTH_PAGE"
    })
}