import React, { useState } from 'react'
import { Select, Input, Form, Row, Col, Button, DatePicker } from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;
const FormItem = Form.Item
const defaultFormLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
const FormTemplate = (props) => {
  const { cols = 3, formList = [] } = props
  const [params, setParams] = useState({})
  const [form] = Form.useForm();
  const itemSpan = 24 / cols
  const layout = defaultFormLayout
  const initFormList = () => {
    const formItemList = []
    if (formList && formList.length > 0) {
      formList.forEach(item => {
        if (item.type === 'INPUT') {
          const INPUT = (
            <Col span={item.span || itemSpan} key={item.field}>
              <FormItem name={item.field} key={item.field} label={item.label} rules={[{ required: item.required, message: `${item.label}不能为空！` }]}>
                <Input allowClear placeholder={`请输入${item.label}`} />
              </FormItem>
            </Col>
          )
          formItemList.push(INPUT)
        } else if (item.type === 'SELECT') {
          const selectList = item.list
          const SELECT = (
            <Col span={item.span || itemSpan} key={item.field}>
              <FormItem name={item.field} key={item.field} label={item.label} rules={[{ required: item.required, message: `${item.label}不能为空！` }]}>
                <Select
                  mode={item.isMultiple}
                  placeholder={`请选择${item.label}`}
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {selectList.map(val => <Option key={val.id} label={item.name} value={val.id}>{val.name}</Option>)}
                </Select>
              </FormItem>
            </Col>
          )
          formItemList.push(SELECT)
        } else if (item.type === 'DATE') {
          const DATE = (
            <Col span={item.span || itemSpan} key={item.field}>
              <FormItem name={'date'} key={item.field} label={item.label} rules={[{ required: item.required, message: `${item.label}不能为空！` }]}>
                <RangePicker onChange={handleDateChange} format="YYYY/MM/DD HH:mm:ss" />
              </FormItem>
            </Col>
          )
          formItemList.push(DATE)
        }
      })
    }
    return formItemList
  }
  const handleDateChange = (value) => {
    setParams({ ...params, startTime: value ? value[0].format('YYYY-MM-DD') : '', endTime: value ? value[1].format('YYYY-MM-DD') : '' })
  }
  const handleSubmit = async () => {
    const formValue = await form.validateFields()
    let fromData = { ...formValue, ...params }
    Object.keys(fromData).forEach((key) => {
      if (fromData[key] === '') {
        fromData[key] = undefined
      }
    });
    // let tempObj = {}
    // for (let key in fromData) {
    //   if (fromData[key] || fromData[key] === 0) tempObj[key] = fromData[key];
    //   delete fromData['date']
    // }
    console.log(fromData);
  }
  return (
    <div>
      <Form {...layout} form={form}>
        <Row gutter={24}>
          {initFormList()}
          <span style={{ lineHeight: '40px' }}>
            <Button type="primary" style={{ marginLeft: 65 }} onClick={handleSubmit}>查询</Button>
          </span>
        </Row>
      </Form>
    </div>
  );
}

export default FormTemplate