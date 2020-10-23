import React, { Component } from 'react';
import {Row,Col} from 'antd';
import { TwitterOutlined, FacebookOutlined, InstagramOutlined, YoutubeOutlined} from '@ant-design/icons'

import './footer.css'

class footer extends Component{
    render(){
        return(
            <div className="footer">
                <Row>
                    <Col md={3} offset={4}>
                        <div className="lists">
                            <p className="headingf1">COMPANY</p>
                            <p className="headingf2">About</p>
                            <p className="headingf2">Careers</p>
                            <p className="headingf2">Contact us</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="lists">
                            <p className="headingf1">RESOURCES</p>
                            <p className="headingf2">About</p>
                            <p className="headingf2">Careers</p>
                            <p className="headingf2">Contact us</p>
                            <p className="headingf2">Press</p>
                            <p className="headingf2">Blog</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="lists">
                            <p className="headingf1">PARTNERS</p>
                            <p className="headingf2">About</p>
                            <p className="headingf2">Careers</p>
                            <p className="headingf2">Contact us</p>
                            <p className="headingf2">Careers</p>
                            <p className="headingf2">Contact us</p>
                        </div>

                    </Col>
                    <Col md={3}>
                        <div className="lists">
                            <p className="headingf1">LEGAL</p>
                            <p className="headingf2">About</p>
                            <p className="headingf2">Careers</p>
                            <p className="headingf2">Contact us</p>
                        </div>
                    </Col>
                    <Col md={3}>

                    </Col>
                </Row>
                <Row>
                    <Col md={16} offset={4}>
                        <div className="ending">
                            <Row>
                                <Col md={3}>
                                <img style={{height:"5vh", width:"auto"}} src="http://localhost:3000/static/media/cover.791de291.png"/>
                                </Col>
                                <Col md={10}>
                                <p>Copyright ©2020 – Metaflow LTD. – All rights reserved.</p>
                                </Col>
                                <Col md={4} offset={7}>
                                    <Row>
                                        <Col md={6}>
                                        <TwitterOutlined />
                                        </Col>
                                        <Col md={6}>
                                        <FacebookOutlined />
                                        </Col>
                                        <Col md={6}>
                                        <InstagramOutlined />
                                        </Col>
                                        <Col md={6}>
                                        <YoutubeOutlined />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <hr style={{height:"1px", width:"100%", position:"absolute", color:"black"}}/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default footer;