import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';

const required = value => value && value.length;
const maxLength = len => value => !value || value.length <= len;
const minLength = len => value => value && value.length >= len;
const isNumber = value => !isNaN(Number(value));
const validEmail = value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

class Contact extends Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.resetFeedbackForm();
        this.props.postFeedback({
            firstName: values.firstName, 
            lastName: values.lastName, 
            telnum: values.telnum, 
            email: values.email, 
            agree: values.agree, 
            contactType: values.contactType, 
            message: values.message
        });
    }

    render() {
        return(
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr />
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i> +852 1234 5678<br />
                            <i className="fa fa-fax"></i> +852 8765 4321<br />
                            <i className="fa fa-envelope"></i> <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info" href="#skype"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstName" md={2}>First name</Label>
                                <Col md={10}>
                                    <Control.text 
                                    model=".firstName"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    id="firstName" 
                                    name="firstName"
                                    placeholder="First Name"
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".firstName"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} 
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastName" md={2}>Last name</Label>
                                <Col md={10}>
                                    <Control.text
                                    model=".lastName"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    id="lastName" 
                                    name="lastName" 
                                    placeholder="Last Name"
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".lastName"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} 
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text 
                                    model=".telnum"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                    }}
                                    id="telnum" 
                                    name="telnum" 
                                    placeholder="Telephone number"
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".telnum"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 numbers',
                                        maxLength: 'Must be 15 numbers or less',
                                        isNumber: 'Must be  a number'
                                    }} 
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text 
                                    model=".email" 
                                    className="form-control"
                                    validators={{
                                        required, validEmail
                                    }}
                                    id="email" 
                                    name="email" 
                                    placeholder="Email"
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".email"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        validEmail: 'Must be a valid email'
                                    }} 
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox 
                                            model=".agree" 
                                            className="form-check-input"
                                            name="agree" 
                                            /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select 
                                    model=".contactType"
                                    className="form-control"
                                    name="contactType"
                                    >
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea 
                                        model=".message" 
                                        className="form-control"
                                        id="message" 
                                        name="message" 
                                        rows="12" 
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Contact;