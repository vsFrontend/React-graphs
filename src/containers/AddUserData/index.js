import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Radio, Select, Row, Col, Input, Button } from 'antd';

import { DateInputs, InputData } from '../../components'

import './style.css';
import { positions } from "../../utils/constants";

const { Option } = Select;
const { TextArea } = Input

const AddUserData = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    selectedDate: '',
    selectedTime: '',
    Mcondition: '',
    msahape: '',
    Upalpation: '',
    Usfh: '',
    Umultiple: false,
    Mtemp: 0,
    Mpulse: 0,
    MsBP: 0,
    MdBP: 0,
    MRR: 0,
    MUvolume: 0,
    MUprotein: '',
    MUktones: '',
    Fhr: 0,
    Fhrpattren: '',
    Fhrvariability: '',
    Fliquior: '',
    PcLength: 0,
    Pcfrequency: 0,
    Pcduration: 0,
    Fengaged: false,
    Pfheadfifths: 0,
    Pfheadmoduling: 0,
    Pfheadposition: '',
    PoxytonicUL: 0,
    PoxytonicDM: 0,
    EconentrationUL: 0,
    EconentrationDM: 0,
    otherNotes: '',
    CDilation: 0,
    position: 'OA',
    min: 100,
    max: 180
  });

  const handleChange = (inputName, inputValue) => {
    console.log(inputName, inputValue)
   
    setUserData({
      ...userData,
      [inputName]: inputValue
    });
  }

  const saveUserData = async () => {
    handleChange("min", parseInt(100));
    handleChange("max", parseInt(180));

    if (userData.selectedTime === "") {
      return alert("Please select time");
    }
    try {
      let myPrevData = await localStorage.getItem("MyData") || "{}"
      myPrevData = JSON.parse(myPrevData)
      // if (myPrevData[`${userData.selectedDate} ${userData.selectedTime}`]) {
      //   alert("Please change Date or time")
      //   return
      // }
      myPrevData[userData.selectedTime] = userData;
      localStorage.setItem("MyData", JSON.stringify(myPrevData));
      setUserData(
        {
          selectedDate: '',
          selectedTime: '',
          Mcondition: '',
          msahape: '',
          Upalpation: '',
          Usfh: '',
          Umultiple: false,
          Mtemp: '',
          Mpulse: '',
          MsBP: '',
          MdBP: '',
          MRR: '',
          MUvolume: '',
          MUprotein: '',
          MUktones: '',
          Fhr: '',
          Fhrpattren: '',
          Fhrvariability: '',
          Fliquior: '',
          PcLength: 0,
          Pcfrequency: '',
          Pcduration: '',
          Fengaged: false,
          Pfheadfifths: '',
          Pfheadmoduling: '',
          Pfheadposition: '',
          PoxytonicUL: '',
          PoxytonicDM: '',
          EconentrationUL: '',
          EconentrationDM: '',
          otherNotes: '',
          CDilation: '',
          min: 100,
          max: 180
        }
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form-container">
      <DateInputs handleChange={handleChange} />
      <Row align="middle" style={{ marginTop: 20 }}>
        <Col md={4}>
          <div className="add-form-main-heading">Meternal Condition</div>
        </Col>
        <Col>
          <Select onChange={(e) => handleChange("Mcondition", e)} defaultValue="normal" style={{ width: 120 }}>
            <Option value="normal">Normal</Option>
            <Option value="notnormal">Not Normal</Option>
            <Option value="high">High</Option>
          </Select>
        </Col>
      </Row>

      <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
        <Col md={3}>
          <div>Abdomen</div>
        </Col>

        <Col md={4}>
          <InputData value={userData.msahape} onChange={e => handleChange("msahape", e.target.value)} title="Shape" placeholder="Shape" />
        </Col>

        <Col md={4}>
          <InputData value={userData.Usfh} onChange={e => handleChange("Usfh", parseInt(e.target.value))} type="number" subTitle="cm" title="SFH" placeholder="SFH" />
        </Col>
        <Col md={4}>
          <InputData
            onChange={(e) => handleChange("Upalpation", e.target.value)}
            value={userData.Upalpation}
            title="Palpation"
            placeholder="Palpation"
          />
        </Col>
        <Col md={6}>
          <Row gutter={[8, 8]}>
            <Col md={8}>
              <div>Multiple : </div>
            </Col>
            <Col md={16}>
              <Radio.Group onChange={e => handleChange("Umultiple", e.target.value)} value={userData.Umultiple}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
        <Col md={3}>
          <div>Vitals</div>
        </Col>

        <Col md={4}>
          <InputData value={userData.Mtemp} type="number" onChange={e => handleChange('Mtemp', parseInt(e.target.value))} subTitle="C" title="Temp" placeholder="temp" />
        </Col>

        <Col md={4}>
          <InputData value={userData.Mpulse} type="number" onChange={e => handleChange('Mpulse', parseInt(e.target.value))} subTitle="bpm" title="Pulse" placeholder="Pulse" />
        </Col>
        <Col md={4}>
          <Row align="middle">
            <Col md={10}>
              <div>BP</div>
            </Col>
            <Col md={14}>
              <Row align="middle" gutter={[7, 6]}>
                <Col md={24}>
                  <Input style={{width: '100%'}} value={userData.MdBP} onChange={e => handleChange("MdBP", parseInt(e.target.value))} type="number" />

                </Col>
                <Col md={24}>
                  <div style={{textAlign: 'center'}}>/</div>
                </Col>
                <Col md={24}>
                  <Input style={{width: '100%'}} value={userData.MsBP} onChange={e => handleChange("MsBP", parseInt(e.target.value))} type="number" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <InputData value={userData.MRR} type="number" onChange={e => handleChange("MRR", parseInt(e.target.value))} subTitle="bpm" title="RR" placeholder="RR" />
        </Col>
      </Row>

      <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
        <Col md={3}>
          <div>Urine</div>
        </Col>

        <Col md={4}>
          <InputData value={userData.MUvolume} type="number" onChange={(e) => handleChange("MUvolume", parseInt(e.target.value))} subTitle="ml" title="Urin Vol" placeholder="urine" />
        </Col>

        <Col md={4}>
          <InputData value={userData.MUprotein} onChange={e => handleChange("MUprotein", e.target.value)} subTitle="+" title="Protien" placeholder="Protien" />
        </Col>
        <Col md={4}>
          <InputData onChange={e => handleChange("MUketones", e.target.value)} subTitle="+" title="Ketones" placeholder="Ketones" />
        </Col>
      </Row>

      <Row align="middle" style={{ marginTop: 20 }}>
        <Col md={4}>
          <div className="add-form-main-heading">Fetal Condition</div>
        </Col>

      </Row>

      <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>

        <Col md={1} ></Col>

        <Col md={4}>
          <InputData value={userData.Fhr} type="number" onChange={e => handleChange('Fhr', parseInt(e.target.value))} subTitle="bpm" title="FHR" placeholder="FHR" />
        </Col>

        <Col md={4}>
          <InputData value={userData.Fhrpattren} onChange={e => handleChange('Fhrpattren', e.target.value)} title="Pattren" placeholder="Pattren" />
        </Col>
        <Col md={4}>
          <InputData value={userData.Fhrvariability} onChange={e => handleChange('Fhrvariability', e.target.value)} title="Variablility" placeholder="Variablility" />
        </Col>
      </Row>

      <Row style={{ marginTop: 20 }} align="middle">

        <Col md={1} ></Col>

        <Col md={2}>
          <div>Liquor</div>
        </Col>

        <Col md={4}>
          <Select onChange={e => handleChange('Fliquior', e)} defaultValue="normal" style={{ width: '100%' }} >
            <Option value="normal">Noraml</Option>
            <Option value="notnormal">Not normal</Option>
            <Option value="high">High</Option>
          </Select>
        </Col>


      </Row>

      <Row align="middle" style={{ marginTop: 20 }}>
        <Col md={4}>
          <div className="add-form-main-heading">Progress of labour</div>
        </Col>
      </Row>

      <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
        <Col md={3}>
          <div>Cervix</div>
        </Col>

        <Col md={6}>
          <InputData value={userData.CDilation} onChange={e => handleChange("CDilation", parseInt(e.target.value))} type="number" subTitle="cm" title="CDilation" placeholder="CDilation" />
        </Col>

        <Col md={6}>
          <InputData value={userData.PcLength} type="number"  onChange={e => handleChange("PcLength", parseInt(e.target.value))} title="CLength" placeholder="CLength" />
        </Col>

        <Col md={4}>
          <Select onChange={e => handleChange('position', e)} value={userData.position} style={{ width: '100%' }} >
            {positions?.map((position, index) => (
              <Option key={index} value={position.value}>{position.name}</Option>
            ))}
          </Select>
        </Col>

      </Row>

      <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
        <Col md={3}>
          <div>Contractions</div>
        </Col>

        <Col md={6}>
          <InputData value={userData.Pcfrequency} type="number" onChange={e => handleChange("Pcfrequency", parseInt(e.target.value))} subTitle="10 min" title="Frequency" placeholder="Frequency" />
        </Col>

        <Col md={6}>
          <InputData value={userData.Pcduration} type="number" onChange={e => handleChange("Pcduration", parseInt(e.target.value))} subTitle="sec" title="Duration" placeholder="Duration" />
        </Col>

      </Row>


      <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
        <Col md={3}>
          <div>Fetal Head</div>
        </Col>

        <Col md={5}>
          <Row gutter={[8, 8]}>
            <Col md={8}>
              <div>Engaged : </div>
            </Col>
            <Col md={16}>
              <Radio.Group onChange={e => handleChange("Fengaged", e.target.value)} value={userData.Fengaged}>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <InputData value={userData.Pfheadfifths} type="number" onChange={e => handleChange("Pfheadfifths", parseInt(e.target.value))} subTitle="fifth" title="Above brims" placeholder="Above brims" />
        </Col>

        <Col md={6}>
          <InputData value={userData.Pfheadmoduling} type="number" onChange={e => handleChange("Pfheadmoduling", parseInt(e.target.value))} subTitle="sec" title="Moulding" placeholder="Moulding" />
        </Col>
        <Col md={4}>
          <InputData value={userData.Pfheadposition} onChange={e => handleChange("Pfheadposition", e.target.value)} title="Station" placeholder="Station" />
        </Col>

      </Row>


      <Row align="middle" style={{ marginTop: 20 }}>
        <Col md={4}>
          <div className="add-form-main-heading">Medication</div>
        </Col>

      </Row>

      <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
        <Col md={1}></Col>
        <Col md={3}>
          <div>Oxytonic</div>
        </Col>

        <Col md={6}>
          <InputData value={userData.PoxytonicUL} type="number" onChange={e => handleChange("PoxytonicUL", parseInt(e.target.value))} subTitle="U/L" title="Conentration" placeholder="Conentration" />
        </Col>

        <Col md={6}>
          <InputData value={userData.PoxytonicDM} type="number" onChange={e => handleChange("PoxytonicDM", parseInt(e.target.value))} subTitle="drop/min" title="Rate" placeholder="Rate" />
        </Col>

      </Row>

      <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
        <Col md={1}></Col>
        <Col md={3}>
          <div>Epidural</div>
        </Col>

        <Col md={6}>
          <InputData value={userData.EconentrationUL} type="number" onChange={e => handleChange("EconentrationUL", parseInt(e.target.value))} subTitle="U/L" title="Conentration" placeholder="Conentration" />
        </Col>

        <Col md={6}>
          <InputData type="number" value={userData.EconentrationDM} onChange={e => handleChange("EconentrationDM", parseInt(e.target.value))} subTitle="drop/min" title="Rate" placeholder="Rate" />
        </Col>

      </Row>

      <Row style={{ marginTop: 20, marginBottom: 20 }}>
        <Col md={24}>
          <div style={{ marginBottom: 10 }} className="add-form-main-heading">Other notes</div>
        </Col>
        <Col md={24}>
          <TextArea value={userData.otherNotes} onChange={e => handleChange("otherNotes", e.target.value)} rows={5} style={{ width: '100%' }} />
        </Col>
      </Row>

      <Row align="middle" justify="center">
        <Button onClick={saveUserData} type="primary">
          Save
        </Button>
      </Row>
    </div>
  )
}

export default AddUserData