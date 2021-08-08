export const outCallDate = [
  {
    id: 1,
    value: '今日',
    default: true
  },
  {
    id: 2,
    value: '本周'
  },
  {
    id: 3,
    value: '本月'
  },
  {
    id: 4,
    value: '本季度'
  },
  {
    id: 5,
    value: '本年'
  },
  {
    id: 6,
    value: '自定义',
    type: 'datePicker'
  }
]
// 时间维度
export const timeDimensionDate = [
  {
    id: 1,
    value: '日',
    default: true
  },
  {
    id: 2,
    value: '周'
  },
  {
    id: 3,
    value: '月'
  },
  {
    id: 4,
    value: '年'
  },
]

//筛选条件
export const conditionData = [
  {
    id: 1,
    value: '按时间',
    default: true
  },
  {
    id: 2,
    value: '按用户'
  },
  {
    id: 3,
    value: '按部门'
  },
]
//筛选条件类型枚举
export const screenType = {
  time: 1,//按时间
  user: 2,//按用户
  depart: 3,//按部门
}
//时间维度类型枚举
export const timeUnit = {
  day: 1,//日
  week: 2,//周
  month: 3,//月
  year: 4,//年
}
//通话时间类型枚举
export const queryTimeType = {
  all: 0,
  today: 1,//日
  week: 2,//周
  month: 3,//月
  quarter: 4,//季度
  year: 5,//年
  personalizations: 6,//自定义时间
}
//统计报表通话类型枚举
export const reportTypeEnum = {
  all: 0,
  incall: 4,
  outCall: 2,
}

// 是否接通
export const isConnect = [
  {
    id: 2,
    value: "是"
  },
  {
    id: 1,
    value: "否"
  }
]
// 是否有效呼出
export const effectiveType = [
  {
    id: 1,
    value: "是"
  },
  {
    id: 2,
    value: "否"
  }
]
// 通话时长
export const calledTime = [
  {
    id: 1,
    value: '10秒内'
  },
  {
    id: 2,
    value: '11~30秒'
  },
  {
    id: 3,
    value: '30~60秒'
  },
  {
    id: 4,
    value: '1~3分钟'
  },
  {
    id: 5,
    value: '3~6分钟'
  },
  {
    id: 6,
    value: '6~10分钟'
  },
  {
    id: 7,
    value: '10分钟以上'
  },
  {
    id: 8,
    value: '自定义时长',
    type: 'timeLength'
  }
]
// 通话时间
export const callTimeType = [
  {
    id: 1,
    value: '今日',
    default: true
  },
  {
    id: 2,
    value: '昨日'
  },
  {
    id: 3,
    value: '本周'
  },
  {
    id: 4,
    value: '上周'
  },
  {
    id: 5,
    value: '本月'
  },
  {
    id: 6,
    value: '上月'
  },
  {
    id: 7,
    value: '自定义时间段',
    type: 'datePicker'
  }
]
// 通话类型
export const callType = [
  {
    id: 2,
    value: '呼出',
    default: true
  },
  {
    id: 4,
    value: '呼入'
  },
]
//通话类型枚举
export const callTypeEnum = {
  all: 0,//全部
  outCall: 2,//呼出
  inCall: 4,//呼入
}
//通时间枚举
export const callTimeTypeEnum = {
  customize: 7
}
//是否有效呼出枚举
export const effectiveTypeEnum = {
  all: 0
}
//通话类型枚举
export const callTimeLengthEnum = {
  all: 0,
  customize: 8
}
//通话类型枚举
export const isConnentEnum = {
  all: 0,
  connected: 2,
  noConnect: 1
}
//公费电话类型枚举
export const xiaoHaoCallTypeEnum = {
  all: 0,//全部
  normalCall: 1,//普通拨号
  transfer: 2,//呼叫转移
  backLine: 3,//回拨线路
  xiaohao:3,//公费电话
  xiaoxiniu:5,//小犀牛线路
}
// 公费电话配置项
// 公费电话配置项
export const xiaoHaoCallType = [
  {
    id: 3,
    value: "回拨线路"
  },
  {
    id: 2,
    value: "智能线路"
  },
  {
    id: 1,
    value: "中间号"
  }
]
//呼叫方式
export const allCallMode =[
  {
    id: 1,
    value: "普通拨号"
  },
  {
    id: 2,
    value: "呼叫转移",
    type:'transfer'
  },
  {
    id: 3,
    value: "公费电话"
  },
  {
    id: 5,
    value: "小犀牛线路",
    type:'xiaoxiniu'
  },
  {
    id: 4,
    value: "(空白)"
  }
]
// 灰测权限
export const grayPermitEnum = {
  tdlx: 7,//天地连线
  transfer: 8,//呼叫转移
}
export const callTerminalType =[
  {
    id: 1,
    value: "电脑端"
  },
  {
    id: 2,
    value: "手机端",
  },
]