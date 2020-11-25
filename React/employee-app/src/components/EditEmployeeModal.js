import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

export class EditEmployeeModal extends Component {
  constructor(props) {
    super(props);

    this.state = { deps: [], snackbarOpen: false, snackbarMsg: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('https://localhost:44351/api/Department')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ deps: data });
      });
  }

  snackbarClose = (e) => {
    this.setState({ snackbarOpen: false });
  };

  handleSubmit(e) {
    e.preventDefault();
    fetch('https://localhost:44351/api/Employee', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        EmployeeID: e.target.EmployeeID.value,
        EmployeeName: e.target.EmployeeName.value,
        Department: e.target.Department.value,
        MailID: e.target.MailID.value,
        DOJ: e.target.DOJ.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ snackbarOpen: true, snackbarMsg: result });
        },
        (error) => {
          this.setState({ snackbarOpen: true, snackbarMsg: 'Failed to add' });
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
              Edit Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId='EmployeeID'>
                    <Form.Label>Employee ID: </Form.Label>
                    <Form.Control
                      type='text'
                      name='EmployeeID'
                      defaultValue={this.props.empid}
                      required
                      disabled
                    />
                  </Form.Group>
                  <Form.Group controlId='EmployeeName'>
                    <Form.Label>Employee Name: </Form.Label>
                    <Form.Control
                      type='text'
                      name='EmployeeName'
                      defaultValue={this.props.empname}
                      required
                      placeholder='Insert employee name...'
                    />
                  </Form.Group>
                  <Form.Group controlId='Department'>
                    <Form.Label>Department Name: </Form.Label>

                    <Form.Control as='select' defaultValue={this.props.depmt}>
                      {this.state.deps.map((dep) => (
                        <option key={dep.DepartmentID}>
                          {dep.DepartmentName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='MailID'>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                      type='text'
                      name='MailID'
                      defaultValue={this.props.mailid}
                      required
                      placeholder='Insert email...'
                    />
                  </Form.Group>
                  <Form.Group controlId='DOJ'>
                    <Form.Label>Date of joining: </Form.Label>
                    <Form.Control
                      type='date'
                      name='DOJ'
                      defaultValue={this.props.doj}
                      required
                      placeholder='Insert Date of joining...'
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button variant='primary' type='submit'>
                      Update
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
