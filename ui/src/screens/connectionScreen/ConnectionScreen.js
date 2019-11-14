import React, { useState, useEffect } from 'react';
import InstitutionUserForm from '../../components/forms/InstitutionUserForm';
import InstitutionUserCard from '../../components/cards/InstitutionUserCard';
import GenericScreen from '../GenericScreen';
import { withStores } from '../../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../../stores/Constants';
import ErrorMessage from '../../components/basic/errorMessage/ErrorMessage';
import { observer } from 'mobx-react';
import ConnectionForm from '../../components/forms/ConnectionForm';
import { startCoinbaseOauthFlow, getOauthCode } from '../../util/PartnerUtil';

const ConnectionScreen = ({ flowStore, uiStore }) => (
  <>
    <ErrorMessage errorMessage={flowStore.errorMessage} />
    {console.log(uiStore.flow.id)}
    {
      uiStore.flow.id === FlowIds.ONRAMP 
      ? <OnrampConnectionScreen flowStore={flowStore} uiStore={uiStore} /> 
      : <TransferConnectionScreen flowStore={flowStore} uiStore={uiStore} />
    }
  </>
)

const OnrampConnectionScreen = observer(({ flowStore, uiStore }) => (
  <GenericScreen
    ItemForm={InstitutionUserForm}
    numberOfItems={flowStore.institutionUsers.length}
    itemTitle="Connection"
    createItem={flowStore.createInstitutionUser}
    buttonDisabled={!flowStore.selectedUser}
    withOpenForm={uiStore.withOpenForm}
  >
  {
    flowStore.institutionUsers.map(institutionUser => (
    <InstitutionUserCard
      institutionUser={institutionUser} 
      key={institutionUser.id} 
      removeInstitutionUser={() => flowStore.removeInstitutionUser(institutionUser.id)}
      onButtonClick={() => {
        flowStore.selectInstitutionUser(institutionUser.id);
        uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: true });
      }}
      onViewClick={() => {
        flowStore.selectInstitutionUser(institutionUser.id);
        uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: false });
      }}
    />))
  }
  </GenericScreen>
))

// TODO: fetch exchange connections, create exchange connection

const TransferConnectionScreen = observer(({ flowStore, uiStore }) => {
  useEffect(() => {
    const oauthCode = getOauthCode();
    if (oauthCode) flowStore.createConnection(oauthCode);
  }, []);
  const [isRedirecting, setIsRedirecting] = useState(false);

  return (
    <>
      <RedirectingLabel isRedirecting={isRedirecting} />
      <GenericScreen
        ItemForm={ConnectionForm}
        numberOfItems={flowStore.connections.length}
        itemTitle="Connection"
        createItem={() => {
          setIsRedirecting(true);
          startCoinbaseOauthFlow();
        }}
        buttonDisabled={isRedirecting || !flowStore.selectedUser}
        withOpenForm={uiStore.withOpenForm}
      >
      {/* {
        flowStore.connections.map(connection => (
        <InstitutionUserCard
          connection={connection} 
          key={connection.id} 
          removeConnection={() => flowStore.removeConnection(connection.id)}
          onButtonClick={() => {
            flowStore.selectConnection(connection.id);
            uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: true });
          }}
          onViewClick={() => {
            flowStore.selectConnection(connection.id);
            uiStore.setCurrentScreen(ScreenNames.ACCOUNT, { withOpenForm: false });
          }}
        />))
      } */}
      </GenericScreen>
    </>
  )
})

const RedirectingLabel = ({ isRedirecting, exchangeName = 'Coinbase' }) => {
  if (isRedirecting) return <p className="Creating">{`Redirecting to ${exchangeName}...`}</p>
  return null;
}

export default withStores(ConnectionScreen);