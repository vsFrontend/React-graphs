import React from "react";
import { Col, Row, Input } from 'antd';

import './style.css';


const InputData = ({title, subTitle, placeholder, onChange, type, value}) => {
  return (
    <div>
      <Row gutter={[10,10]} align="middle">
        <Col md={10}>
          <div className="heading-input">{title}: <span className="sub-title-heaidng">{subTitle}</span> </div>
        </Col>
        <Col md={14}>
          <Input value={value} type={type} onChange={onChange} placeholder={placeholder} />
        </Col>
      </Row>
    </div>
  )
}

export default InputData;
