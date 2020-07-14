import React from 'react';
import "./MenuBox.css";

class MenuBox extends React.Component {
    constructor(props) {
        super(props);

        /*
        title: "",
        subitems: [],
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

    renderCategories(name) {
        return <div role="button" className="list-group-item list-group-item-action"
        onClick={() => this.props.callback(name)}>{name}</div>;
    }

    render() {
        // Prepare JSX Elements
        var categoryElements = [];
        this.props.subitems.forEach(
            name => categoryElements.push(this.renderCategories(name))
        );

        return [
            <div id="home_projects" className={this.state.mouseOver ? "box-over" : "box"}
            onMouseOut={()=> this.handleMouseOut()}
            onMouseOver={()=> this.handleMouseOver()}>
                <h2>{this.props.title}</h2>
                <div className={this.state.mouseOver ? "list-group" : "list-group-hide"}>
                    {categoryElements}
                </div>
            </div>
        ];
    }
}

export default MenuBox;