import React, { Component } from 'react';
import './progressMap.css';
import RectangleTitle from './rectangleTitle/RectangleTitle';
import FlowDots from './flowDots/FlowDots';
import { withStores } from '../../../stores/StoresUtil';
import { ScreenNames, ScreenTitles } from '../../../stores/Constants';
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
    const { dataStore } = this.props;
    return {
      [ScreenNames.USER]: dataStore.selectedUser
        ? `${dataStore.selectedUser.userName.substr(0, 27)}...`
        : '-',
      [ScreenNames.CREDENTIALS]: dataStore.selectedCredential
        ? capitalizeFirstLetter(dataStore.selectedCredential.exchangeId)
        : '-',
      [ScreenNames.ACCOUNT]: dataStore.selectedAccount
        ? dataStore.selectedAccount.currency.currencyCode
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
              title={ScreenTitles[screen]}
              subtitle={markerSubtitles[screen]}
              isCurrentScreen={currentScreenIndex === i}
              isCompleted={currentScreenIndex > i}
              color={primaryColor}
              onClick={() => {
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
