import React from 'react';
import GenericCard from './GenericCard';
import { withPrimaryColor } from '../../stores/StoresUtil';
import { InstitutionIcons } from '../../stores/Constants';
import { formatDate } from '../../util/TextUtil';

const ConnectionCard = ({ institutionUser, onButtonClick, onViewClick, removeInstitutionUser, primaryColor }) => (
  <GenericCard
    titlesAndValues={[
      { title: 'CONNECTION_ID', value: institutionUser.connection_id },
      { title: 'INSTITUTION', value: 'Wyre' },
      { title: 'EXTERNAL_ID', value: institutionUser.external_id },
      { title: 'CREATED_AT', value: formatDate(institutionUser.created_at) },
    ]}
    buttonText="Add Account"
    onButtonClick={onButtonClick}
    viewText="View Accounts"
    onViewClick={onViewClick}
    primaryColor={primaryColor}
    dotsMenuOptions={[{ title: 'Remove connection', onClick: removeInstitutionUser }]}
    // iconUrl={connection.institution.icon}
    iconUrl={InstitutionIcons.wyre}
  />
);

export default withPrimaryColor(ConnectionCard);