import React from "react";
import { Col, Row, TimePicker, DatePicker } from 'antd';
import moment from "moment";

const DateInputs = ({handleChange}) => {
  const format = 'HH:mm';
  return (
    <Row>
      {/* <Col md={6}>
        <Row align="middle">
          <Col md={4}>
            <div>Date :</div>
          </Col>
          <Col>
            <DatePicker onChange={e => handleChange("selectedDate", moment(e).format("DD MM YYYY"))} />
          </Col>
        </Row>
      </Col> */}

      <Col md={6}>
        <Row align="middle">
          <Col md={4}>
            <div>Time </div></Col>
          <Col>
            <TimePicker onChange={e => handleChange("selectedTime", moment(e).format("HH:mm")) } use12Hours={true} defaultValue={moment('12:08', format)} format={format} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default DateInputs