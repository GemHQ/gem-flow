import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';

const ConnectionCard = ({ connection, onButtonClick, removeConnection, primaryColor }) => (
  <GenericCard
    titlesAndValues={[
      { title: 'CONNECTION_ID', value: connection.id },
      { title: 'CONNECTION_NAME', value: connection.name },
      { title: 'CREATED_AT', value: connection.created_at },
    ]}
    buttonText="Add Account"
    onButtonClick={onButtonClick}
    primaryColor={primaryColor}
    dotsMenuOptions={[{ title: 'Remove connection', onClick: removeConnection }]}
  />
);

export default withPrimaryColor(ConnectionCard);