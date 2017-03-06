import React from 'react';
import { Alert } from 'react-bootstrap';
import { ValidationError } from 'jsonschema';

const JsonMessage = ({answer, error}) => {
  if (error) {

    if (error instanceof ValidationError) {
      return (
        <div>
          <hr/>
          <Alert bsStyle="danger">
            <p>
              {error.property} {error.message}
            </p>
            <pre><code>{JSON.stringify(answer, null, 2)}</code></pre>
          </Alert>
        </div>
      )
    } else {
      return (
        <div>
          <hr/>
          <Alert bsStyle="danger">
            <p>
              {error.message}
            </p>
          </Alert>
        </div>
      )
    }
  } else if (answer) {
    return (
      <div>
        <hr/>
        <Alert bsStyle="success">
          <pre><code>{JSON.stringify(answer, null, 2)}</code></pre>
        </Alert>
      </div>
    )
  } else {
    return <div></div>
  }
}

JsonMessage.propTypes = {
  answer: React.PropTypes.object,
  error: React.PropTypes.object
}

export default JsonMessage;
