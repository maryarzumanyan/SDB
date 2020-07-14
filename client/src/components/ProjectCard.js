import React from 'react';
import "./ProjectCard.css";

class ProjectCard extends React.Component{
    // eslint-disable-next-line no-useless-constructor
    constructor(props){
        super(props);

        /*
            title: "",
            imageUrl: ""
            callback: null
        */

       this.state = {
            mouseOver: false
        }
    }

    handleMouseOver = () =>{
        this.setState({ mouseOver: true });
    }

    handleMouseOut = () =>{
        this.setState({ mouseOver: false });
    }

    render(){

        return[
            <div role="button" className="card" id={this.state.mouseOver ? "c-over" : "c"}
            onMouseOut={()=> this.handleMouseOut()}
            onMouseOver={()=> this.handleMouseOver()}
            onClick={() => this.props.callback(this.props.title)}>
                <img src={this.props.imageUrl} class="card-img-top" alt="..."/>
                <div className="card-body">
                <p className="card-text">{this.props.title}</p>
                </div>
            </div>
        ];
    }
}

export default ProjectCard;