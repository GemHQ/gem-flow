import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { InstitutionIcons } from '../../stores/Constants';
import { formatDate } from '../../util/TextUtil';

const ConnectionCard = ({ connection, onButtonClick, onViewClick, removeConnection, primaryColor }) => (
  <GenericCard
    titlesAndValues={[
      { title: 'CONNECTION_ID', value: connection.id },
      { title: 'INSTITUTION', value: 'Coinbase' },
      { title: 'CREATED_AT', value: formatDate(connection.created_at) },
    ]}
    buttonText="Add Account"
    onButtonClick={onButtonClick}
    viewText="View Accounts"
    onViewClick={onViewClick}
    primaryColor={primaryColor}
    dotsMenuOptions={[{ title: 'Remove connection', onClick: removeConnection }]}
    // iconUrl={connection.institution.icon}
    iconUrl={InstitutionIcons.wyre}
  />
);

export default withPrimaryColor(ConnectionCard);