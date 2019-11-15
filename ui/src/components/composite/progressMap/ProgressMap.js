import React, { Component } from 'react';
import './progressMap.css';
import RectangleTitle from './rectangleTitle/RectangleTitle';
import FlowDots from './flowDots/FlowDots';
import { withStores } from '../../../stores/StoresUtil';
import { ScreenNames, FlowIds } from '../../../stores/Constants';
import { filterPaymentInstitutions } from '../../../util/PartnerUtil';

class ProgressMap extends Component {
  getDots = () => {
    const { flowStore, uiStore } = this.props;
    return uiStore.flow.id === FlowIds.ONRAMP ? [
      [ScreenNames.USER, Boolean(flowStore.selectedUser)],
      [ScreenNames.PROFILE, Boolean(flowStore.selectedProfile)],
      [ScreenNames.CONNECTION, Boolean(flowStore.selectedInstitutionUser)],
      [ScreenNames.ACCOUNT, Boolean(flowStore.selectedAccount)],
      [ScreenNames.TRANSACTION, Boolean(flowStore.transactionsMap.size)],
    ] : [
      [ScreenNames.USER, Boolean(flowStore.selectedUser)],
      [ScreenNames.CONNECTION, Boolean(flowStore.selectedConnection)],
      [ScreenNames.ACCOUNT, Boolean(flowStore.selectedAccount)],
      [ScreenNames.TRANSACTION, Boolean(flowStore.transactionsMap.size)],
    ]
  }

  getMarkerSubtitles = () => {
    const { uiStore, flowStore } = this.props;
    const connectionSubtitle = uiStore.flow.id === FlowIds.ONRAMP
      ? this.determineSubtitle('Connection', 'connection_id', flowStore.selectedInstitutionUser, flowStore.institutionUsersMap.size)
      : this.determineSubtitle('Connection', 'id', flowStore.selectedConnection, filterPaymentInstitutions(flowStore.connections).length)
    return {
      [ScreenNames.USER]: this.determineSubtitle('User', 'id', flowStore.selectedUser, flowStore.usersMap.size, 'Create a new user'),
      [ScreenNames.PROFILE]: this.determineSubtitle('Profile', 'id', flowStore.selectedProfile, flowStore.profilesMap.size),
      [ScreenNames.CONNECTION]: connectionSubtitle,
      [ScreenNames.ACCOUNT]: this.determineSubtitle('Account', 'id', flowStore.selectedAccount, flowStore.accountsMap.size),
      [ScreenNames.TRANSACTION]: this.determineSubtitle('Transaction', '', null, flowStore.transactionsMap.size),
    }
  }

  determineSubtitle = (itemTitle, itemKey, selectedItem, numberOfItems, placeholder = '-') => {
    return selectedItem ? selectedItem[itemKey] : (numberOfItems ? `${numberOfItems} ${itemTitle}${numberOfItems > 1 ? 's' : ''}` : placeholder)
  }

  render() {
    const { uiStore, flowStore } = this.props;
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
              flowStore.clearItemsOnScreenChange(screen);
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