import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { InstitutionIcons } from '../../stores/Constants';

const ConnectionCard = ({ connection, onButtonClick, removeConnection, primaryColor }) => (
  <GenericCard
    titlesAndValues={[
      { title: 'CONNECTION_ID', value: connection.id },
      // { title: 'CONNECTION_NAME', value: connection.institution.name },
      { title: 'CONNECTION_NAME', value: 'Wyre' },
      { title: 'CREATED_AT', value: connection.created_at },
    ]}
    buttonText="Add Account"
    onButtonClick={onButtonClick}
    primaryColor={primaryColor}
    dotsMenuOptions={[{ title: 'Remove connection', onClick: removeConnection }]}
    // iconUrl={connection.institution.icon}
    iconUrl={InstitutionIcons.wyre}
  />
);

export default withPrimaryColor(ConnectionCard);