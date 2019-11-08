import React from 'react';
import './App.css';
import Home from './Home';

class App extends React.Component {
  state = {
    images: [],
  };
  
  componentDidMount() {
    this.calFoldersApi();
    
    this.callImagesApi()
      .then(res => {
        this.setState({ images: res });
      })
      .catch(err => console.log(err));
  }
  
  callImagesApi = async () => {
    const response = await fetch('/api/images');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };

  calFoldersApi = async () => {
    const response = await fetch('/api/folders');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  render() {
    return [
      <Home />,
      /*
      <div className="App">
        {this.state.images.map((image, index) => {
          return <img key={index} src={image} width="20%" alt="Unavailable"></img>
        })}
      </div>
      */
    ];
  }
}

export default App;
