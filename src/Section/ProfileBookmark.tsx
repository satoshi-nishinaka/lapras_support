import React = require('react');
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { Storage } from '../Storage';
import { useState } from 'react';
import { ProfilePageHelper } from '../ContentScripts/ProfilePageHelper';

type Props = { storage: Storage };

export const ProfileBookmark = (props: Props): JSX.Element => {
  const { storage } = props;
  const [count, setCount] = useState(storage.lengthProfileBookmarkIds());
  return (
    <Row className="p-2">
      <Col className="col-5">
        [Profile]後で見る <Badge>{count}</Badge>
      </Col>
      <Col className="col-4">
        <Button
          className="btn-sm btn-secondary"
          disabled={storage.lengthProfileBookmarkIds() === 0}
          onClick={() => {
            const id = storage.shiftProfileBookmarkIds();
            if (id) {
              storage.pushCheckedProfileIds(id);
              storage.save().then(() => {
                ProfilePageHelper.TransitionTo(id, true);
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
          disabled={storage.lengthProfileBookmarkIds() === 0}
          onClick={() => {
            storage.clearProfileBookmarkIds();
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
