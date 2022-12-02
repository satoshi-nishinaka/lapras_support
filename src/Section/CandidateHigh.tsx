import React = require('react');
import { Storage } from '../Storage';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { useState } from 'react';

interface Props {
  storage: Storage;
}
export const CandidateHigh = (props: Props) => {
  const { storage } = props;
  const [count, setCount] = useState(storage.candidateHighIds.length);
  return (
    <Row className="p-2">
      <Col className="col-8">
        転職意欲： 高 <Badge>{count}</Badge>
      </Col>
      <Col>
        <Button
          className="btn-sm btn-secondary"
          onClick={() => {
            storage.candidateHighIds = [];
            storage.save(() => {
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
