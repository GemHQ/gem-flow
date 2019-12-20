import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { formatDate, capitalizeFirstLetter } from '../../util/TextUtil';

const ConnectionCard = ({ connection, onButtonClick, onViewClick, removeConnection, primaryColor }) => (
  <GenericCard
    titlesAndValues={[
      { title: 'CONNECTION_ID', value: connection.id },
      { title: 'INSTITUTION_NAME', value: capitalizeFirstLetter(connection.institution_id) },
      { title: 'CREATED_AT', value: formatDate(connection.created_at) },
      { title: 'STATUS', value: capitalizeFirstLetter(connection.status) },
    ]}
    buttonText="View Accounts"
    onButtonClick={onButtonClick}
    onViewClick={onViewClick}
    primaryColor={primaryColor}
    dotsMenuOptions={[{ title: 'Remove connection', onClick: removeConnection }]}
    iconUrl={buildExchangeIconEndpoint(connection.institution_id)}
  />
);

const buildExchangeIconEndpoint = institutionId => `https://gem-widgets-assets.s3-us-west-2.amazonaws.com/gem-widgets-resources/institutions/icons/square/${institutionId}_square.svg`;

export default withPrimaryColor(ConnectionCard);