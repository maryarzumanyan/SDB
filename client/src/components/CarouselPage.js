import React from "react";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import "./CarouselPage.css";

class CarouselPage extends React.Component{ 
  constructor(props){
    super(props);
      //  imageTitlePairs: []
      this.state = {
        
    }
  }
  
  renderSlides(title, url, id) {
    return [
      <MDBCarouselItem itemId={id}>
      <MDBView>
        <img
          className="img-responsive center-block d-block w-75 mx-auto"
          src={url}
          alt={title}
          onError={e => alert(e.type)}
        />
      </MDBView>
      <MDBCarouselCaption>
      <div class="carousel-caption d-none d-md-block mb-4">
        <div>{title}</div>
       </div> 
      </MDBCarouselCaption>
      </MDBCarouselItem>
    ];
  }

  render(){
    var carouselSlides = [];
    for (let index = 0; index < this.props.imageTitlePairs.length; index++) {
      const pair = this.props.imageTitlePairs[index];
      carouselSlides.push(this.renderSlides(pair.name, pair.url, index + 1));
    }

    return [
      <MDBContainer>
        <MDBCarousel
          activeItem={1}
          length={this.props.imageTitlePairs.length}
          showControls={true}
          showIndicators={true}
          className="z-depth-1"
        >
          <MDBCarouselInner>
            {carouselSlides}          
          </MDBCarouselInner>
        </MDBCarousel>
      </MDBContainer>
    ];
  }
}

export default CarouselPage;