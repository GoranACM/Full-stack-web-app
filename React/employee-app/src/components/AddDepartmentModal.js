import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

export class AddDepartmentModal extends Component {
  constructor(props) {
    super(props);

    this.state = { snackbarOpen: false, snacbarMsg: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  snackbarClose = (e) => {
    this.setState({ snackbarOpen: false });
  };

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
          this.setState({ snackbarOpen: true, snackbarMsg: result });
          //   alert(result);
        },
        (error) => {
          this.setState({ snackbarOpen: true, snackbarMsg: 'Failed to add' });

          //   alert('Failed to add');
        }
      );
  }

  render() {
    return (
      <div className='container'>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id='message-id'>{this.state.snackbarMsg}</span>}
          action={[
            <IconButton
              key='close'
              arial-label='Close'
              color='inherit'
              onClick={this.snackbarClose}
            >
              x
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}
