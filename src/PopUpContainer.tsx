import * as React from 'react';
import { Storage } from './Storage';
import { CandidateHigh } from './Section/CandidateHigh';
import { CandidateLow } from './Section/CandidateLow';
import { CheckedCandidates } from './Section/CheckedCandidates';
import { Container } from 'react-bootstrap';
import { LoadingTiming } from './Section/LoadingTiming';
import { createRoot } from 'react-dom/client';

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

const container = document.getElementById('root');
if (container) {
  const storage = new Storage();
  storage.load(() => {
    const root = createRoot(container);
    root.render(<PopupContainer storage={storage} />);
  });
}
