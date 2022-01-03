import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Radio, Select, Row, Col, Input, Button, notification, Form } from 'antd';
import { DateInputs, InputData } from '../../components';
import { cDilationData, cLength, positions, aboveBrimsData, ociputData, Pcfrequency, Pcduration } from '../../utils/constants';
import './style.css';

const { Option } = Select;
const { TextArea } = Input;

const AddUserData = () => {
  const navigate = useNavigate();
  const [isEnabledPosition, setEnabledPostion] = useState(false);

  const [userData, setUserData] = useState({
    selectedDate: '',
    selectedTime: '',
    Mcondition: '',
    msahape: '',
    Upalpation: '',
    Usfh: '',
    Umultiple: false,
    Mtemp: 0,
    Mpulse: null,
    MsBP: null,
    MdBP: null,
    MRR: null,
    MUvolume: 0,
    MUprotein: '',
    MUktones: '',
    Fhr: null,
    Fhrpattren: '',
    Fhrvariability: '',
    Fliquior: '',
    PcLength: null,
    Pcfrequency: null,
    Pcduration: null,
    Fengaged: false,
    Pfheadfifths: null,
    Pfheadmoduling: null,
    Pfheadposition: '',
    PoxytonicUL: null,
    PoxytonicDM: null,
    EconentrationUL: null,
    EconentrationDM: null,
    otherNotes: '',
    CDilation: null,
    position: 'OA',
    presenting: 'Occiput',
    min: 100,
    max: 180,
  });

  const handleChange = (inputName, inputValue) => {
    setUserData({
      ...userData,
      [inputName]: inputValue,
    });
  };

  const cerviCalObject = {
    cDilation: userData.CDilation,
    PcLength: userData.PcLength,
    Pfheadfifths: userData.Pfheadfifths,
  };

  const saveUserData = async () => {
    console.log('Check onfinish');
    if (Object.values(cerviCalObject).filter((item) => item !== null).length !== 0) {
      if (userData.CDilation === null) {
        notification.warning({
          message: 'Alert',
          description: 'Plese enter dilation value',
        });
        return;
      }
      if (userData.PcLength === null) {
        notification.warning({
          message: 'Alert',
          description: 'Plese enter CLength value',
        });
        return;
      }
      if (userData.Pfheadfifths === null) {
        notification.warning({
          message: 'Alert',
          description: 'Plese enter Above brim value',
        });
        return;
      }
    }
    handleChange('min', parseInt(100));
    handleChange('max', parseInt(180));

    try {
      let myPrevData = (await localStorage.getItem('MyData')) || '{}';
      myPrevData = JSON.parse(myPrevData);

      if (!userData.selectedTime) {
        notification.warning({
          message: 'Alert',
          description: 'Please enter time.',
        });
        return;
      }

      if (myPrevData[`${userData.selectedDate} ${userData.selectedTime}`]) {
        notification.warning({
          message: 'Alert',
          description: 'Data for this time already exists.',
        });
        return;
      }

      myPrevData[userData.selectedTime] = userData;
      localStorage.setItem('MyData', JSON.stringify(myPrevData));

      if (userData.MsBP > 220) {
        notification.warning({
          message: 'Alert',
          description: 'Blood pressure must be less then or equal to 220',
        });
        return;
      }

      setUserData({
        selectedDate: '',
        selectedTime: '',
        Mcondition: '',
        msahape: '',
        Upalpation: '',
        Usfh: '',
        Umultiple: false,
        Mtemp: '',
        Mpulse: null,
        MsBP: '',
        MdBP: '',
        MRR: '',
        MUvolume: '',
        MUprotein: '',
        MUktones: '',
        Fhr: null,
        Fhrpattren: '',
        Fhrvariability: '',
        Fliquior: '',
        PcLength: 0,
        Pcfrequency: '',
        Pcduration: '',
        Fengaged: false,
        Pfheadfifths: null,
        Pfheadmoduling: '',
        Pfheadposition: '',
        PoxytonicUL: '',
        PoxytonicDM: '',
        EconentrationUL: '',
        EconentrationDM: '',
        otherNotes: '',
        CDilation: '',
        presenting: '',
        min: 100,
        max: 180,
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData.presenting === 'Occiput') {
      handleChange('position', 'OA');
      setEnabledPostion(false);
    } else {
      setEnabledPostion(true);
      handleChange('position', 'LP');
    }
  }, [userData.presenting]);

  const checkCervicObjLength = () => {
    return Object.values(cerviCalObject).filter((item) => item !== null).length;
  };

  let isCervicDataNull = checkCervicObjLength() !== 0;
  return (
    <div className="form-container">
      <Form onFinish={saveUserData}>
        <DateInputs handleChange={handleChange} />
        <Row align="middle" style={{ marginTop: 20 }}>
          <Col md={4}>
            <div className="add-form-main-heading">Maternal Condition</div>
          </Col>
          <Col>
            <Select onChange={(e) => handleChange('Mcondition', e)} defaultValue="normal" style={{ width: 350 }}>
              <Option value="normal">Normal</Option>
              <Option value="notnormal">Excessive anxiety</Option>
              <Option value="serve">Severe, continuous pain</Option>
              <Option value="dehydration">Dehydration</Option>
              <Option value="dehydration">Marked pallor of the face and mucous membranes</Option>
            </Select>
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
          <Col md={3}>
            <div>Abdomen</div>
          </Col>

          <Col md={4}>
            <InputData value={userData.msahape} onChange={(e) => handleChange('msahape', e.target.value)} title="Shape" placeholder="Shape" />
          </Col>

          <Col md={4}>
            <InputData value={userData.Usfh} onChange={(e) => handleChange('Usfh', parseInt(e.target.value))} type="number" subTitle="cm" title="SFH" placeholder="SFH" />
          </Col>
          <Col md={4}>
            <InputData onChange={(e) => handleChange('Upalpation', e.target.value)} value={userData.Upalpation} title="Palpation" placeholder="Palpation" />
          </Col>
          <Col md={6}>
            <Row gutter={[8, 8]}>
              <Col md={8}>
                <div>Multiple : </div>
              </Col>
              <Col md={16}>
                <Radio.Group onChange={(e) => handleChange('Umultiple', e.target.value)} value={userData.Umultiple}>
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
            <InputData value={userData.Mtemp} type="number" onChange={(e) => handleChange('Mtemp', parseInt(e.target.value))} subTitle="C" title="Temp" placeholder="temp" />
          </Col>

          <Col md={4}>
            <InputData value={userData.Mpulse} type="number" onChange={(e) => handleChange('Mpulse', parseInt(e.target.value))} subTitle="bpm" title="Pulse" placeholder="Pulse" />
          </Col>
          <Col md={4}>
            <Row align="middle">
              <Col md={4}>
                <div>BP</div>
              </Col>
              <Col md={20}>
                <Row align="middle" gutter={[7, 6]}>
                  <Col md={11}>
                    <Input style={{ width: '100%' }} value={userData.MsBP} onChange={(e) => handleChange('MsBP', parseInt(e.target.value))} type="number" />
                  </Col>
                  <Col md={1}>
                    <div style={{ textAlign: 'center' }}>/</div>
                  </Col>
                  <Col md={11}>
                    <Input style={{ width: '100%' }} value={userData.MdBP} onChange={(e) => handleChange('MdBP', parseInt(e.target.value))} type="number" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <InputData value={userData.MRR} type="number" onChange={(e) => handleChange('MRR', parseInt(e.target.value))} subTitle="bpm" title="RR" placeholder="RR" />
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
          <Col md={3}>
            <div>Urine</div>
          </Col>

          <Col md={4}>
            <InputData
              value={userData.MUvolume}
              type="number"
              onChange={(e) => handleChange('MUvolume', parseInt(e.target.value))}
              subTitle="ml"
              title="Urin Vol"
              placeholder="urine"
            />
          </Col>

          <Col md={4}>
            <InputData value={userData.MUprotein} onChange={(e) => handleChange('MUprotein', e.target.value)} subTitle="+" title="Protien" placeholder="Protien" />
          </Col>
          <Col md={4}>
            <InputData onChange={(e) => handleChange('MUketones', e.target.value)} subTitle="+" title="Ketones" placeholder="Ketones" />
          </Col>
        </Row>

        <Row align="middle" style={{ marginTop: 20 }}>
          <Col md={4}>
            <div className="add-form-main-heading">Fetal Condition</div>
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
          <Col md={1}></Col>

          <Col md={4}>
            <InputData value={userData.Fhr} type="number" onChange={(e) => handleChange('Fhr', parseInt(e.target.value))} subTitle="bpm" title="FHR" placeholder="FHR" />
          </Col>

          <Col md={4}>
            <InputData value={userData.Fhrpattren} onChange={(e) => handleChange('Fhrpattren', e.target.value)} title="Pattern" placeholder="Pattern" />
          </Col>
          <Col md={4}>
            <InputData value={userData.Fhrvariability} onChange={(e) => handleChange('Fhrvariability', e.target.value)} title="Variablility" placeholder="Variablility" />
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }} align="middle">
          <Col md={1}></Col>
          <Col md={2}>
            <div>Liquor</div>
          </Col>
          <Col md={4}>
            <Select onChange={(e) => handleChange('Fliquior', e)} defaultValue="normal" style={{ width: '100%' }}>
              <Option value="normal">Normal</Option>
              <Option value="notnormal">Not Normal</Option>
              <Option value="high">High</Option>
            </Select>
          </Col>
        </Row>

        <Row align="middle" style={{ marginTop: 20 }}>
          <Col md={4}>
            <div className="add-form-main-heading">Progress of Labour</div>
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
          <Col md={3}>
            <div>Cervix</div>
          </Col>

          <Col md={6}>
            <Row align="middle">
              <Col md={10}>
                <div>CDilation: </div>
              </Col>
              <Col md={14}>
                <Form.Item style={{ marginTop: 25 }} name={'CDilation'} rules={[{ required: isCervicDataNull ? true : false, message: 'Enter dilation.' }]}>
                  <Select onChange={(e) => handleChange('CDilation', e)} value={userData.CDilation} style={{ width: '100%' }} title="CDilation">
                    {cDilationData?.map((position, index) => (
                      <Option key={index} value={position.number}>
                        {position.number}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <Row align="middle">
              <Col md={10}>
                <div>CLength: </div>
              </Col>
              <Col md={14}>
                <Form.Item style={{ marginTop: 25 }} name={'PcLength'} rules={[{ required: isCervicDataNull ? true : false, message: 'Enter length.' }]}>
                  <Select onChange={(e) => handleChange('PcLength', e)} value={userData.PcLength} style={{ width: '100%' }} title="CLength">
                    {cLength?.map((position, index) => (
                      <Option key={index} value={position.number}>
                        {position.number}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
          <Col md={3}>
            <div>Presenting Part</div>
          </Col>

          <Col md={6}>
            <Select onChange={(e) => handleChange('presenting', e)} value={userData.presenting} style={{ width: '100%' }} title="Presenting">
              {ociputData?.map((position, index) => (
                <Option key={index} value={position.value}>
                  {position.name}
                </Option>
              ))}
            </Select>
          </Col>

          {isEnabledPosition ? null : (
            <Col md={6}>
              <Select disabled={isEnabledPosition} onChange={(e) => handleChange('position', e)} value={userData.position} style={{ width: '100%' }} title="Position">
                {positions?.map((position, index) => (
                  <Option key={index} value={position.value}>
                    {position.name}
                  </Option>
                ))}
              </Select>
            </Col>
          )}
        </Row>

        <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
          <Col md={3}>
            <div>Fetal Condition</div>
          </Col>

          <Col md={5}>
            <Row gutter={[8, 8]}>
              <Col md={8}>
                <div>Engaged : </div>
              </Col>
              <Col md={16}>
                <Radio.Group onChange={(e) => handleChange('Fengaged', e.target.value)} value={userData.Fengaged}>
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <Row align="middle">
              <Col md={10}>
                <div>Above brim: </div>
              </Col>
              <Col md={14}>
                <Form.Item style={{ marginTop: 25 }} name={'Pfheadfifths'} rules={[{ required: isCervicDataNull ? true : false, message: 'Enter above brim.' }]}>
                  <Select onChange={(e) => handleChange('Pfheadfifths', e)} value={userData.Pfheadfifths} style={{ width: '100%' }} title="Pfheadfifths">
                    {aboveBrimsData?.map((position, index) => (
                      <Option key={index} value={position.number}>
                        {position.number}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <InputData
              value={userData.Pfheadmoduling}
              type="number"
              onChange={(e) => handleChange('Pfheadmoduling', parseInt(e.target.value))}
              subTitle="sec"
              title="Moulding"
              placeholder="Moulding"
            />
          </Col>
          <Col md={4}>
            <InputData value={userData.Pfheadposition} onChange={(e) => handleChange('Pfheadposition', e.target.value)} title="Station" placeholder="Station" />
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
          <Col md={3}>
            <div>Contractions</div>
          </Col>

          <Col md={6}>
            <Row>
              <Col md={10}>
                <div>Frequency: </div>
              </Col>
              <Col md={14}>
                <Select onChange={(e) => handleChange('Pcfrequency', e)} value={userData.Pcfrequency} style={{ width: '100%' }} title="Pcfrequency">
                  {Pcfrequency?.map((position, index) => (
                    <Option key={index} value={position.number}>
                      {position.number}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <Row>
              <Col md={10}>
                <div>Duration/sec: </div>
              </Col>
              <Col md={14}>
                <Select onChange={(e) => handleChange('Pcduration', parseInt(e))} value={userData.Pcduration} style={{ width: '100%' }} title="Pcduration">
                  {Pcduration?.map((position, index) => (
                    <Option key={index} value={position.number}>
                      {position.number}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
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
            <div>Oxytocin</div>
          </Col>

          <Col md={6}>
            <InputData
              value={userData.PoxytonicUL}
              type="number"
              onChange={(e) => handleChange('PoxytonicUL', parseInt(e.target.value))}
              subTitle="U/L"
              title="Conentration"
              placeholder="Conentration"
            />
          </Col>

          <Col md={6}>
            <InputData
              value={userData.PoxytonicDM}
              type="number"
              onChange={(e) => handleChange('PoxytonicDM', parseInt(e.target.value))}
              subTitle="drop/min"
              title="Rate"
              placeholder="Rate"
            />
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }} align="middle" gutter={[6, 6]}>
          <Col md={1}></Col>
          <Col md={3}>
            <div>Epidural</div>
          </Col>

          <Col md={6}>
            <InputData
              value={userData.EconentrationUL}
              type="number"
              onChange={(e) => handleChange('EconentrationUL', parseInt(e.target.value))}
              subTitle="U/L"
              title="Conentration"
              placeholder="Conentration"
            />
          </Col>

          <Col md={6}>
            <InputData
              type="number"
              value={userData.EconentrationDM}
              onChange={(e) => handleChange('EconentrationDM', parseInt(e.target.value))}
              subTitle="drop/min"
              title="Rate"
              placeholder="Rate"
            />
          </Col>
        </Row>

        <Row style={{ marginTop: 20, marginBottom: 20 }}>
          <Col md={24}>
            <div style={{ marginBottom: 10 }} className="add-form-main-heading">
              Other notes
            </div>
          </Col>
          <Col md={24}>
            <TextArea value={userData.otherNotes} onChange={(e) => handleChange('otherNotes', e.target.value)} rows={5} style={{ width: '100%' }} />
          </Col>
        </Row>
        <Row align="middle" justify="center">
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default AddUserData;
