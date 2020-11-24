import React, { Component } from 'react';
import { Modal, Button, Row, Column, Form } from 'react-bootstrap';

export class AddDepartmentModal extends Component {
  constructor(props) {
    super(props);
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
          <div className='container'>{/* Add form fields */}</div>
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
