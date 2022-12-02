import React = require('react');
import { Button, Col, Row } from 'react-bootstrap';
import { Storage } from '../Storage';
import { useState } from 'react';

interface Props {
  storage: Storage;
}
export const LoadingTiming = (props: Props) => {
  const { storage } = props;
  const [loadDelay, setLoadDelay] = useState(storage.loadDelay);
  return (
    <Row className="p-1">
      <Col className="col-6">読み込みのタイミング</Col>
      <Col className="col-3">
        <input
          className="form-control"
          value={loadDelay}
          onChange={(event) => {
            setLoadDelay(parseInt(event.target.value));
          }}
        />
      </Col>
      <Col className="col-3">
        <Button
          className="btn-sm"
          aria-disabled={storage.loadDelay === loadDelay}
          onClick={() => {
            storage.loadDelay = loadDelay;
            storage.save();
          }}
        >
          更新
        </Button>
      </Col>
    </Row>
  );
};
