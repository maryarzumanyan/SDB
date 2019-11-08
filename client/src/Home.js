import React from 'react';
import "./Home.css";
import MenuBox from './components/MenuBox';

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            mouseOver: false,
            categories: [],
            steps: [],
            design: [],
            visualize: [],
            build: []
        }
    }

    componentDidMount() {
        fetch("/api/data")
          .then(response => response.json())
          .then(data => this.updateState(data));
    }

    updateState(data) {
        this.setState({
            categories: data["projsByCat"],
            steps: data["imagesByStepInProj"],
            design: data["design"],
            visualize: data["visualize"],
            build: data["build"]
        });
    }

    handleCategoryChange(name) {
        // alert("Category Change: " + name);
    }
    
    handleAboutChange(name) {
        // alert("About Change: " + name);
    }

    handleContactChange(name) {
        // alert("Contact Change: " + name);
    }

    render() {
        return [
            <div key="abc123" className="container">
            <div className="row">
                <div id="prj" className="col-4">
                    <MenuBox 
                        title="Projects"
                        subitems={Object.keys(this.state.categories)}
                        callback={this.handleCategoryChange}
                    />
                </div>
                <div className="col-4">
                    <MenuBox 
                        title="About"
                   //     subitems={Object.keys(this.state.steps)}
                        subitems={["Design", "Visualize", "Build"]}
                        callback={this.handleAboutChange}
                    />
                </div>
                <div className="col-4">
                    <MenuBox 
                        title="Contact"
                        subitems={Object.keys(this.state.visualize)}
                        callback={this.handleContactChange}
                    />
                </div>
            </div>
            </div>
        ];
    }
}

export default Home;