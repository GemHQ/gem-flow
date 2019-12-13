import React, { useState, useEffect } from 'react';
import InstitutionUserForm from '../../components/forms/InstitutionUserForm';
import InstitutionUserCard from '../../components/cards/InstitutionUserCard';
import GenericScreen from '../GenericScreen';
import { withStores } from '../../stores/StoresUtil';
import { ScreenNames, FlowIds, InstitutionIds } from '../../stores/Constants';
import ErrorMessage from '../../components/basic/errorMessage/ErrorMessage';
import { observer } from 'mobx-react';
import ConnectionForm from '../../components/forms/ConnectionForm';
import {
  startCoinbaseOauthFlow,
  getOauthCode,
  filterPaymentInstitutions,
} from '../../util/PartnerUtil';
import ConnectionCard from '../../components/cards/ConnectionCard';
import WidgetIframe, { openGemConnect } from '../../components/widgets/WidgetIframe';

// as a function to avoid runtime initialization error
const ScreensByFlowId = () => ({
  [FlowIds.ONRAMP]: OnrampConnectionScreen,
  [FlowIds.TRANSFER]: TransferConnectionScreen,
});

const ConnectionScreen = ({ dataStore, uiStore }) => {
  const ScreenToRender = ScreensByFlowId()[uiStore.flowId];
  return (
    <>
      <ErrorMessage errorMessage={dataStore.errorMessage} />
      <ScreenToRender dataStore={dataStore} uiStore={uiStore} />
    </>
  );
};


const OnrampConnectionScreen = observer(({ dataStore, uiStore }) => (
  <GenericScreen
    ItemForm={InstitutionUserForm}
    numberOfItems={dataStore.institutionUsers.length}
    itemTitle="Connection"
    createItem={dataStore.createInstitutionUser}
    buttonDisabled={!dataStore.selectedUser}
    withOpenForm={uiStore.withOpenForm}
  >
    {dataStore.institutionUsers.map(institutionUser => (
      <InstitutionUserCard
        institutionUser={institutionUser}
        key={institutionUser.id}
        removeInstitutionUser={() =>
          dataStore.removeInstitutionUser(institutionUser.id)
        }
        onButtonClick={() => {
          dataStore.selectInstitutionUser(institutionUser.id);
          uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: true });
        }}
        onViewClick={() => {
          dataStore.selectInstitutionUser(institutionUser.id);
          uiStore.setCurrentScreen(ScreenNames.ACCOUNT, {
            withOpenForm: false,
          });
        }}
      />
    ))}
  </GenericScreen>
));


const TransferConnectionScreen = observer(({ dataStore, uiStore }) => {
  useEffect(() => {
    const oauthCode = getOauthCode();
    if (oauthCode) dataStore.createCredentials(oauthCode);
  }, []);

  const [isRedirecting, setIsRedirecting] = useState(false);

  const institutionOptions = dataStore.exchangeInstitutions.map(institution => ({
    value: institution.id,
    label: institution.name,
    className: 'TransferColor',
  }));

  return (
    <>
      <RedirectingLabel isRedirecting={isRedirecting} />
      <GenericScreen
        ItemForm={props => (
          <ConnectionForm {...props} accountOptions={institutionOptions} />
        )}
        numberOfItems={filterPaymentInstitutions(dataStore.connections).length}
        itemTitle="Connection"
        createItem={selectedOption => {
          openGemConnect({ 
            onSuccess: dataStore.createConnection,
            institution: selectedOption
          });
        }}
        buttonDisabled={isRedirecting || !dataStore.selectedUser}
        withOpenForm={uiStore.withOpenForm}
      >
        {filterPaymentInstitutions(dataStore.connections).map(connection => (
          <ConnectionCard
            connection={connection}
            key={connection.id}
            removeConnection={() => dataStore.removeConnection(connection.id)}
            onButtonClick={() => {
              dataStore.selectConnection(connection.id);
              uiStore.setCurrentScreen(ScreenNames.ACCOUNT, {
                withOpenForm: uiStore.flowId === FlowIds.ONRAMP,
              });
            }}
            onViewClick={() => {
              dataStore.selectConnection(connection.id);
              uiStore.setCurrentScreen(ScreenNames.ACCOUNT, {
                withOpenForm: false,
              });
            }}
          />
        ))}
      </GenericScreen>
    </>
  );
});

const RedirectingLabel = ({ isRedirecting, exchangeName = 'Coinbase' }) => {
  if (isRedirecting)
    return <p className="Creating">{`Redirecting to ${exchangeName}...`}</p>;
  return null;
};

export default withStores(ConnectionScreen);
