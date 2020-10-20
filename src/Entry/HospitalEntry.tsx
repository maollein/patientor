import React from 'react';
import { Header } from 'semantic-ui-react';
import { HospitalEntry as IHospitalEntry } from '../types';

const HospitalEntry: React.FC<{ entry: IHospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <Header as="h5">Discharge</Header>
      <p><b>Date:</b> {entry.discharge.date}</p>
      <p><b>Criteria:</b> {entry.discharge.criteria}</p>
    </div>
  );
};

export default HospitalEntry;