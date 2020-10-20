import React from 'react';
import { Icon } from 'semantic-ui-react';
import { HealthCheckEntry as IHealthCheckEntry, HealthCheckRating } from '../types';
import { SemanticCOLORS } from 'semantic-ui-react';
import { assertNever } from '../utils';

const HealthCheckEntry: React.FC<{ entry: IHealthCheckEntry }> = ({ entry }) => {
  let color: SemanticCOLORS = "black";
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      color = "green";
      break;
    case HealthCheckRating.LowRisk:
      color = "yellow";
      break;
    case HealthCheckRating.HighRisk:
      color = "orange";
      break;
    case HealthCheckRating.CriticalRisk:
      color = "black";
      break;
    default:
      return assertNever(entry.healthCheckRating);
  }
  return (
    <div>
      <p><b>Health check rating:</b> <Icon name="heart" color={color} /></p>
    </div>
  );
};

export default HealthCheckEntry;