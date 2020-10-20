import React from 'react';
import { Entry, EntryType } from '../types';
import { assertNever } from '../utils';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalEntry from './OccupationalEntry';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    case EntryType.Hospital:
      return <HospitalEntry entry={entry}/>;
    case EntryType.OccupationalHealthcare:
      return <OccupationalEntry entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;