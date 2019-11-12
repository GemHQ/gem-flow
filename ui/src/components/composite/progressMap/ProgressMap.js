import React from 'react';
import './progressMap.css';
import RectangleTitle from './rectangleTitle/RectangleTitle';
import FlowDots from './flowDots/FlowDots';
import { withStores } from '../../../stores/StoresUtil';

export const ProgressMap = ({ uiStore, flowStore }) => {
  const { flow, currentScreen, setCurrentScreen, primaryColor } = uiStore;
  const { dots, markerSubtitles } = flowStore;
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
)};


export default withStores(ProgressMap);