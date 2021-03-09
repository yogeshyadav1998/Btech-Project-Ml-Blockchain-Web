import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Topbar.css';
import { Row, AutoComplete, Button } from 'antd';
import { EnvironmentOutlined, SearchOutlined, PhoneOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';
import { getAllSatls, getMedSaltDetail } from "../../Actions/singlemedAction";

const logo = require('../../Assets/LandingAssets/cover.png');
const mgLogo = require('../../Assets/LandingAssets/mgLogo.svg');
const netmedsLogo = require('../../Assets/LandingAssets/netmedsLogo.svg');
const pharmeasylogo = require('../../Assets/LandingAssets/pharmEasyLogo.png');

export default () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { all_salts_medicines } = useSelector(state => state.singleMed);

    const [cityOptions, setCityOptions] = useState([]);
    const [drugOptions, setDrugOptions] = useState([]);
    const [cityValue, setCityValue] = useState('');
    const [drugValue, setDrugValue] = useState('');
    useEffect(() => {
        // dispatch(getAllSatls())
        // setDrugOptions(all_salts_medicines);
        // eslint-disable-next-line
    }, [])
    const onCitySearch = searchText => {
        setCityOptions(
            !searchText ? [] : [{ value: 'Hyderabad' }, { value: 'Bengaluru' }, { value: 'Mumbai' }, { value: 'Jaipur' }]
        );
    };
    const onDrugSearch = searchText => {
        setDrugOptions(
            !searchText ? [] : all_salts_medicines
        );
    };

    const onCitySelect = data => {
        console.log('onSelect', data);
    };

    const onCityChange = data => {
        setCityValue(data);
        console.log('onChange', data);
    };
    const onDrugSelect = data => {
        dispatch(getMedSaltDetail({ input: data }))
        setDrugValue('')
        if(window.location.pathname !== '/formula-result'){history.push('/formula-result')}
    };

    const onDrugChange = data => {
        setDrugValue(data);
    };
    return (
        <Row className="topbar-container">
            <Row className="topbar-first-row">
                <Row className="logo-container">
                    <img src={logo} alt='logo' style={{ height: 100, width: "auto", cursor: 'pointer' }} onClick={() => history.push('/')} />
                </Row>
                <Row className="topbar-middle-container">
                    <Row className="we-compare">
                        <Text strong style={{ color: 'rgb(255 255 255)' }}>We compare</Text>
                        <img src={mgLogo} alt="logo" style={{ height: 30 }} />
                        <img src={netmedsLogo} alt="logo" style={{ height: 30 }} />
                        <img src={pharmeasylogo} alt="logo" style={{ height: 30 }} />
                        <Text style={{ color: 'rgb(255 255 255)' }}>and others at the same time</Text>
                    </Row>
                    <Row className="search-row">
                        <AutoComplete
                            value={cityValue}
                            options={cityOptions}
                            style={{ width: 164 }}
                            onSelect={onCitySelect}
                            onSearch={onCitySearch}
                            onChange={onCityChange}
                            filterOption={(inputValue, cityOptions) =>
                                cityOptions.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                            placeholder={<Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>City<EnvironmentOutlined /></Row>}
                        />
                        <AutoComplete
                            value={drugValue}
                            options={drugOptions}
                            style={{ width: 476 }}
                            onSelect={onDrugSelect}
                            onSearch={onDrugSearch}
                            onChange={onDrugChange}
                            filterOption={(inputValue, drugOptions) =>
                                drugOptions.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                            placeholder={<React.Fragment><SearchOutlined />&nbsp;&nbsp;{" "}Search by Drug, Medicine...</React.Fragment>}
                        />
                    </Row>
                </Row>
            </Row>
            <Row className="topbar-second-row">
                <Row className="topbar-top-row">
                    <Button type="text" style={{ color: 'rgb(255 255 255)', background: '#ffffff14' }} onClick= {()=> history.push('/auth-options')}>Signin / Signup</Button>
                    <Button type="dashed" icon={<ShoppingCartOutlined />} style={{ color: 'rgb(255 255 255)', background: '#ffffff14' }}>Cart</Button>
                </Row>
                <Row className="topbar-second-bottom-row">
                    <Button style={{ color: 'rgb(255 255 255)', background: '#ffffff14' , margin: "auto"}}>Donate</Button>
                </Row>
            </Row>
        </Row>
    )
}