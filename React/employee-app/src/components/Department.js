import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepartmentModal } from './AddDepartmentModal';
import { EditDepartmentModal } from './EditDepartmentModal';

export class Department extends Component {
  constructor(props) {
    super(props);
    this.state = { deps: [], addModalShow: false, editModalShow: false };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList() {
    fetch('https://localhost:44351/api/Department')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ deps: data });
      });
  }

  componentWillUpdate() {
    this.refreshList();
  }

  render() {
    const { deps, depid, depname } = this.state;

    let addModalClose = () => this.setState({ addModalShow: false });
    let editModalClose = () => this.setState({ editModalShow: false });

    return (
      <div>
        <Table className='mt-4' striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Department Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {deps.map((dep) => (
              <tr key={dep.DepartmentID}>
                <td>{dep.DepartmentID}</td>
                <td>{dep.DepartmentName}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className='mr-2'
                      variant='info'
                      onClick={() =>
                        this.setState({
                          editModalShow: true,
                          depid: dep.DepartmentID,
                          depname: dep.DepartmentName,
                        })
                      }
                    >
                      Edit
                    </Button>
                    <EditDepartmentModal
                      show={this.state.editModalShow}
                      onHide={editModalClose}
                      depid={depid}
                      depname={depname}
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
            Add Department
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
