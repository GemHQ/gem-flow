import React from 'react';
import './progressMap.css';
import RectangleTitle from './rectangleTitle/RectangleTitle';
import FlowDots from './flowDots/FlowDots';
import { injector } from '../../../stores/StoresUtil';

export const ProgressMap = ({ screens, progressStore, primaryColor, dots }) => {
  const currentScreenIndex =  screens.indexOf(progressStore.currentScreen);
  return (
    <div className="ProgressContainer">
      <div className="RectangleTitlesContainer">
        {progressStore.markerTitles.map(([title, subtitle], i) => <RectangleTitle
          key={title} 
          title={title} 
          subtitle={subtitle} 
          isCurrentScreen={currentScreenIndex === i} 
          isCompleted={currentScreenIndex > i}
          color={primaryColor}
          onClick={() => progressStore.setCurrentScreen(title)}
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
  dots: flowStore.dots
});

export default injector(mapStoresToProps)(ProgressMap);