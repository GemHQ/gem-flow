import React, { useState, useEffect } from 'react';
import { Card, Label } from 'semantic-ui-react'
import './users.css';
const util = require("../../util");

export default () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    util.httpGet("/users").then(res => {
      console.log("users are:", res)
      setUsers(res);
    })

  }, [])


  return (

    <div className="UsersContainer">

      {users && users.map((item, index) => {

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
