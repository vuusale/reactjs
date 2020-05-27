import React from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, Media } from 'reactstrap';

function RenderCard({ company }) {
    
    return(
        <Card >
            <CardImg src={company.logo} alt={company.name} />
            <CardBody>
                <CardTitle>{company.name}</CardTitle>
                <CardText>{company.description}</CardText>
            </CardBody>
        </Card>
    );
}

const Demo = props => {
    const imgStyle = {
        maxHeight: 128,
        maxWidth: 128
    }

    const companiesMedia = props.companies.results.results.map(company => {
        return (
          <div key={company.id} className="col-12 mt-5">
            <Media tag="li">
              <Media left middle>
                  <Media object src={company.logo} alt={company.name} style={imgStyle} />
              </Media>
              <Media body className="ml-5">
                <Media heading>{company.name}</Media>
                <p>{company.description}</p>
              </Media>
            </Media>
          </div>
        );
    });
    
    const companies = props.companies.results.results.map(company => {
        return (
            <div key={company.id} className="col-12 col-md-5 m-1">
                <RenderCard company={company} />
            </div>
        ); 
    });

    return (
        <div className="container">
            <div className="row row-content">
                {companies}
                {companiesMedia}
            </div>
        </div>
    );
}

    

export default Demo;