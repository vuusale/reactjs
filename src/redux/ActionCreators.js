import * as ActionTypes from './ActionTypes';
import { baseURL } from '../shared/baseURL';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => dispatch => {
    const newComment = {
        dishId,
        rating,
        author,
        comment
    };
    newComment.date = new Date().toISOString();
    return fetch(baseURL + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) return response;
            const error = new Error(`Error ${response.status}: ${response.statusText}`)
            error.response = response;
            throw error;
        }, 
        error => {
            const errMsg = new Error(error.message);
            throw errMsg;
        })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log(`Post comments ${error.message}`);
            alert(`Your comment could not be posted\nError: ${error.message}`)
        })
}

export const fetchDishes = () => dispatch => {
    dispatch(dishesLoading());
    
    return fetch(baseURL + 'dishes')   
        .then(response => {
            if (response.ok) return response;
            const error = new Error(`Error ${response.status}: ${response.statusText}`)
            error.response = response;
            throw error;
        }, 
        error => {
            const errMsg = new Error(error.message);
            throw errMsg;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
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
        .then(response => {
            if (response.ok) return response;
            const error = new Error(`Error ${response.status}: ${response.statusText}`)
            error.response = response;
            throw error;
        }, 
        error => {
            const errMsg = new Error(error.message);
            throw errMsg;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
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
        .then(response => {
            if (response.ok) return response;
            const error = new Error(`Error ${response.status}: ${response.statusText}`)
            error.response = response;
            throw error;
        }, 
        error => {
            const errMsg = new Error(error.message);
            throw errMsg;
        })  
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
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


export const fetchLeaders = () => dispatch => {
    dispatch(leadersLoading());
    
    return fetch(baseURL + 'leaders')
        .then(response => {
            if (response.ok) return response;
            const error = new Error(`Error ${response.status}: ${response.statusText}`)
            error.response = response;
            throw error;
        }, 
        error => {
            const errMsg = new Error(error.message);
            throw errMsg;
        })  
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
}

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = errMsg => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errMsg
});

export const addLeaders = leaders => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFeedback = feedback => dispatch => {
    return fetch(baseURL + 'feedback', {
        method: 'POST',
        body: JSON.stringify(feedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            console.log('first then: ', response)
            if (response.ok) return response;
            const error = new Error(`Error ${response.status}: ${response.statusText}`)
            error.response = response;
            throw error;
        }, 
        error => {
            const errMsg = new Error(error.message);
            throw errMsg;
        })
        .then(response => response.json())
        .then(response => alert(`Thank you for your feedback!\n${JSON.stringify(response)}`))
        .catch(error => {
            console.log(`Post comments ${error.message}`);
            alert(`Your comment could not be posted\nError: ${error.message}`)
        })
}