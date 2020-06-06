import React from 'react';
import { Card, CardText, CardBody, CardImg, CardTitle, 
    Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';
import { Loading } from './LoadingComponent';
import { baseURL } from '../shared/baseURL';

function RenderComments({comments, addComment, dishId}) {
    
    if (!comments) return(<div></div>);

    const coms = comments.map(comment => {
        const date = new Date(comment.date);

        return(
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author} - {Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(date)}</p>
            </li>
        )
    });

    return (
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {coms}
            </ul>
            <CommentForm 
                dishId={dishId} 
                addComment={addComment} 
            />
        </div>
    );
}

function RenderDish({dish}) {
    
    if (!dish) return(<div></div>);
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>  
                <CardImg top width="100%" src={baseURL + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
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
                    addComment={props.addComment}
                    dishId={props.dish.id}
                />
            </div>
        </div>
        
    );
} 

export default FunctionalDishdetail;