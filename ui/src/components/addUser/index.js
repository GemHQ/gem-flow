import React, { useState, useContext } from 'react';
import { Input, Button } from 'semantic-ui-react'
import './addUser.css';
import { CTX } from '../../state/Store';
import { TYPES } from '../../state/Constants';
const util = require("../../util");

export default () => {

  const [, doAction] = useContext(CTX);
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState("");

  const createUser = async () => {
    const result = await util.httpPost("/user", { email });
    setEditMode(false);
    setEmail("");
    doAction({ type: TYPES.CREATE_USER, payload: result })
  };

  return (

    <div className="AddUserContainer" style={{ backgroundColor: editMode ? "#f0f0f0" : "transparent" }}>

      {editMode &&
        <div className="LabelsContainer">
          <div className="BigLabel">Add a new user</div>
          <div className="SmallLabel">Enter an email address</div>
        </div>}

      {editMode &&
        <Input value={email}

          onChange={(event, e) => {
            setEmail(e.value)
          }}
          size="large"
          placeholder="USER_EMAIL"
          className="UserEmail">

        </Input>}

      {!editMode &&
        <Button size="large" primary content='Create User' onClick={() => setEditMode(true)} />}

      {editMode &&
        <Button size="large" content='Cancel' onClick={() => setEditMode(false)} />}

      {editMode &&
        <Button size="large" primary content='Save User' onClick={createUser} />}


    </div >
  );
}
