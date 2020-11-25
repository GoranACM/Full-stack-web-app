import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepartmentModal } from './AddDepartmentModal';
import { EditDepartmentModal } from './EditDepartmentModal';
export class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = { emps: [], addModalShow: false, editModalShow: false };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch('https://localhost:44351/api/Employee')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ emps: data });
      });
  }

  componentDidUpdate() {
    this.refreshList();
  }

  deleteEmp(empid) {
    if (window.confirm('Are you sure you want to delete?')) {
      fetch('https://localhost:44351/api/Employee/' + empid, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }
  }

  render() {
    const { emps, empid, empname } = this.state;

    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div>
        <Table className='mt-4' striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Date of joining</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {emps.map((emp) => (
              <tr key={emp.EmployeeID}>
                <td>{emp.EmployeeID}</td>
                <td>{emp.EmployeeName}</td>
                <td>{emp.Department}</td>
                <td>{emp.MailID}</td>
                <td>{emp.DOJ}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className='mr-2'
                      variant='info'
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          empid: emp.EmployeeID,
                          empname: emp.EmployeeName,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className='mr-2'
                      variant='danger'
                      onClick={() => this.deleteEmp(emp.EmployeeID)}
                    >
                      Delete
                    </Button>
                    <EditDepartmentModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      depid={empid}
                      depname={empname}
                    />
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ButtonToolbar>
          <Button
            variant='primary'
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Employee
          </Button>
          <AddDepartmentModal
            show={this.state.addModalShow}
            onHide={addModalClose}
          />
        </ButtonToolbar>
      </div>
    );
  }
}
