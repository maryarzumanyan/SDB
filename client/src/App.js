import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    images: [],
  };
  
  componentDidMount() {
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
  
  render() {
    return (
      <div className="App">
        {this.state.images.map((image, index) => {
          return <img key={index} src={image} width="20%" alt="Unavailable"></img>
        })}
      </div>
    );
  }
}

export default App;
