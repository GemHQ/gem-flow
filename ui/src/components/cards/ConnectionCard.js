import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { InstitutionIcons } from '../../stores/Constants';
import { formatDate, capitalizeFirstLetter } from '../../util/TextUtil';

const ConnectionCard = ({ connection, onButtonClick, onViewClick, removeConnection, primaryColor }) => (
  <GenericCard
    titlesAndValues={[
      { title: 'CONNECTION_ID', value: connection.id },
      { title: 'INSTITUTION_NAME', value: 'Coinbase' },
      { title: 'CREATED_AT', value: formatDate(connection.created_at) },
      { title: 'STATUS', value: capitalizeFirstLetter(connection.status) },
    ]}
    buttonText="View Accounts"
    onButtonClick={onButtonClick}
    onViewClick={onViewClick}
    primaryColor={primaryColor}
    dotsMenuOptions={[{ title: 'Remove connection', onClick: removeConnection }]}
    iconUrl={InstitutionIcons.coinbase}
  />
);

export default withPrimaryColor(ConnectionCard);