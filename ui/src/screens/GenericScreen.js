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
  isPosting,
  autoCloseForm = true
}) => {
  const [creatingItem, setCreatingItem] = useState(withOpenForm);
  const startCreatingItem = () => setCreatingItem(true);
  const stopCreatingItem = () => setCreatingItem(false);

  if (!numberOfItems && !creatingItem) {
    return isFetching
    ? <p className="Loading">{`Loading ${itemTitle}s...`}</p>
    : <>
        <Button onClick={startCreatingItem} disabled={buttonDisabled}>{`Create New ${itemTitle}`}</Button>
        { isPosting && <p className="Creating">{`Creating ${itemTitle}...`}</p> }
      </>
  }

  return (
    <>
    {
      creatingItem
      ?
      <>
        <h2 className="ScreenHeading">{`Creating ${itemTitle}`}</h2>
        <ItemForm
          onCancel={stopCreatingItem}
          onSubmit={item => {
            createItem(item);
            autoCloseForm && stopCreatingItem();
          }}
        />
      </>
      :
      <div className="FlexAlignCenter SpaceBetween">
        <h2 className="ScreenHeading noPadding">{`${numberOfItems} ${itemTitle}${numberOfItems > 1 ? 's' : ''}`}</h2>
        <BorderedButton color={primaryColor} onClick={startCreatingItem}>{`+ Add new ${itemTitle.toLowerCase()}`}</BorderedButton>
      </div>
    }
    { isPosting && <p className="Creating">{`Creating ${itemTitle}...`}</p> }
    {children}
    </>
  )
}

const mapStateToProps = ({ flowStore, uiStore }) => ({ 
  isFetching: flowStore.isFetching,
  isPosting: flowStore.isPosting,
  primaryColor: uiStore.primaryColor
});

export default injector(mapStateToProps)(GenericScreen);