import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import { RightCircleOutlined, LeftCircleOutlined} from '@ant-design/icons';
import 'react-alice-carousel/lib/alice-carousel.css';
import './CategoryDrawer.css';

const bodyPainItem = require('../../Assets/CategoryDrawer/pain.jfif')
const stomachPainItem = require('../../Assets/CategoryDrawer/stomach.jfif')
const respirationCareItem = require('../../Assets/CategoryDrawer/respiration.jfif')
const gynacCareItem = require('../../Assets/CategoryDrawer/gynac.jfif')

class Gallery extends React.Component {
  items = [
        {
            category: "Body Pain",
            image: bodyPainItem
        },
        {
            category: "Stomach Pain",
            image: stomachPainItem
        },
        {
            category: "Respiration Care",
            image: respirationCareItem
        },
        {
            category: "Gynac Care",
            image: gynacCareItem
        }
    ]
 
  state = {
    currentIndex: 0,
    responsive: { 1024: { items: 4 } },
    galleryItems: this.galleryItems(),
  }
 
  slideTo = (i) => this.setState({ currentIndex: i })
 
  onSlideChanged = (e) => this.setState({ currentIndex: e.item })
 
  slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 })
 
  slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 })
 
  thumbItem = (item, i) => <span onClick={() => this.slideTo(i)}>* </span>
 
  galleryItems() {
    return this.items.map((item) => (
        <div className="category-section">
            <img className="category-image" src={item.image} ></img>
            <p className="category-name">{item.category}</p>
        </div>
    ))
  }
 
  render() {
    const { galleryItems, responsive, currentIndex } = this.state
    return (
            <div className="category-drawer-main">
                <button className="category-slide-button" onClick={() => this.slidePrev()}><LeftCircleOutlined /></button>
                <div className="category-drawer">
                    <AliceCarousel
                    dotsDisabled={true}
                    buttonsDisabled={true}
                    items={galleryItems}
                    responsive={responsive}
                    slideToIndex={currentIndex}
                    onSlideChanged={this.onSlideChanged}
                    />
                </div>
                <button className="category-slide-button" onClick={() => this.slideNext()}><RightCircleOutlined /></button>
            </div>
    )
  }
}

export default Gallery;