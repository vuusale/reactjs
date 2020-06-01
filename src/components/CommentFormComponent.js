import React, { Component } from 'react';
import { 
    Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = value => value && value.length;
const maxLength = len => value => !value || value.length <= len;
const minLength = len => value => value && value.length >= len;

class CommentForm extends Component {

    constructor() {
        super();

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }

    render() {
        return(
            <div className="row">
                <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg" /> Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select 
                                defaultValue="1" 
                                model=".rating" id="rating" name="rating" className="form-control"
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>

                        <Label htmlFor="name">Your Name</Label>
                        <Row className="form-group">
                            <Col>
                                <Control.text 
                                model=".name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                id="name" 
                                name="name"
                                placeholder="Your Name"
                                />
                            <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} 
                                />
                            </Col>
                        </Row>

                        <Label htmlFor="message">Comment</Label>
                        <Row className="form-group">
                            <Col>
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
                            <Col>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
        )
    }
}

export default CommentForm;
