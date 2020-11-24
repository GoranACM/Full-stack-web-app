import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class Error extends Component {
  render() {
    return (
      <div className='mt-5 d-flex justify-content-left'>
        <h3>Something bad happened!!!</h3>
        <Button>Go home</Button>
      </div>
    );
  }
}
