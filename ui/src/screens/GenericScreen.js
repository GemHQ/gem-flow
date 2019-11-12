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
}) => {
  const [creatingItem, setCreatingItem] = useState(withOpenForm);
  const startCreatingItem = () => setCreatingItem(true);
  const stopCreatingItem = () => setCreatingItem(false);

  if (!numberOfItems && !creatingItem) {
    return isFetching
    ? <LoadingLabel itemTitle={itemTitle} />
    : <>
        <Button onClick={startCreatingItem} disabled={buttonDisabled}>{`Create New ${itemTitle}`}</Button>
        <PostingLabel isPosting={isPosting} itemTitle={itemTitle} />
      </>
  }

  return (
    <>
      <ItemFormControl 
        ItemForm={ItemForm}
        itemTitle={itemTitle}
        creatingItem={creatingItem}
        createItem={createItem}
        startCreatingItem={startCreatingItem}
        stopCreatingItem={stopCreatingItem}
        numberOfItems={numberOfItems}
        primaryColor={primaryColor}
      />
      <PostingLabel isPosting={isPosting} itemTitle={itemTitle} />
      {children}
    </>
  )
}

const ItemFormControl = ({
  ItemForm,
  itemTitle,
  creatingItem,
  createItem,
  startCreatingItem,
  stopCreatingItem,
  numberOfItems,
  primaryColor
}) => {
  if (creatingItem) return (
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
  )

  return (
    <div className="FlexAlignCenter SpaceBetween">
      <h2 className="ScreenHeading noPadding">{`${numberOfItems} ${itemTitle}${numberOfItems > 1 ? 's' : ''}`}</h2>
      <BorderedButton color={primaryColor} onClick={startCreatingItem}>{`+ Add new ${itemTitle.toLowerCase()}`}</BorderedButton>
    </div>
  )
}

const LoadingLabel = ({ itemTitle }) => <p className="Loading">{`Loading ${itemTitle}s...`}</p>;

const PostingLabel = ({ isPosting, itemTitle }) => {
  if (isPosting) return <p className="Creating">{`Creating ${itemTitle}...`}</p>
  return null;
}

const mapStateToProps = ({ flowStore, uiStore }) => ({ 
  isFetching: flowStore.isFetching,
  isPosting: flowStore.isPosting,
  primaryColor: uiStore.primaryColor
});

export default injector(mapStateToProps)(GenericScreen);