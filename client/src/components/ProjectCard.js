import React from 'react';
import "./ProjectCard.css";

class ProjectCard extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);

        /*
            title: "",
            imageUrl: ""
        */

       this.state = {
            mouseOver: false
        }
    }
    render(){

        return[
            <div className="card">
                <img src={this.props.imageUrl} class="card-img-top" alt="..."/>
                <div className="card-body">
                <p className="card-text">{this.props.title}</p>
                </div>
            </div>
        ];
    }
}

export default ProjectCard;