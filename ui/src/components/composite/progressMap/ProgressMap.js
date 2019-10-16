import React from 'react';
import './progressMap.css';
import RectangleTitle from './rectangleTitle/RectangleTitle';
import FlowDots from './flowDots/FlowDots';
import { withPrimaryColor } from '../../../stores/StoresUtil';

export const ProgressMap = ({ progressStore, primaryColor }) => (
  <div className="ProgressContainer">
    <div className="RectangleTitlesContainer">
      {progressStore.markerTitles.map(([title, subtitle]) => <RectangleTitle 
        key={title} 
        title={title} 
        subtitle={subtitle} 
        activeMarker={progressStore.currentScreen} 
        isCompleted={progressStore.dotsMap.get(title)}
        color={primaryColor}
      />)}
    </div>
    <FlowDots 
      dots={progressStore.dots} 
      activeMarker={progressStore.currentScreen} 
      primaryColor={primaryColor} 
    />
  </div>
);

export default withPrimaryColor(ProgressMap);