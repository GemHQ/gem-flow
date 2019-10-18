import React from 'react';
import './progressMap.css';
import RectangleTitle from './rectangleTitle/RectangleTitle';
import FlowDots from './flowDots/FlowDots';
import { injector } from '../../../stores/StoresUtil';

export const ProgressMap = ({ screens, progressStore, primaryColor, dots, markerSubtitles }) => {
  const currentScreenIndex =  screens.indexOf(progressStore.currentScreen);
  return (
    <div className="ProgressContainer">
      <div className="RectangleTitlesContainer">
        {screens.map((screen, i) => <RectangleTitle
          key={screen} 
          title={screen} 
          subtitle={markerSubtitles[screen]} 
          isCurrentScreen={currentScreenIndex === i} 
          isCompleted={currentScreenIndex > i}
          color={primaryColor}
          onClick={() => progressStore.setCurrentScreen(screen)}
        />)}
      </div>
      <FlowDots 
        dots={dots} 
        primaryColor={primaryColor}
        currentScreenIndex={currentScreenIndex}
      />
    </div>
)};

const mapStoresToProps = ({ flowStore, uiStore }) => ({ 
  screens: uiStore.flow.screens,
  progressStore: uiStore.progressStore, 
  primaryColor: uiStore.primaryColor,
  dots: flowStore.dots,
  markerSubtitles: flowStore.markerSubtitles
});

export default injector(mapStoresToProps)(ProgressMap);