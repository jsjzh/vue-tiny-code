/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-11 10:55:03
 * @LastEditTime: 2019-02-28 14:35:48
 * @Description: 组件相关信息
 */

/**
 * align
 * center: center
 * left: flex-start
 * right: flex-end
 * around: space-around
 * between: space-between
 */

export const layoutData = {
  children: [
    {
      align: 'flex-start',
      height: 100,
      index: 0,
      showControllerBar: false,
      children: [
        { showChildrenControllerBar: false, layoutCol: 4.8, initLayoutCol: 4.8 },
        { showChildrenControllerBar: false, layoutCol: 4.8, initLayoutCol: 4.8 },
        { showChildrenControllerBar: false, layoutCol: 4.8, initLayoutCol: 4.8 },
        { showChildrenControllerBar: false, layoutCol: 4.8, initLayoutCol: 4.8 },
        { showChildrenControllerBar: false, layoutCol: 4.8, initLayoutCol: 4.8 }
      ]
    },
    {
      align: 'flex-start',
      height: 250,
      index: 1,
      showControllerBar: false,
      children: [{ showChildrenControllerBar: false, layoutCol: 24, initLayoutCol: 24 }]
    },
    {
      align: 'flex-start',
      height: 250,
      index: 2,
      showControllerBar: false,
      children: [{ showChildrenControllerBar: false, layoutCol: 24, initLayoutCol: 24 }]
    },
    {
      align: 'flex-start',
      height: 250,
      index: 3,
      showControllerBar: false,
      children: [{ showChildrenControllerBar: false, layoutCol: 24, initLayoutCol: 24 }]
    }
  ]
}

// 预计做成这样，有个 types 可以提供选择，因为很多图都是一样的，比如曲线图和折线图什么乱七八糟的
// 这些组件就用同一个图，然后选择组件的时候就要选择 type，然后这些组件都有对应的接口
// 然后后续应该还会有一个对应的 key，该 key 表示接口过来的 json 数据的 key
export const componentDatas = [
  {
    types: [
      {
        label: '1 --- 占位组件',
        value: 1,
        componentName: 'demo',
        api: '/ponysafety2/a/report/getdeptscorereport',
        dataKey: 'drive_score_city'
      }
    ],
    selectValue: 1,
    height: 250,
    previewImage: require('../img/col-1-0.png'),
    label: 1,
    layoutCol: 1
  },
  {
    types: [
      {
        label: '2 --- 占位组件',
        value: 1,
        componentName: 'demo',
        api: '/ponysafety2/a/report/getdeptscorereport',
        dataKey: 'drive_score_city'
      }
    ],
    selectValue: 1,
    height: 250,
    previewImage: require('../img/col-2-0.png'),
    label: 2,
    layoutCol: 2
  },
  {
    types: [
      {
        label: '3 --- 占位组件',
        value: 1,
        componentName: 'demo',
        api: '/ponysafety2/a/report/getdeptscorereport',
        dataKey: 'drive_score_city'
      }
    ],
    selectValue: 1,
    height: 250,
    previewImage: require('../img/col-3-0.png'),
    label: 3,
    layoutCol: 3
  },
  {
    types: [
      {
        label: '4 --- 占位组件',
        value: 1,
        componentName: 'demo',
        api: '/ponysafety2/a/report/getdeptscorereport',
        dataKey: 'drive_score_city'
      }
    ],
    selectValue: 1,
    height: 250,
    previewImage: require('../img/col-4-0.png'),
    label: 4,
    layoutCol: 4
  },
  {
    types: [
      {
        label: '驾驶评分',
        value: 1,
        componentName: 'four-dot-eight-default',
        api: '/ponysafety2/a/report/getdeptscorereport',
        method: 'get',
        dataKey: 'drive_score_total',
        previewImage: require('../img/col-4.8-1.png')
      },
      {
        label: '高速评分',
        value: 2,
        componentName: 'four-dot-eight-default',
        api: '/ponysafety2/a/report/getdeptscorereport',
        method: 'get',
        dataKey: 'drive_score_motorway',
        previewImage: require('../img/col-4.8-2.png')
      },
      {
        label: '非高速评分',
        value: 3,
        componentName: 'four-dot-eight-default',
        api: '/ponysafety2/a/report/getdeptscorereport',
        method: 'get',
        dataKey: 'drive_score_city',
        previewImage: require('../img/col-4.8-3.png')
      },
      {
        label: '日间评分',
        value: 4,
        componentName: 'four-dot-eight-default',
        api: '/ponysafety2/a/report/getdeptscorereport',
        method: 'get',
        dataKey: 'drive_score_day',
        previewImage: require('../img/col-4.8-4.png')
      },
      {
        label: '夜间评分',
        value: 5,
        componentName: 'four-dot-eight-default',
        api: '/ponysafety2/a/report/getdeptscorereport',
        method: 'get',
        dataKey: 'drive_score_night',
        previewImage: require('../img/col-4.8-5.png')
      }
    ],
    selectValue: 1,
    height: 100,
    previewImage: require('../img/col-4.8-1.png'),
    label: 4.8,
    layoutCol: 4.8
  },
  {
    types: [
      {
        label: '6 --- 占位组件',
        value: 1,
        componentName: 'demo',
        api: '/ponysafety2/a/report/getdeptscorereport',
        dataKey: 'drive_score_city'
      }
    ],
    selectValue: 1,
    height: 250,
    previewImage: require('../img/col-6-0.png'),
    label: 6,
    layoutCol: 6
  },
  {
    types: [
      {
        label: '报警车速分布图',
        value: 1,
        componentName: 'alarm-speed-distribution',
        api: '/ponysafety2/a/report/getdeptscorereport',
        dataKey: 'drive_score_city'
      }
    ],
    selectValue: 1,
    height: 250,
    previewImage: require('../img/col-8-1.png'),
    label: 8,
    layoutCol: 8
  },
  {
    types: [
      {
        label: '作业时段分布图（次）',
        value: 1,
        componentName: 'working-time-distribution',
        api: '/ponysafety2/a/report/gettraildeptworktime',
        method: 'post',
        dataKey: '',
        previewImage: require('../img/col-12-1.png')
      },
      {
        label: '作业趋势图（次）',
        value: 2,
        componentName: 'working-time-tendency',
        api: '/ponysafety2/a/report/gettraildeptworktime',
        method: 'post',
        dataKey: 'work_detail_day',
        previewImage: require('../img/col-12-2.png')
      }
    ],
    selectValue: 1,
    height: 250,
    previewImage: require('../img/col-12-1.png'),
    label: 12,
    layoutCol: 12
  },
  {
    types: [
      {
        label: '风险类型分布图（TOP5）',
        value: 1,
        componentName: 'risk-type-distribution',
        api: '/ponysafety2/a/report/getdeptalarmreport',
        method: 'get',
        dataKey: 'adas_alarm_types',
        previewImage: require('../img/col-16-1.png')
      }
    ],
    selectValue: 1,
    height: 250,
    previewImage: require('../img/col-16-1.png'),
    label: 16,
    layoutCol: 16
  },
  {
    types: [
      {
        label: '评分图',
        value: 1,
        componentName: 'full-tabs-grade',
        api: '/ponysafety2/a/report/getdeptscorereport',
        method: 'get',
        dataKey: '',
        previewImage: require('../img/col-24-1.png')
      }
    ],
    selectValue: 1,
    height: 250,
    previewImage: require('../img/col-24-1.png'),
    label: 24,
    layoutCol: 24
  }
]
