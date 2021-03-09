import React, { Component } from 'react';
import {Row, Col, Button} from 'antd';
import { SearchOutlined, UploadOutlined, RightOutlined} from '@ant-design/icons'
import './about.css'


class about extends Component {
    render(){
        return(
            <div className="about-main-container">
                <Row>
                    <img className="wave-image"  src="https://cdn2.f-cdn.com/contestentries/950414/17591332/58a03f1146064_thumb900.jpg"/>
                </Row>
                <h1 className="services_heading">Services</h1>
                <Row>
                    <Col md={8} offset={4}>
                        <div className="grid">
                        <p className="heading53">Find Medicines</p>
                        <Button className="manual_search_button" type="primary" icon={<SearchOutlined />}>
                            Search Manualy
                        </Button>
                        <Button className="manual_search_button" type="primary" icon={<UploadOutlined />}>
                            Search By Prescription
                        </Button>
                        </div>
                    </Col>
                        <Col md={8}>
                        <div className="grid">
                        <img style={{height:"50vh", width:"100%" , borderRadius:"5px"}} src="https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"/>
                        </div>
                    </Col>
                </Row>
                 <Row>
                    <Col md={8} offset={4}>
                        <div className="grid">
                        <img style={{height:"50vh", width:"100%", borderRadius:"5px"}} src="https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="grid">
                            <p className="heading53">Analyse Reports </p>
                            <Button className="report_button" type="primary" >Cancer <RightOutlined /></Button>
                            <Button className="report_button" type="primary" >Diabetes <RightOutlined /></Button>
                            <Button className="report_button" type="primary" >Parkinsons<RightOutlined /></Button>
                            <Button className="report_button" type="primary" >Kidney <RightOutlined /></Button>
                            <Button className="report_button" type="primary" >Heart <RightOutlined /></Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default about;