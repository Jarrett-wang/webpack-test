//3.x版本
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
  const { cols = 4, formList = [], onSearch, form: { getFieldDecorator, validateFields } } = props
  const [params, setParams] = useState({})
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
                {getFieldDecorator(item.field, {
                  rules: [{ required: item.required, message: `${item.label}不能为空！` }],
                })(<Input placeholder={`请输入${item.label}`} />)}
              </FormItem>
            </Col>
          )
          formItemList.push(INPUT)
        } else if (item.type === 'SELECT') {
          const selectList = item.list
          const SELECT = (
            <Col span={item.span || itemSpan} key={item.field}>
              <FormItem name={item.field} key={item.field} label={item.label} rules={[{ required: item.required, message: `${item.label}不能为空！`}]}>
                {getFieldDecorator(item.field, {
                  rules: [{ required: item.required, message: `${item.label}不能为空！` }],
                })(
                  item.components ? item.components : <Select
                    mode={item.isMultiple}
                    placeholder={`请选择${item.label}`}
                    allowClear
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {selectList.length && selectList.map(val => <Option key={val.value} label={item.label}>{val.label}</Option>)}
                  </Select>
                )}
              </FormItem>
            </Col>
          )
          formItemList.push(SELECT)
        } else if (item.type === 'DATE') {
          const DATE = (
            <Col span={item.span || itemSpan} key={item.field}>
              <FormItem name={item.field} key={item.field} label={item.label} rules={[{ required: item.required, message: `${item.label}不能为空！` }]}>
                {getFieldDecorator(item.field, {
                  rules: [{ required: item.required, message: `${item.label}不能为空！` }],
                })(<RangePicker onChange={handleDateChange} format="YYYY/MM/DD HH:mm:ss" />)}
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
    validateFields((err, values) => {
      if (err) return;
      Object.keys(values).forEach((key) => {
        if (values[key] === '') {
          values[key] = undefined
        }
      });
      onSearch(values);
    })
  }
  return (
    <div>
      <Form {...layout}>
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

//支持传入组件或者使用默认的组件
// 使用方法
// const formList = [
//   {
//     type: 'SELECT',
//     label: '企业名称',
//     field: 'organizationId',
//     placeholder: '请输入企业名称',
//     components:<NameComplete placeholder={`请输入企业名称`} enable={enable}/>
//   },
//   {
//     type: 'INPUT',
//     label: 'CorpId',
//     field: 'corpId',
//     placeholder: '请输入CorpId',
//   },
  
//   {
//     type: 'SELECT',
//     label: '平台类型',
//     field: 'appType',
//     list: appTypeDict
//   },
//   {
//     type: 'SELECT',
//     label: '外呼方案',
//     field: 'outboundPlan',
//     list: outCallMidPlan
//   },
//   {
//     type: 'SELECT',
//     label: '所属代理商',
//     field: 'agentName',
//     list: agent
//   },
//   {
//     type: 'SELECT',
//     label: '售后客服',
//     field: 'customerServiceName',
//     list: customer
//   },
//   {
//     type: 'SELECT',
//     label: '禁用状态',
//     field: 'disable',
//     list: [
//       {
//         value: true,
//         label: '是'
//       },
//       {
//         value: false,
//         label: '否'
//       }
//     ]
//   },
//   {
//     type: 'SELECT',
//     label: '黑名单过滤',
//     field: 'blackEnable',
//     list: [
//       {
//         value: 1,
//         label: '开启'
//       },
//       {
//         value: 0,
//         label: '关闭'
//       }
//     ]
//   },
//   {
//     type: 'SELECT',
//     label: '保证金状态',
//     field: 'guaranteeEnable',
//     isMultiple:"",
//     list: [
//       {
//         value: true,
//         label: "开启"
//       },
//       {
//         value: false,
//         label: "关闭"
//       },
//     ]
//   },
// ]

export default Form.create()(FormTemplate);
