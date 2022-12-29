import React = require('react');
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { TransitionTo } from '../Functions/Transition';
import { Storage } from '../Storage';
import { useState } from 'react';

type Props = { storage: Storage };

export const Bookmark = (props: Props): JSX.Element => {
  const { storage } = props;
  const [count, setCount] = useState(storage.lengthBookmarkIds());
  return (
    <Row className="p-2">
      <Col className="col-5">
        後で見る <Badge>{count}</Badge>
      </Col>
      <Col className="col-4">
        <Button
          className="btn-sm btn-secondary"
          disabled={storage.lengthBookmarkIds() === 0}
          onClick={() => {
            const id = storage.shiftBookmarkIds();
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
          disabled={storage.lengthBookmarkIds() === 0}
          onClick={() => {
            storage.clearBookmarkIds();
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
