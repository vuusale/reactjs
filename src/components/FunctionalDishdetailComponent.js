import React from 'react';

import { Card, CardText, CardBody, CardImg, CardTitle, 
    Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

import { baseURL } from '../shared/baseURL';
import { Link } from 'react-router-dom';

import { Loading } from './LoadingComponent';
import CommentForm from './CommentFormComponent';

function RenderComments({comments, postComment, dishId}) {
    
    if (!comments) return(<div></div>);

    const coms = comments.map(comment => {
        const date = new Date(comment.date);

        return(
            <Fade in>
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author} - {Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(date)}</p>
                </li>
            </Fade>
        )
    });

    return (
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                <Stagger in>
                    {coms}
                </Stagger>
            </ul>
            <CommentForm 
                dishId={dishId} 
                postComment={postComment} 
            />
        </div>
    );
}

function RenderDish({dish}) {
    
    if (!dish) return(<div></div>);
    return(
        <div className="col-12 col-md-5 m-1">
            <FadeTransform in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <Card>  
                    <CardImg top width="100%" src={baseURL + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    )
}

const FunctionalDishdetail = props => {    

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } 
    
    else if (props.errMsg) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMsg}</h4>
                </div>
            </div>
        );
    }

    else if (!props.dish) return (<div></div>);
    
    return (
        <div className="container">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments 
                    comments={props.comments}
                    postComment={props.postComment}
                    dishId={props.dish.id}
                />
            </div>
        </div>
        
    );
} 

export default FunctionalDishdetail;