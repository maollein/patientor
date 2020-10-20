import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Entry as IEntry } from '../types';
import EntryDetails from './EntryDetails';
import EntryIcon from './EntryIcon';

interface EntryProps {
  entry: IEntry;
}

const Entry: React.FC<EntryProps> = ({ entry }) => {

  const [{ diagnoses },] = useStateValue();

  const diagnosisList = (): JSX.Element[] | null => {
    if (!entry.diagnosisCodes) return null;
    const list = entry.diagnosisCodes
      .map(code => {
        const diagnosis = diagnoses.find(d => d.code === code);
        const name = diagnosis ? diagnosis.name : null;
        return <li key={code}>{code} {name}</li>;
      });
    return list;
  };

  return (
    <Segment>
      <Header as="h4"><span>{entry.date} <EntryIcon entry={entry} /></span></Header>
      <p><b>Specialist:</b> {entry.specialist}</p>
      <p><b>Description:</b> {entry.description}</p>
      <EntryDetails entry={entry} />
      <Header as="h5">Diagnoses</Header>
      <ul>
        {diagnosisList()}
      </ul>
    </Segment>
  );
};

export default Entry;