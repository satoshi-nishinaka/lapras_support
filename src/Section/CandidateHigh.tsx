import React = require('react');
import { Storage } from '../Storage';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { TransitionTo } from '../Functions/Transition';

interface Props {
  storage: Storage;
}
export const CandidateHigh = (props: Props) => {
  const { storage } = props;
  const [count, setCount] = useState(storage.lengthCandidateHighIds());
  return (
    <Row className="p-2">
      <Col className="col-5">
        転職意欲： 高 <Badge>{count}</Badge>
      </Col>
      <Col className="col-4">
        <Button
          className="btn-sm btn-secondary"
          disabled={storage.lengthCandidateHighIds() === 0}
          onClick={() => {
            const id = storage.shiftCandidateHighIds();
            if (id) {
              storage.pushCheckedCandidateIds(id);
              storage.save().then(() => {
                TransitionTo(id, true);
              });
            }
          }}
        >
          候補者を見る
        </Button>
      </Col>
      <Col className="col-3">
        <Button
          className="btn-sm btn-secondary"
          disabled={storage.lengthCandidateHighIds() === 0}
          onClick={() => {
            storage.clearCandidateHighIds();
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
