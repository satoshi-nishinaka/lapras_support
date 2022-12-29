import React = require('react');
import { Storage } from '../Storage';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { useState } from 'react';

interface Props {
  storage: Storage;
}
export const CheckedCandidates = (props: Props) => {
  const { storage } = props;
  const [count, setCount] = useState(storage.checkedCandidateIds.length);
  return (
    <Row className="p-2">
      <Col className="col-8">
        既読 <Badge>{count}</Badge>
      </Col>
      <Col>
        <Button
          className="btn-sm btn-secondary"
          disabled={storage.checkedCandidateIds.length === 0}
          onClick={() => {
            storage.checkedCandidateIds = [];
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
