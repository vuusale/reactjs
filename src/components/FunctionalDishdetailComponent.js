import React from 'react';
import { Card, CardText, CardBody, CardImg, CardTitle, 
    Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentFormComponent';

function RenderComments({comments}) {
    
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
            <CommentForm />
        </div>
    );
}

function RenderDish({dish}) {
    
    if (!dish) return(<div></div>);
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>  
                <CardImg top width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

const FunctionalDishdetail = props => {    

    if (!props.dish) return (<div></div>);
    
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
                <RenderComments comments={props.comments} />
            </div>
        </div>
        
    );
} 

export default FunctionalDishdetail;