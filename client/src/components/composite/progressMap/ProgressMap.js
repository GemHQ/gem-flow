import React, { Component } from 'react';
import './progressMap.css';
import RectangleTitle from './rectangleTitle/RectangleTitle';
import FlowDots from './flowDots/FlowDots';
import { withStores } from '../../../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../../../stores/Constants';
import { filterPaymentInstitutions } from '../../../util/PartnerUtil';
import { capitalizeFirstLetter } from '../../../util/TextUtil';

class ProgressMap extends Component {
  getDots = () => {
    const { dataStore, uiStore } = this.props;
    return [
      [ScreenNames.USER, Boolean(dataStore.selectedUser)],
      [ScreenNames.CREDENTIALS, Boolean(dataStore.selectedCredential)],
      [ScreenNames.ACCOUNT, Boolean(dataStore.selectedAccount)],
      [ScreenNames.HISTORY, uiStore.currentScreen === ScreenNames.HISTORY],
    ];
  };

  getMarkerSubtitles = () => {
    const { uiStore, dataStore } = this.props;
    const connectionSubtitle =
      uiStore.flowId === FlowIds.ONRAMP
        ? this.determineSubtitle(
            'Connection',
            'connection_id',
            dataStore.selectedInstitutionUser,
            dataStore.institutionUsersMap.size
          )
        : this.determineSubtitle(
            'Connection',
            'id',
            dataStore.selectedConnection,
            filterPaymentInstitutions(dataStore.connections).length
          );
    return {
      [ScreenNames.USER]: dataStore.selectedUser
        ? `${dataStore.selectedUser.userName.substr(0, 27)}...`
        : '-',
      [ScreenNames.CREDENTIALS]: dataStore.selectedCredential
        ? capitalizeFirstLetter(dataStore.selectedCredential.exchangeId)
        : '-',
      [ScreenNames.ACCOUNT]: dataStore.selectedAccount
        ? dataStore.selectedAccount.accountId
        : '-',
      [ScreenNames.HISTORY]: '-',
    };
  };

  determineSubtitle = (
    itemTitle,
    itemKey,
    selectedItem,
    numberOfItems,
    placeholder = '-'
  ) => {
    return selectedItem
      ? selectedItem[itemKey]
      : numberOfItems
      ? `${numberOfItems} ${itemTitle}${numberOfItems > 1 ? 's' : ''}`
      : placeholder;
  };

  render() {
    const { uiStore, dataStore } = this.props;
    const { flow, currentScreen, setCurrentScreen, primaryColor } = uiStore;
    const dots = this.getDots();
    const markerSubtitles = this.getMarkerSubtitles();
    const currentScreenIndex = flow.screens.indexOf(currentScreen);
    return (
      <div className="ProgressContainer">
        <div className="RectangleTitlesContainer">
          {flow.screens.map((screen, i) => (
            <RectangleTitle
              key={screen}
              title={screen}
              subtitle={markerSubtitles[screen]}
              isCurrentScreen={currentScreenIndex === i}
              isCompleted={currentScreenIndex > i}
              color={primaryColor}
              onClick={() => {
                dataStore.clearItemsOnScreenChange(screen);
                setCurrentScreen(screen, { withOpenForm: false });
              }}
            />
          ))}
        </div>
        <FlowDots
          dots={dots}
          primaryColor={primaryColor}
          currentScreenIndex={currentScreenIndex}
        />
      </div>
    );
  }
}

export default withStores(ProgressMap);
