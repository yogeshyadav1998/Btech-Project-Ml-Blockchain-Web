import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import "./FormulaResult.css";
import { Drawer, Button, Tabs, Row, Radio, Checkbox, Divider, Card, Typography, Avatar } from "antd";
import { FilterOutlined, ExperimentOutlined, MedicineBoxOutlined } from "@ant-design/icons";
import Topbar from "../../Components/Topbar/Topbar";
import { getFilteredSalts } from "../../Actions/singlemedAction";
const { Text } = Typography;
const { TabPane } = Tabs;
let filterData = { sortby: [], brand: [], productForm: [], dosage: [], prescription: [] }
// Filter and Sorter Component starts here
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let prescriptionOptions = ["Yes", "Not Available"];
let productFormOptions = ["strip", "bottle", "Not Available"];
let dosageOptions = ["10mg", "20mg", "40mg", "80mg","Not Available"];
let brandOptions = [""];
const SortAndFilter = (props) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const onApplyHandle = () => {
        dispatch(getFilteredSalts({
            "input":props.medicineName,
            "manufacturer": (undefined !== filterData.brand && filterData.brand.length) ? filterData.brand : [""],
            "strength": (undefined !== filterData.dosage && filterData.dosage.length) ? filterData.dosage : [""],
            "pack_form": (undefined !== filterData.productForm && filterData.productForm.length) ? filterData.productForm : [""],
            "prescription":(undefined !== filterData.prescription && filterData.prescription.length) ? filterData.prescription : [""],
        }))
        onClose()
    }
    return (
        <Row>
            <Button onClick={showDrawer} icon={<FilterOutlined />}>
                Filter
            </Button>
            <Drawer
                title="Sort and Filter"
                placement="bottom"
                closable={false}
                onClose={onClose}
                visible={visible}
                height={"64%"}>
                <Tabs defaultActiveKey="1" tabPosition="left" style={{ height: "78%" }}>
                    <TabPane tab="Sort by" key="1">
                        <Radio.Group
                            onChange={props.handleSortByChange}
                            value={props.sortby}
                            style={{ display: "flex", flexDirection: "column" }}>
                            <Row className="sort-and-filter">
                                <Radio value="Popularity">Popularity</Radio>
                                <Radio value="Rating: High to Low">Rating: High to Low</Radio>
                                <Radio value="Cost: Low to High">Cost: Low to High</Radio>
                                <Radio value="Cost: High to Low">Cost: High to Low</Radio>
                            </Row>
                        </Radio.Group>
                    </TabPane>
                    <TabPane tab="Brand" key="2">
                        <Row className="sort-and-filter-brand">
                            <Checkbox.Group options={brandOptions} onChange={props.onBrandChange} style={{height:299, overflow:'scroll'}}/>
                        </Row>
                    </TabPane>
                    <TabPane tab="Product Form" key="3">
                        <Row className="sort-and-filter-brand">
                            <Checkbox.Group
                                options={productFormOptions}
                                onChange={props.onProductFormChange} />
                        </Row>
                    </TabPane>
                    <TabPane tab="Dosage" key="4">
                        <Row className="sort-and-filter-brand">
                            <Checkbox.Group
                                options={dosageOptions}
                                onChange={props.onDosageChange} />
                        </Row>
                    </TabPane>
                    <TabPane tab="Prescription" key="5">
                        <Row className="sort-and-filter-brand">
                            <Checkbox.Group
                                options={prescriptionOptions}
                                onChange={props.onPrescriptionChange} />
                        </Row>
                    </TabPane>
                </Tabs>
                <Divider />
                <Row className="sort-and-filter-button">
                    <Button size="large" style={{ width: 150 }}>
                        Clear All
                    </Button>
                    <Button size="large" style={{ width: 150 }} type="primary" onClick={onApplyHandle}>
                        Apply
                    </Button>
                </Row>
            </Drawer>
        </Row>
    );
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Filter and Sorter Component ends here

