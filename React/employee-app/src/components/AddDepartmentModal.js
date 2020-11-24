import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, FormGroup } from 'react-bootstrap';

export class AddDepartmentModal extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('https://localhost:44351/api/Department', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        DepartmentID: null,
        DepartmentName: e.target.DepartmentName.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert('Failed to add');
        }
      );
  }

  render() {
    return (
      <Modal
        {...this.props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Add Department
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId='DepartmentName'>
                    <Form.Label>Department Name: </Form.Label>
                    <Form.Control
                      type='text'
                      name='DepartmentName'
                      required
                      placeholder='Insert department name...'
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant='primary' type='submit'>
                      Add
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
