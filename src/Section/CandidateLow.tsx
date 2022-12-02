import React = require('react');
import { Storage } from '../Storage';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { useState } from 'react';

interface Props {
  storage: Storage;
}
export const CandidateLow = (props: Props) => {
  const { storage } = props;
  const [count, setCount] = useState(storage.candidateLowIds.length);
  return (
    <Row className="p-2">
      <Col className="col-8">
        転職意欲： 中 <Badge>{count}</Badge>
      </Col>
      <Col>
        <Button
          className="btn-sm btn-secondary"
          onClick={() => {
            storage.candidateLowIds = [];
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
