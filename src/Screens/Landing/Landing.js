import React from 'react';
import './Landing.css';
import { Row, Carousel } from 'antd';
import Topbar from '../../Components/Topbar/Topbar';
import CategoryDrawer from '../../Components/CategoryDrawer/CategoryDrawer';
import About from '../../Components/About/about';
import BookDoctor from '../../Components/BookDoctor/BookDoctor';
import Footer from '../../Components/Footer/footer';

const revitalCarouselItem = require('../../Assets/LandingAssets/revitalCarouselItem.jpg');
const celevidaCarouselItem = require('../../Assets/LandingAssets/celevidaCarouselItem.jpeg');
const johnsonCarouselItem = require('../../Assets/LandingAssets/johnsonCarouselItem.jpg');
const dettolCarouselItem = require('../../Assets/LandingAssets/dettolCarouselItem.jpg');
const daburCarouselItem = require('../../Assets/LandingAssets/daburCarouselItem.jpg');

const Landing = () => {
    return (
        <Row className="landing-main-container">
            <Topbar />
            <Carousel autoplay className="landing-carousel">
                <div>
                    <img style={{width: "100%"}} src={revitalCarouselItem} alt="caarouselItemOne" />
                </div>
                <div>
                    <img style={{width: "100%"}} src={celevidaCarouselItem} alt="caarouselItemOne" />
                </div>
                <div>
                    <img style={{width: "100%"}} src={johnsonCarouselItem} alt="caarouselItemOne" />
                </div>
                <div>
                    <img style={{width: "100%"}} src={dettolCarouselItem} alt="caarouselItemOne" />
                </div>
                <div>
                    <img style={{width: "100%"}} src={daburCarouselItem} alt="caarouselItemOne" />
                </div>
            </Carousel>
            <p className="category-heading">SHOP BY CATEGORY</p>
            <CategoryDrawer/>
            <About/>
            <BookDoctor/>
            <Footer/>
        </Row>
    )
}

export default Landing;