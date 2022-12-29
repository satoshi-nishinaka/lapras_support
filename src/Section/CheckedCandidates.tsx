import React = require('react');
import { Storage } from '../Storage';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { useState } from 'react';

interface Props {
  storage: Storage;
}
export const CheckedCandidates = (props: Props) => {
  const { storage } = props;
  const [count, setCount] = useState(storage.lengthCheckedCandidateIds());
  return (
    <Row className="p-2">
      <Col className="col-8">
        既読 <Badge>{count}</Badge>
      </Col>
      <Col>
        <Button
          className="btn-sm btn-secondary"
          disabled={storage.lengthCheckedCandidateIds() === 0}
          onClick={() => {
            storage.clearCheckedCandidateIds();
            storage.save().then(() => {
              setCount(0);
            });
          }}
        >
          クリア
        </Button>
      </Col>
    </Row>
  );
};