// FormulaResult Screen Component starts here
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const FormulaResult = () => {
    let history = useHistory();
    let { all_items } = useSelector(state => state.singleMed);
    let tempBrandOptions = [];
    let tempPackFormOptions = [];
    let tempDosageOptions = [];

    if(undefined !== all_items && all_items.length){
        all_items.forEach(element => {
            tempBrandOptions.push(element.manufacturer);
            tempPackFormOptions.push(element['pack form']);
            tempDosageOptions.push(element.strength_in_mg)
        });
    }
    let finalBrandOptions = [...new Set(tempBrandOptions)];
    let finalProductFormOptions = [... new Set(tempPackFormOptions)];
    let finalDosageOptions = [... new Set(tempDosageOptions)];

    brandOptions = finalBrandOptions;
    productFormOptions = finalProductFormOptions;
    dosageOptions = finalDosageOptions;
    const [sortby, setSortBy] = useState("Popularity");
    const [prescription, setPrescription] = useState([]);
    const [productForm, setProductForm] = useState([]);
    const [dosage, setDosage] = useState([]);
    const [brand, setBrand] = useState([]);
    const handleSortByChange = e => {
        setSortBy(e.target.value);
        filterData.sortby = e.target.value
    };
    const onBrandChange = checkedValues => {
        setBrand(checkedValues);
        filterData.brand = checkedValues
    };
    const onProductFormChange = checkedValues => {
        setProductForm(checkedValues);
        filterData.productForm = checkedValues
    };
    const onDosageChange = checkedValues => {
        setDosage(checkedValues);
        filterData.dosage = checkedValues
    };
    const onPrescriptionChange = checkedValues => {
        setPrescription(checkedValues);
        filterData.prescription = checkedValues
    };
    const onApplyHandle = () => {

    }
    if(undefined !== all_items && all_items.length)
    return (
        <Row className="formulaResult-main-view">
            <Topbar />
            <Row className="formulaResult-screen-container">
                <Row className="formulaResult-filter-column">
                    <SortAndFilter sortby={sortby} handleSortByChange={handleSortByChange} onBrandChange={onBrandChange} onProductFormChange={onProductFormChange} onDosageChange={onDosageChange} onPrescriptionChange={onPrescriptionChange} onApplyHandle={onApplyHandle} medicineName={all_items[0].medName}/>
                    <Text className="filter-code">Sort By {filterData.sortby}</Text>
                    {
                        filterData.productForm.length ? productForm.map(productForm => <Text className="filter-code" key={productForm}>{productForm}</Text>) : null
                    }
                    {
                        filterData.dosage.length ? dosage.map(dosage => <Text className="filter-code" key={dosage}>{dosage}</Text>) : null
                    }
                    {
                        filterData.prescription.length ? prescription.map(prescription => <Text className="filter-code" key={prescription}>{prescription}</Text>) : null
                    }
                    {
                        filterData.brand.length ? brand.map(brand => <Text className="filter-code" key={brand}>{brand}</Text>) : null
                    }
                </Row>
                <Row className="search-result-container">
                    <Card size="small"
                        title={<React.Fragment><ExperimentOutlined />&nbsp;&nbsp;{all_items[0].salts}</React.Fragment>}
                        bordered={true} className="search-result-introduction">
                        <Text type="secondary">{all_items[0].Introduction}</Text>
                    </Card>
                    <Row className="search-result-items">
                        {all_items.map(i => (

                            <Row key={i} style={{ margin: 15, display: 'flex', flexDirection: 'column', border: '1px solid #f0f0f0', padding: 15, cursor:'pointer' }} onClick={()=>history.push({pathname:'/medicine-detail', state: i })}>
                                <Text strong style={{ fontSize: 14 }}>{i.medName}</Text><br />
                                <Text type="secondary" style={{ fontSize: 11, marginTop: -24 }}>{i.manufacturer}</Text>
                                <Row style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                                    <Row style={{ display: 'flex', flexDirection: 'column', width: 105 }}>
                                        <Avatar shape="square" size={96} icon={<MedicineBoxOutlined />} />
                                    </Row>
                                    <Divider type="vertical" style={{ height: 120 }} />
                                    <Row style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Radio.Group defaultValue="a" size="small" style={{ display: 'flex', flexDirection: 'column', height: 95.8, overflow: 'scroll' }}>
                                            <Radio.Button value="a" style={{ margin: 4, fontSize: 11, minWidth: 104.8 }}>Netmeds: ₹{(i.netmeds_price === "Not Available") ? "N/A" : i.netmeds_price}</Radio.Button>
                                            <Radio.Button value="b" style={{ margin: 4, fontSize: 11, minWidth: 104.8 }}>Medlife: ₹{(i.medlife_price === "Not Available") ? "N/A" : i.medlife_price}</Radio.Button>
                                            <Radio.Button value="c" style={{ margin: 4, fontSize: 11, minWidth: 104.8 }}>1mg: ₹{(i.onemg_price === "Not Available" || i.onemg_price === undefined) ? "N/A" : i.onemg_price}</Radio.Button>
                                            <Radio.Button value="d" style={{ margin: 4, fontSize: 11, minWidth: 104.8 }}>PharmEasy: ₹{(i.pharmeasy_price === "Not Available") ? "N/A" : i.pharmeasy_price}</Radio.Button>
                                        </Radio.Group>
                                        <Button type="primary" size="small" style={{ width: 104.8, marginLeft: 3 }}>Add</Button>
                                    </Row>
                                </Row>
                            </Row>

                        ))}
                    </Row>
                </Row>
            </Row>
        </Row>
    )
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FormulaResult Screen Component ends here
export default FormulaResult