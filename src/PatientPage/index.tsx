import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { setCurrentPatient, addEntry, useStateValue } from '../state';
import Entry from '../Entry/index';
import AddEntryForm, { ForFormikHelpers } from '../AddEntryForm/AddEntryForm';
import { NewEntry } from '../types';
import { FormikHelpers } from 'formik';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ currentPatient }, dispatch] = useStateValue();

  useEffect(() => {
    if (currentPatient && currentPatient.id === id)
      return;

    const getPatient = async (id: string) => {
      const { data: patient } = await axios.get(`${apiBaseUrl}/patients/${id}`);
      dispatch(setCurrentPatient(patient));
    };
    getPatient(id);
  });

  const getGender = (): JSX.Element => {
    if (!currentPatient || currentPatient.gender === "other") {
      return <Icon name="genderless" />;
    } else if (currentPatient.gender === "male") {
      return <Icon name="mars" />;
    } else return <Icon name="venus" />;
  };

  const submitEntry = async (newEntry: NewEntry, helpers: FormikHelpers<ForFormikHelpers>) => {
    if (!currentPatient) return;
    const { data: addedEntry } = await axios.post(`${apiBaseUrl}/patients/${currentPatient.id}/entries`, newEntry);
    dispatch(addEntry(currentPatient.id, addedEntry));
    helpers.resetForm();
  };

  return currentPatient
    ? <div>
      <Header as="h2">{currentPatient.name} {getGender()}</Header>
      <p>ssn: {currentPatient.ssn}</p>
      <p>occupation: {currentPatient.occupation}</p>
      <Header as="h3">entries</Header>
      {currentPatient.entries.map(entry => <Entry key={entry.id} entry={entry} />)}
      <Header as="h3">Add entry</Header>
      <AddEntryForm onSubmit={submitEntry} />
    </div>
    : null;
};

export default PatientPage;