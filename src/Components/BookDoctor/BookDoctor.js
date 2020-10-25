import React, { Component } from 'react';
import {Row, Col, TimePicker, DatePicker,  Menu, Dropdown, Button, Input } from 'antd';
import './BookDoctor.css';
import Backgroundanimation from '../backgroudanimation/backgroundanimation';
const Planet = require('../../Assets/LandingAssets/planet.png');

const { RangePicker } = TimePicker;

const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          Dr. Rajesh Sharma
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          Dr. Mohan Singh
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          Dr. Rajan Verma
        </a>
      </Menu.Item>
    </Menu>
  );

class bookDoctor extends Component{
    
    render(){
        return(
            <div className="phase2">
                
                <div>
                    <Row>
                    <Col md={10} offset={2}>
                        <div className="booking_items">
                            <h1 className="book_heading">Book Appointment</h1>
                            <RangePicker bordered={false} />
                            <DatePicker  />
                            <Dropdown overlay={menu} placement="bottomLeft">
                                <Button>Select Doctor</Button>
                            </Dropdown>
                        </div>
                        <div className="track_items">
                        <h1 className="track_heading">Track Appointment</h1>
                        <Input.Group compact>
                            <Input.Search allowClear style={{ width: '40%' }} defaultValue="Tracking id" />
                        </Input.Group>
                        <p className="heading54">Get daily updated details about Your Booking.</p>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div >
                            <Backgroundanimation/>
                            <img className="square" src={Planet}/>
                        </div>
                    </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default bookDoctor;