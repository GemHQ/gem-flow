import React, { useState, useEffect } from 'react';
import { Label, Container, Input, Button } from 'semantic-ui-react'
import './addUser.css';

export default () => {

  const [editMode, setEditMode] = useState(false);


  useEffect(() => {

  }, [])

  return (

    <div className="AddUserContainer" style={{ backgroundColor: editMode ? "#f0f0f0" : "transparent" }}>

      {editMode &&
        <div className="LabelsContainer">
          <div className="BigLabel">Add a new user</div>
          <div className="SmallLabel">Enter an email address</div>
        </div>}

      {editMode &&
        <Input size="big" placeholder="USER_EMAIL" className="UserEmail"></Input>}

      {!editMode &&
        <Button size="big" primary content='Create User' onClick={() => setEditMode(true)} />}

      {editMode &&
        <Button size="big" primary content='Save User' onClick={() => setEditMode(false)} />}

    </div >
  );
}
