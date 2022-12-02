import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Storage } from './Storage';
import { CandidateHigh } from './Section/CandidateHigh';
import { CandidateLow } from './Section/CandidateLow';
import { CheckedCandidates } from './Section/CheckedCandidates';
import { Container } from 'react-bootstrap';
import { LoadingTiming } from './Section/LoadingTiming';

type Props = { storage: Storage };

const PopupContainer = ({ storage }: Props): JSX.Element => {
  return (
    <Container>
      <CandidateHigh storage={storage} />
      <CandidateLow storage={storage} />
      <CheckedCandidates storage={storage} />
      <LoadingTiming storage={storage} />
    </Container>
  );
};

const root = document.getElementById('root');
if (root) {
  const storage = new Storage();
  storage.load(() => {
    ReactDOM.render(<PopupContainer storage={storage} />, root);
  });
}
