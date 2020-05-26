import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText } from 'reactstrap';

function RenderCard({ company }) {
    
    return(
        <Card>
            <CardImg src={company.logo} alt={company.name} />
            <CardBody>
                <CardTitle>{company.name}</CardTitle>
                <CardText>{company.description}</CardText>
            </CardBody>
        </Card>
    );
}

const Demo = props => {
    
    const companies = props.companies.results.results.map(company => {
        return (
            <div key={company.id} className="col-12 col-md-5 m-1">
                <RenderCard company={company} />
            </div>
        ); 
    });

    return (
        <div className="container">
            <div className="row">
                {companies}
            </div>
        </div>
    );
}

    

export default Demo;