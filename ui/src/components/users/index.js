import React, { useState, useEffect, useContext } from 'react';
import { Label } from 'semantic-ui-react'
import './users.css';
import { CTX } from '../../state/Store';
import { TYPES } from '../../state/Constants';
const util = require("../../util");

export default () => {

  const [appState, doAction] = useContext(CTX);

  useEffect(() => {

    util.httpGet("/users").then(res => {
      console.log("users are:", res)
      doAction({ type: TYPES.SET_USERS, payload: res });
    })

  }, [])


  return (

    <div className="UsersContainer">

      {appState.users && appState.users.map((item, index) => {

        return (
          <div key={index} className="UserBox">

            <div className="UserPropertyBox">
              <Label className="UserPropertyLabel">User ID</Label>
              <Label className="UserPropertyValue">{item.id}</Label>
            </div>

            <div className="UserPropertyBox">
              <Label className="UserPropertyLabel">Email</Label>
              <Label className="UserPropertyValue">{item.email}</Label>
            </div>

            <div className="UserPropertyBox">
              <Label className="UserPropertyLabel">Access Token</Label>
            </div>
          </div>

        )
      })}
    </div >
  );
}
