/*
 * 删人提醒
 * @author: wjt
 * @time: 2021-06-07 17:30:58
 */

import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import api from '../../apis/h5-sidebar/customer/potential-customer';
import apis from '../../apis/pc/reminder/reminder'
import MarketPagination from '../../components/common/pagination/commonPagination'; //分页
import useList from '../../hooks/useList';
import DeleteFilter from "./delete-filter";
import { useUpdateEffect } from "../../hooks/useUpdateEffect";
import { inputCheck } from '../../utils/smiley';
import { isValidIP } from "../../utils/utils";
import { connect } from 'react-redux';
import {
  Select,
  Input,
  Button,
  message,
  Table,
  Tooltip,
} from 'antd';
import {
  Wrapper,
  MainContent,
  MarketBody,
  BodyHead,
  BodyFoot,
  CommonHeader,
  CommonContent
} from '../../css/css';
import NotificationReminder from "../../components/modal/NotificationReminder"
import Resizable from "@/components/common/resizable/resizable";


const { Option } = Select;
const { Search } = Input;

const CustomerFilter = styled.div`
  width: 100%;
  padding: 8px 24px 0 24px;
  background: #fff;
  margin: 24px 0;
  padding-bottom: 20px;
`
const Customer = styled.div`
  margin-bottom: -15px;
  display: flex;
  flex-direction: row;
  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }
  div {
    margin-left: 5px;
  }
  p {
    line-height: 15px;
  }
  p > span:nth-child(1) {
    color: #FFA26E;
    cursor: pointer;
  }
  p > span:nth-child(2) {
    line-height: 16px;
  }
  .companyName {
    margin-left: 4px;
    color: #999999;
  }
`;

const CustomerTag = styled.div``;

const WhiteBackground = createGlobalStyle`
  body {
    .white-background .ant-tooltip-inner {
      font-size: 14px;
      font-weight: 400;
      color: #999999;
    }
    .firm .ant-btn-sm {
      height: 32px;
      padding: 0 15px;
    }
    .firm .ant-popover-message-title {
      padding-left: 1px;
    }
    //显示拖拽样式
    .components-table-resizable-column .react-resizable {
      position: relative ;
      background-clip: padding-box;
    }
    .components-table-resizable-column .react-resizable-handle {
      position: absolute;
      width: 10px;
      height: 100%;
      bottom: 0;
      right: -9px;
      cursor: col-resize;
      z-index: 1;
      border-left: white 1px solid;
    }
  }
`;

const mapStateToProps = (state) => {
  const { userInfo, crmModulePermission } = state
  return { ...userInfo, ...crmModulePermission }
}
const isLocal = isValidIP(window.location.hostname)

const deleteReminder = () => {

  const [condition, setCondition] = useState({ pageNum: 1, pageSize: 20, selectType: 1, orderBy: i });
  const { doSearch, loading, pagingConfig, list, total } = useList({ apiMethod: apis.getDeleteList, initParams: condition });
  const [column, setColumn] = useState([]);

  useUpdateEffect(() => {
    setColumn(
      [
        {
          title: '客户名称',
          width: 270,
          dataIndex: 'name',
          key: 'name',
          sorter: true,
          showSorterTooltip: false,
        },
        {
          title: '客户标签',
          dataIndex: 'customerLabels',
          key: 'customerLabels',
          width: 196,
        },
      ]
    )
  }, [list])

  // 覆盖默认的 table 元素
  const components = {
    header: {
      cell: Resizable,
    },
  };

  // 列宽拖动后计算
  const handleResize = index => (e, { size }) => {
    const nextColumns = [...columns];
    nextColumns[index] = {
      ...nextColumns[index],
      width: size.width,
    };
    setColumn(nextColumns);
  };

  // 列宽拖动
  const columns = column.map((col, index) => ({
    ...col,
    onHeaderCell: column => ({
      width: column.width,
      onResize: handleResize(index),
    }),
  }));

  return (
    <Wrapper>
      <WhiteBackground>
        <div className='components-table-resizable-column'>
          <Table
            columns={columns}
            dataSource={list}
            components={components}
            rowKey={(record) => record.id}
            rowClassName={
              (record, index) => index % 2 === 0 ? 'table-odd' : 'table-even'
            }
            pagination={false}
            loading={loading}
            onChange={onChangeTable}
            scroll={list.length ? { x: '130%' } : false}
            bordered
          />
        </div>
      </ WhiteBackground>
    </Wrapper>
  )
}
export default connect(mapStateToProps, null)(deleteReminder);
