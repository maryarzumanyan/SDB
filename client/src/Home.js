import React from 'react';
import "./Home.css";
import MenuBox from './components/MenuBox';
import ProjectCard from './components/ProjectCard';
import CarouselPage from './components/CarouselPage';

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            mouseOver: false,
            categories: [],
            steps: [],
            design: [],
            visualize: [],
            build: [], 
            categorie: "",
            step: "",
            contact: "",
            project: ""
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

    handleCategoryChange = (name) => {
        this.setState({categorie: name});
        this.setState({project: ""});
    }
    
    handleAboutChange = (name) => {
        // alert("About Change: " + name);
    }

    handleContactChange = (name) => {
        // alert("Contact Change: " + name);
    }

    handleProjectSelected = (name) => {
        this.setState({project: name});
    }

    render() {
        const items = [];

        if(this.state.categorie !== "")
        {
            if(this.state.project === "")
            {
                items.push(<h1>{this.state.categorie} Projects</h1>)
                for (const value of this.state.categories[this.state.categorie]) {
                    items.push(<ProjectCard key = {value}
                    title = {value}
                    imageUrl = "images/project.jpg"
                    callback = {this.handleProjectSelected}
                    />)
                }
            }
            else{
                items.push(<h1>{this.state.project}</h1>)
                var imageTitlePairs = [];
                for (const step of this.state.steps[this.state.project] ){                   
                    for (const name of Object.keys(step))
                    {
                        for(const url of step[name]){

                            imageTitlePairs.push({name, url});
                            
                            /*
                            items.push(<ProjectCard key = {url}
                                title = {name}
                                imageUrl = {url}
                                callback = {null}
                                />)   
                            */     
                        }
                    }
                }
                items.push(<CarouselPage imageTitlePairs={imageTitlePairs} />);
            }   
        }
        return [
            <div className="container">
                
                <div className="row" key="r1">
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
                            //subitems={Object.keys(this.state.visualize)}
                            subitems={["Info", "Contact me"]}
                            callback={this.handleContactChange}
                        />
                    </div>
                </div>    
                <div className="row" key="r2" id="content">
                    <div className="col-12" >
                        <div id= "wrapper">
                            {items}
                        </div>
                    </div>
                </div>
                </div> 
        ];
    }
}

export default Home;