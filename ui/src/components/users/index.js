import React, { useEffect, useContext } from 'react';
import { Label, Icon, Button } from 'semantic-ui-react'
import './users.css';
import { CTX } from '../../state/Store';
import { TYPES } from '../../state/Constants';
const util = require("../../util");

export default () => {

  const [appState, doAction] = useContext(CTX);

  useEffect(() => {

    const [, doAction] = useContext(CTX);

    util.httpGet("/user").then(res => {
      doAction({ type: TYPES.SET_USERS, payload: res });
    })

  }, [])

  const deleteUser = async (id) => {

    util.httpDelete("/user/" + id).then(res => {
      console.log('user deleted')
      doAction({ type: TYPES.SET_USERS, payload: res });
    })
  }

  const seeProfiles = () => {

  }

  const seeConnections = () => {

  }

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
              <Label className="UserPropertyValue">{item.accessToken}</Label>
            </div>

            <div className="SpaceFiller">
            </div>

            <div className="ActionBox">
              <Button size="mini" primary content="+ Profile" />
              <Label className="ViewText" onClick={seeProfiles}>see profiles</Label>
            </div>

            <div className="ActionBox">
              <Button size="mini" primary content="+ Connection" />
              <Label className="ViewText" onClick={seeConnections}>see connections</Label>
            </div>

            <div className="DeleteBox">
              <div onClick={() => deleteUser(item.id)}>
                <Icon name="window close" color="pink"></Icon>
              </div>
            </div>
          </div>

        )
      })}
    </div >
  );
}
