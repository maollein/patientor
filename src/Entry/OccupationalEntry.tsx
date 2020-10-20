import React from 'react';
import { Header } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

const OccupationalEntry: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <div>
      <p><b>Employer:</b> {entry.employerName}</p>
      <Header as="h5">Sick leave</Header>
      <p><b>Starts:</b> {entry.sickLeave?.startDate}</p>
      <p><b>Ends:</b> {entry.sickLeave?.endDate}</p>
    </div>
  );
};

export default OccupationalEntry;