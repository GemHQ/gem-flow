import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';

const ConnectionCard = ({ connection, createAccount, removeConnection, primaryColor }) => (
  <GenericCard
    titlesAndValues={[
      { title: 'CONNECTION_ID', value: connection.id },
      { title: 'CONNECTION_NAME', value: connection.name },
      { title: 'CREATED_AT', value: connection.created_at },
    ]}
    buttonText="Add Account"
    onButtonClick={createAccount}
    primaryColor={primaryColor}
    dotsMenuOptions={[{ title: 'Remove connection', onClick: removeConnection }]}
  />
);

export default withPrimaryColor(ConnectionCard);