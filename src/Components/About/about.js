import React, { Component } from 'react';
import {Row, Col} from 'antd';
import './about.css'

class about extends Component {
    render(){
        return(
            <div className="about-main-container">
                <Row>
                    <img className="wave-image"  src="https://cdn2.f-cdn.com/contestentries/950414/17591332/58a03f1146064_thumb900.jpg"/>
                </Row>
                <Row>
                    <Col md={8} offset={4}>
                        <div className="grid">
                        <p className="heading53">Track your metabolism daily</p>
                        <p className="heading54">See how your metabolism is affected by your sleep, physical activity, and nutrition.</p>
                        </div>
                    </Col>
                        <Col md={8}>
                        <div className="grid">
                        <img style={{height:"50vh", width:"100%"}} src="https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"/>
                        </div>
                    </Col>
                </Row>
                 <Row>
                    <Col md={8} offset={4}>
                        <div className="grid">
                        <img style={{height:"50vh", width:"100%"}} src="https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="grid">
                            <p className="heading53">Customize your nutrition</p>
                            <p className="heading54">Get daily personalized meal plans. Know exactly what to eat and when.</p>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default about;