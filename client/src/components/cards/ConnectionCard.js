import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { formatDate, capitalizeFirstLetter } from '../../util/TextUtil';

const ConnectionCard = ({
  connection,
  onButtonClick,
  onViewClick,
  removeConnection,
  primaryColor,
}) => (
  <GenericCard
    titlesAndValues={[
      {
        title: 'INSTITUTION_NAME',
        value: capitalizeFirstLetter(connection.exchangeId),
      },
      { title: 'PROXY_TOKEN', value: connection.proxyToken },
      { title: 'CREATED_AT', value: formatDate(connection.createdAt) },
    ]}
    buttonText="View Accounts"
    onButtonClick={onButtonClick}
    onViewClick={onViewClick}
    primaryColor={primaryColor}
    dotsMenuOptions={[
      { title: 'Remove connection', onClick: removeConnection },
    ]}
    iconUrl={buildExchangeIconEndpoint(connection.exchangeId)}
  />
);

const buildExchangeIconEndpoint = (institutionId) =>
  `https://gem-widgets-assets.s3.us-west-2.amazonaws.com/institutions/icons/square/${institutionId}_square.svg`;

export default withPrimaryColor(ConnectionCard);
