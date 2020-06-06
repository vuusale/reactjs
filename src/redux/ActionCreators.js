import * as ActionTypes from './ActionTypes';
import { baseURL } from '../shared/baseURL';

export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId,
        rating,
        author,
        comment
    }
});

export const fetchDishes = () => dispatch => {
    dispatch(dishesLoading());
    
    return fetch(baseURL + 'dishes')   
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)));
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = errMsg => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMsg
});

export const addDishes = dishes => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});


export const fetchComments = () => dispatch => {
    return fetch(baseURL + 'comments')   
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)));
}

export const commentsFailed = errMsg => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMsg
});

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


export const fetchPromos = () => dispatch => {
    dispatch(promosLoading());
    
    return fetch(baseURL + 'promotions')   
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = errMsg => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMsg
});

export const addPromos = promos => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});