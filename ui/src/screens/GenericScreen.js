import React, { useState } from 'react';
import Button, { BorderedButton } from '../components/basic/button/Button';
import { injector } from '../stores/StoresUtil';

const GenericScreen = ({
  ItemForm,
  numberOfItems,
  itemTitle,
  createItem,
  primaryColor,
  children,
  buttonDisabled,
  withOpenForm,
  isFetching,
  errorMessage,
  dismissError
}) => {
  const [creatingItem, setCreatingItem] = useState(withOpenForm);
  const startCreatingItem = () => setCreatingItem(true);
  const stopCreatingItem = () => setCreatingItem(false);

  if (!numberOfItems && !creatingItem) {
    return isFetching
    ? <p className="Loading">{`Loading ${itemTitle}s...`}</p>
    : <Button onClick={startCreatingItem} disabled={buttonDisabled}>{`Create New ${itemTitle}`}</Button>
  }

  return (
    <>
    { Boolean(errorMessage) && (
      <div className="ErrorMessageContainer">
        <p className="ErrorMessage">{errorMessage.toString()}</p>
        <p className="Pointer ExtraBold" onClick={dismissError}>dismiss</p>
      </div>
    )}
    {
      creatingItem
      ?
      <>
        <h2 className="ScreenHeading">{`Creating ${itemTitle}`}</h2>
        <ItemForm
          onCancel={stopCreatingItem}
          onSubmit={item => {
            createItem(item);
            stopCreatingItem();
          }}
        />
      </>
      :
      <div className="FlexAlignCenter SpaceBetween">
        <h2 className="ScreenHeading noPadding">{`${numberOfItems} ${itemTitle}${numberOfItems > 1 ? 's' : ''}`}</h2>
        <BorderedButton color={primaryColor} onClick={startCreatingItem}>{`+ Add new ${itemTitle.toLowerCase()}`}</BorderedButton>
      </div>
    }
    {children}
    </>
  )
}

const mapStateToProps = ({ flowStore, uiStore }) => ({ 
  isFetching: flowStore.isFetching,
  errorMessage: flowStore.errorMessage,
  dismissError: flowStore.clearError,
  primaryColor: uiStore.primaryColor
});

export default injector(mapStateToProps)(GenericScreen);