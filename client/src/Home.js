import React from 'react';
import OneDriveAuth from "onedrive-auth";

class Home extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        var onedrive = new OneDriveAuth({
            clientId: 'abdb17c9-3332-44e1-a425-270eeb0f99da',
            scopes: 'onedrive.readwrite offline_access',
            redirectUri: 'https://localhost:3000/index.html'
          });
      
          console.info("Entering Constructor", onedrive);
      
          // check for active token
          onedrive.auth().then(token => {
            // call OneDrive API endpoints with given token
            console.info("Connected, token = ", token);
          }).catch(err => {
            // create auth button
            console.error("Failed. Error = ", err);
          });
          
          console.info("Leaving Constructor", onedrive);
    }

    render() {
        return (<h1>HELLO</h1>);
    }
}

export default Home;