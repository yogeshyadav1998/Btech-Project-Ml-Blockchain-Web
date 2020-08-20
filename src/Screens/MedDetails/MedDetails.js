/* eslint-disable */
import React from 'react';
import './MedDetails.css';
import TopBar from '../../Components/Topbar/Topbar';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Carousel, Button, Radio } from 'antd';
import { Link, animateScroll as scroll } from "react-scroll";
const img1 = require('../../Assets/MedDetail/strip.svg');
const img2 = require('../../Assets/MedDetail/syrup.svg');
const img3 = require('../../Assets/MedDetail/tablet_capsule.svg');
export default (props) => {
    const dispatch = useDispatch();
    let drug = props.location.state;
    console.log("DRUG", drug);

    return (
        <Row>
            <TopBar />
            <Row className="information-main-view">
                <Col className="navigation-code">
                    <Link to="overview" smooth={true}><Button className="info-navigation-button">Overview</Button></Link>
                    <Link to="precautions" smooth={true}><Button className="info-navigation-button">Precautions</Button></Link>
                    <Link to="benefits" smooth={true}><Button className="info-navigation-button">Benefits</Button></Link>
                    <Link to="directions" smooth={true}><Button className="info-navigation-button">Directions</Button></Link>
                </Col>
                <Col className="information-code">
                    <Row className="top-card">
                        <Col className="names-section">
                            <p className="med-name">{drug.medName}</p>
                            <p className="prescription-text">Prescription:{(drug.prescription_req === "Yes") ? " required" : drug.prescription_req }</p>
                            <p className="property-heading">Manufacturer</p>
                            <p className="property-value">{drug.manufacturer}</p>
                            <p className="property-heading">Salt Composition</p>
                            <p className="property-value">{drug.salts}</p>
                            <p className="property-heading">Use</p>
                            <p className="property-value">{drug.uses}</p>
                        </Col>
                        <Col className="image-carousel">
                            <Carousel autoplay>
                                <div>
                                    <img style={{ width: '100%', height:"auto", margin: "auto" }} src={img1} />
                                </div>
                                <div>
                                    <img style={{ width: '100%', height:"auto", margin: "auto" }} src={img2} />
                                </div>
                                <div>
                                    <img style={{ width: '100%', height:"auto", margin: "auto" }} src={img3} />
                                </div>
                            </Carousel>,
                        </Col>
                    </Row>
                    <Row className="additional-info">
                        <Col>
                            <p id="overview" className="overview-text">OVERVIEW</p>
                            <p className="additional-property-heading">Introduction</p>
                            <p className="additional-property-value">{drug.Introduction}</p>
                            <p className="additional-property-heading">Side effects of {drug.medName}</p>
                            <p className="additional-property-value">{drug.side_effects}</p>
                            <p id="benefits" className="additional-property-heading">Benefits of {drug.medName}</p>
                            <p className="additional-property-value">{drug.benefits}</p>
                            <p id="precautions" className="additional-property-heading">Precautions of {drug.medName}</p>
                            <p className="additional-property-value">{drug.precautions}</p>
                            <p id="directions" className="additional-property-heading">Directions of {drug.medName}</p>
                            <p className="additional-property-value">{drug.directions}</p>
                        </Col>
                    </Row>
                </Col>
                <Col className="deals-code">
                    <Radio.Group defaultValue="a">
                        <Radio.Button value="a" style={{ margin: 4, width: '100%'}}>Netmeds: ₹{(drug.netmeds_price === "Not Available") ? "N/A" : drug.netmeds_price}</Radio.Button>
                        <Radio.Button value="b" style={{ margin: 4, width: '100%'}}>Medlife: ₹{(drug.medlife_price === "Not Available") ? "N/A" : drug.medlife_price}</Radio.Button>
                        <Radio.Button value="c" style={{ margin: 4, width: '100%'}}>1mg: ₹{(drug.onemg_price === "Not Available" || drug.onemg_price === undefined) ? "N/A" : drug.onemg_price}</Radio.Button>
                        <Radio.Button value="d" style={{ margin: 4, width: '100%'}}>PharmEasy: ₹{(drug.pharmeasy_price === "Not Available") ? "N/A" : drug.pharmeasy_price}</Radio.Button>
                    </Radio.Group>
                    <Button className="add-to-cart-button">ADD TO CART </Button>
                </Col>
            </Row>
        </Row>
    )
}