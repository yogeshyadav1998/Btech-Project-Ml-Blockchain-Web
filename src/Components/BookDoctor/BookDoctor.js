import React, { Component } from 'react';
import {Row,Col} from 'antd';
import './BookDoctor.css';

import Backgroundanimation from '../backgroudanimation/backgroundanimation';
const Planet = require('../../Assets/LandingAssets/planet.png');

class bookDoctor extends Component{
    render(){
        return(
            <div className="phase2">
                
                <div>
                    <Row>
                    <Col md={10} offset={2}>
                        <div className="text">
                        <h1>Book Appointment</h1>
                        <p >Spread your ideas across the world. Make your own way of success. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. </p> 
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
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