import React from 'react';
import { EntryType, HealthCheckRating, NewEntry } from '../types';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { TextField, DiagnosisSelection, Option, SelectField } from "../AddPatientModal/FormField";
// import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import { Form as SemanticForm, Segment } from 'semantic-ui-react';
import { Button, Header } from 'semantic-ui-react';
import { useStateValue } from '../state';

export interface ForFormikHelpers {
  type: EntryType;
  description: string;
  specialist: string;
  diagnosisCodes: never[];
  healthCheckRating: HealthCheckRating;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
  discharge: {
    date: string;
    criteria: string;
  };
  employerName: string;
}

interface Props {
  onSubmit: (values: NewEntry, helpers: FormikHelpers<ForFormikHelpers>) => void;
}

const healthRatingOptions: Option[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low risk" },
  { value: HealthCheckRating.HighRisk, label: "High risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical risk" }
];

const entryTypeOptions: Option[] = [
  { value: EntryType.HealthCheck, label: "Health check" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational healthcare" },
];

const validateSharedProperties = (values: NewEntry) => {
  const invalidError = "Invalid value";
  const errors: { [field: string]: string } = {};
  if (!values.description) errors.description = invalidError;
  if (!values.specialist) errors.specialist = invalidError;
  return errors;
};

const validateRequired = (value: string) => {
  let error;
  if (!value) error = "Invalid value";
  return error;
};

const conditionalFields = (entryType: EntryType) => {
  switch (entryType) {
    case EntryType.HealthCheck:
      return (
        <SelectField
          name="healthCheckRating"
          label="Heath check rating"
          options={healthRatingOptions}
        />
      );
    case EntryType.Hospital:
      return (
        <Segment>
          <Header as="h5">Discharge</Header>
          <SemanticForm.Group widths="equal">
            <Field
              label="Date"
              placeholder="Date"
              name="discharge.date"
              component={TextField}
              validate={validateRequired}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
              validate={validateRequired}
            />
          </SemanticForm.Group>
        </Segment>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <div>
          <Field
            label="Employer name"
            placeholder="Employer name"
            name="employerName"
            component={TextField}
            validate={validateRequired}
          />
          <Segment>
            <Header as="h5">Sick leave</Header>
            <SemanticForm.Group widths="equal">
              <Field
                label="Start date"
                placeholder="Start date"
                name="sickLeave.startDate"
                component={TextField}
                validate={validateRequired}
              />
              <Field
                label="End date"
                placeholder="End date"
                name="sickLeave.endDate"
                component={TextField}
                validate={validateRequired}
              />
            </SemanticForm.Group>
          </Segment>
        </div>
      );
    default:
      return null;
  }
};

const AddEntryForm: React.FC<Props> = ({ onSubmit }) => {

  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        description: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        sickLeave: { startDate: "", endDate: "" },
        discharge: { date: "", criteria: "" },
        employerName: ""
      }}
      onSubmit={onSubmit}
      validate={validateSharedProperties}>
      {
        ({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
          return (
            <Segment>
              <Form className="form ui">
                <SelectField
                  name="type"
                  label="Entry type"
                  options={entryTypeOptions}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />
                {conditionalFields(values.type)}
                <Button
                  type="submit"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                    </Button>
              </Form>
            </Segment>
          );
        }
      }
    </Formik>
  );
};

export default AddEntryForm;