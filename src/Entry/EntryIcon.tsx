import React from 'react';
import { Entry, EntryType } from '../types';
import { assertNever } from '../utils';
import { Icon } from 'semantic-ui-react';

interface EntryIconProps {
  entry: Entry;
}

const EntryIcon: React.FC<EntryIconProps> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.HealthCheck:
      return <Icon name="user md" />;
    case EntryType.Hospital:
      return <Icon name="hospital" />;
    case EntryType.OccupationalHealthcare:
      return (
        <Icon.Group>
          <Icon name="briefcase" />;
          <Icon corner="bottom right" name="heart" />
        </Icon.Group>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryIcon;