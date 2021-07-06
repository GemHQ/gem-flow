import React, { useEffect } from 'react';
import InstitutionUserForm from '../../components/forms/InstitutionUserForm';
import InstitutionUserCard from '../../components/cards/InstitutionUserCard';
import GenericScreen from '../GenericScreen';
import { withStores } from '../../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../../stores/Constants';
import ErrorMessage from '../../components/basic/errorMessage/ErrorMessage';
import { observer } from 'mobx-react';
import { REACT_APP_GEM_API_KEY } from '../../constants/Env';

// as a function to avoid runtime initialization error
const ScreensByFlowId = () => ({
  [FlowIds.ONRAMP]: OnrampConnectionScreen,
  [FlowIds.TRANSFER]: TransferConnectionScreen,
  [FlowIds.CONNECT]: TransferConnectionScreen,
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
    {dataStore.institutionUsers.map((institutionUser) => (
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

// reference for the instance of Gem Connect
let GC;

const TransferConnectionScreen = observer(({ dataStore }) => {
  const createGC = () => {
    GC = new window.Gem.Connect({
      apiKey: REACT_APP_GEM_API_KEY,
      partnerName: 'Flow',
      partnerIconUrl:
        'https://app-stage.gem.co/images/wallet/icon_demo_wallet@2x.png',
      onSuccess: dataStore.createConnection,
    });
  };

  useEffect(() => {
    if (window.Gem) createGC();
    else window.onGemReady = createGC;
  }, []);

  return <></>;
});

export default withStores(ConnectionScreen);
