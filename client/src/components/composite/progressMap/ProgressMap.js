import React, { Component } from 'react';
import './progressMap.css';
import RectangleTitle from './rectangleTitle/RectangleTitle';
import FlowDots from './flowDots/FlowDots';
import { withStores } from '../../../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../../../stores/Constants';
import { filterPaymentInstitutions } from '../../../util/PartnerUtil';

class ProgressMap extends Component {
  getDots = () => {
    const { dataStore, uiStore } = this.props;
    switch (uiStore.flowId) {
      case FlowIds.ONRAMP:
        return [
          [ScreenNames.USER, Boolean(dataStore.selectedUser)],
          [ScreenNames.PROFILE, Boolean(dataStore.selectedProfile)],
          [ScreenNames.CONNECTION, Boolean(dataStore.selectedInstitutionUser)],
          [ScreenNames.ACCOUNT, Boolean(dataStore.selectedAccount)],
          [ScreenNames.TRANSACTION, Boolean(dataStore.transactionsMap.size)],
        ];
      case FlowIds.TRANSFER:
      case FlowIds.CONNECT:
        return [
          [ScreenNames.USER, Boolean(dataStore.selectedUser)],
          [ScreenNames.CONNECTION, Boolean(dataStore.selectedConnection)],
          [ScreenNames.ACCOUNT, Boolean(dataStore.selectedAccount)],
          [ScreenNames.TRANSACTION, Boolean(dataStore.transactionsMap.size)],
        ];
    }
  }

  getMarkerSubtitles = () => {
    const { uiStore, dataStore } = this.props;
    const connectionSubtitle = uiStore.flowId === FlowIds.ONRAMP
      ? this.determineSubtitle('Connection', 'connection_id', dataStore.selectedInstitutionUser, dataStore.institutionUsersMap.size)
      : this.determineSubtitle('Connection', 'id', dataStore.selectedConnection, filterPaymentInstitutions(dataStore.connections).length)
    return {
      [ScreenNames.USER]: this.determineSubtitle('User', 'id', dataStore.selectedUser, dataStore.usersMap.size, 'Create a new user'),
      [ScreenNames.PROFILE]: this.determineSubtitle('Profile', 'id', dataStore.selectedProfile, dataStore.profilesMap.size),
      [ScreenNames.CONNECTION]: connectionSubtitle,
      [ScreenNames.ACCOUNT]: this.determineSubtitle('Account', 'id', dataStore.selectedAccount, dataStore.accountsMap.size),
      [ScreenNames.TRANSACTION]: this.determineSubtitle('Transaction', '', null, dataStore.transactionsMap.size),
    }
  }

  determineSubtitle = (itemTitle, itemKey, selectedItem, numberOfItems, placeholder = '-') => {
    return selectedItem ? selectedItem[itemKey] : (numberOfItems ? `${numberOfItems} ${itemTitle}${numberOfItems > 1 ? 's' : ''}` : placeholder)
  }

  render() {
    const { uiStore, dataStore } = this.props;
    const { flow, currentScreen, setCurrentScreen, primaryColor } = uiStore;
    const dots = this.getDots();
    const markerSubtitles = this.getMarkerSubtitles();
    const currentScreenIndex =  flow.screens.indexOf(currentScreen);
    return (
      <div className="ProgressContainer">
        <div className="RectangleTitlesContainer">
          {flow.screens.map((screen, i) => <RectangleTitle
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
          />)}
        </div>
        <FlowDots 
          dots={dots} 
          primaryColor={primaryColor}
          currentScreenIndex={currentScreenIndex}
        />
      </div>
    )
  }
} 

export default withStores(ProgressMap);