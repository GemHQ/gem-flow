import React from 'react';
import GenericCard from './GenericCard';

const ConnectionCard = ({ connection, createAccount, primaryColor }) => (
  <GenericCard
    titlesAndValues={[
      { title: 'CONNECTION_ID', value: connection.id },
      { title: 'CONNECTION_NAME', value: connection.name },
      { title: 'CREATED_AT', value: connection.created_at },
    ]}
    buttonText="Add Account"
    onButtonClick={createAccount}
    primaryColor={primaryColor}
  />
);

export default ConnectionCard;