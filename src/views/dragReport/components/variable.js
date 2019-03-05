export const suggestLayouts = [
  {
    cols: [
      { height: 100, value: 4.8 },
      { height: 100, value: 4.8 },
      { height: 100, value: 4.8 },
      { height: 100, value: 4.8 },
      { height: 100, value: 4.8 }
    ]
  },
  { cols: [{ height: 250, value: 16 }, { height: 250, value: 8 }] },
  { cols: [{ height: 250, value: 12 }, { height: 250, value: 12 }] },
  { cols: [{ height: 250, value: 8 }, { height: 250, value: 8 }, { height: 250, value: 8 }] },
  { cols: [{ height: 250, value: 24 }] }
]

export const box = [
  {
    col: [
      { active: false, height: 30, placeholderCol: 4.8 },
      { active: false, height: 30, placeholderCol: 4.8 },
      { active: false, height: 30, placeholderCol: 4.8 },
      { active: false, height: 30, placeholderCol: 4.8 },
      { active: false, height: 30, placeholderCol: 4.8 }
    ]
  },
  {
    col: [{ active: false, height: 50, placeholderCol: 16 }, { active: false, height: 50, placeholderCol: 8 }]
  },
  {
    col: [{ active: false, height: 50, placeholderCol: 12 }, { active: false, height: 50, placeholderCol: 12 }]
  },
  {
    col: [
      { active: false, height: 50, placeholderCol: 8 },
      { active: false, height: 50, placeholderCol: 8 },
      { active: false, height: 50, placeholderCol: 8 }
    ]
  },
  { col: [{ active: false, height: 50, placeholderCol: 24 }] }
]

export const componentDatas = [
  {
    label: '1 --- 占位组件',
    componentKey: 1,
    componentName: 'demo',
    api: '/ponysafety2/a/report/getdeptscorereport',
    method: 'get',
    dataKey: 'drive_score_city',
    col: 1,
    height: 250,
    previewImage: require('../img/col-1-0.png')
  },
  {
    label: '2 --- 占位组件',
    componentKey: 2,
    componentName: 'demo',
    api: '/ponysafety2/a/report/getdeptscorereport',
    method: 'get',
    dataKey: 'drive_score_city',
    col: 2,
    height: 250,
    previewImage: require('../img/col-2-0.png')
  },
  {
    label: '3 --- 占位组件',
    componentKey: 3,
    componentName: 'demo',
    api: '/ponysafety2/a/report/getdeptscorereport',
    method: 'get',
    dataKey: 'drive_score_city',
    col: 3,
    height: 250,
    previewImage: require('../img/col-3-0.png')
  },
  {
    label: '4 --- 占位组件',
    componentKey: 4,
    componentName: 'demo',
    api: '/ponysafety2/a/report/getdeptscorereport',
    method: 'get',
    dataKey: 'drive_score_city',
    col: 4,
    height: 250,
    previewImage: require('../img/col-4-0.png')
  },
  {
    label: '驾驶评分',
    componentKey: 5,
    componentName: 'four-dot-eight-default',
    api: '/ponysafety2/a/report/getdeptscorereport',
    method: 'get',
    dataKey: 'drive_score_total',
    col: 4.8,
    height: 100,
    previewImage: require('../img/col-4.8-1.png')
  },
  {
    label: '高速评分',
    componentKey: 6,
    componentName: 'four-dot-eight-default',
    api: '/ponysafety2/a/report/getdeptscorereport',
    method: 'get',
    dataKey: 'drive_score_motorway',
    col: 4.8,
    height: 100,
    previewImage: require('../img/col-4.8-2.png')
  },
  {
    label: '非高速评分',
    componentKey: 7,
    componentName: 'four-dot-eight-default',
    api: '/ponysafety2/a/report/getdeptscorereport',
    method: 'get',
    dataKey: 'drive_score_city',
    col: 4.8,
    height: 100,
    previewImage: require('../img/col-4.8-3.png')
  },
  {
    label: '日间评分',
    componentKey: 8,
    componentName: 'four-dot-eight-default',
    api: '/ponysafety2/a/report/getdeptscorereport',
    method: 'get',
    dataKey: 'drive_score_day',
    col: 4.8,
    height: 100,
    previewImage: require('../img/col-4.8-4.png')
  },
  {
    label: '夜间评分',
    componentKey: 9,
    componentName: 'four-dot-eight-default',
    api: '/ponysafety2/a/report/getdeptscorereport',
    method: 'get',
    dataKey: 'drive_score_night',
    col: 4.8,
    height: 100,
    previewImage: require('../img/col-4.8-5.png')
  },
  {
    label: '6 --- 占位组件',
    componentKey: 10,
    componentName: 'demo',
    api: '/ponysafety2/a/report/getdeptscorereport',
    method: 'get',
    dataKey: 'drive_score_city',
    col: 6,
    height: 250,
    previewImage: require('../img/col-6-0.png')
  },
  {
    label: '报警车速分布图',
    componentKey: 11,
    componentName: 'alarm-speed-distribution',
    api: '/ponysafety2/a/report/getdeptscorereport',
    method: 'get',
    dataKey: 'drive_score_city',
    col: 8,
    height: 250,
    previewImage: require('../img/col-8-1.png')
  },
  {
    label: '作业时段分布图（次）',
    componentKey: 12,
    componentName: 'working-time-distribution',
    api: '/ponysafety2/a/report/gettraildeptworktime',
    method: 'post',
    dataKey: '',
    col: 12,
    height: 250,
    previewImage: require('../img/col-12-1.png')
  },
  {
    label: '作业趋势图（次）',
    componentKey: 13,
    componentName: 'working-time-tendency',
    api: '/ponysafety2/a/report/gettraildeptworktime',
    method: 'post',
    dataKey: 'work_detail_day',
    col: 12,
    height: 250,
    previewImage: require('../img/col-12-2.png')
  },
  {
    label: '风险类型分布图（TOP5）',
    componentKey: 14,
    componentName: 'risk-type-distribution',
    api: '/ponysafety2/a/report/getdeptalarmreport',
    method: 'get',
    dataKey: 'adas_alarm_types',
    col: 16,
    height: 250,
    previewImage: require('../img/col-16-1.png')
  },
  {
    label: '评分图',
    componentKey: 15,
    componentName: 'full-tabs-grade',
    api: '/ponysafety2/a/report/getdeptscorereport',
    method: 'get',
    dataKey: '',
    col: 24,
    height: 250,
    previewImage: require('../img/col-24-1.png')
  }
]
