import React, { useState, useEffect } from 'react';
import { Input, Button } from 'semantic-ui-react'
import './addUser.css';
const util = require("../../util");

export default () => {

  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {

  }, [])

  const createUser = async () => {
    const result = await util.httpPost("/users", { email });
    console.log(result);
    setEditMode(false);
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
            console.log(e.value)
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
