module.exports = {
  "title": "阿冰の神秘小屋",
  "description": "",
  "dest": "public",
  "base": "/",
  "locales": {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    //下拉箭头
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    //鼠标点击
    ["script", { src: "/assets/js/bodyClick.js" }]
  ],
  "theme": "jabinblog",
  // theme: 'reco',
  themeConfig: {
    "mode": 'dark',
    "type": "blog",
    "search": true,
    // "searchMaxSuggestions": 5,
    // "lastUpdated": "Last Updated",
    "author": "阿冰",
    'authorAvatar': '/xiao.png',
    // "noFoundPageByTencent": true,
    //顶栏
    nav: [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "前端黑科技",
        "icon": "reco-date",
        "items": [
          {
            "text": "CSSの浪漫",
            "link": "/blog/css浪漫动画/手风琴"
          },
          {
            "text": "js封装工具",
            "link": "/blog/js封装工具/时间格式化"
          },

        ]
      },
      {
        "text": "牛逼の文章",
        "icon": "reco-document",
        "items": [
          {
            "text": "react",
            "link": "/docs/react/公用内容"
          },
          {
            "text": "js原生",
            "link": "/docs/jsn/数组"
          }
        ]
      },
      {
        "text": "码云",
        "icon": "reco-message",
        "items": [
          {
            "text": "gitee",
            "link": "https://gitee.com/wang-chenbing/dashboard/projects",
            "icon": "reco-github"
          }
        ]
      }
    ],
    //侧边栏
    sidebar: {
      '/docs/react/': [
        {
          "title": "react",
          "collapsable": false,
          "children": [
            '公用内容',
            'class类组件',
            'Hooks函数组件',
            '源码编写',
            '组件antd注意事项'
          ]
        },
      ],
      '/docs/jsn/': [
        {
          "title": "js",
          "collapsable": false,
          "children": [
            '数组',
            "BOM对象",
            "DOM操作",
            "flex布局",
            "Git",
            "移动端踩坑指南",
            "CentOS7安装Nginx",
            'loading 加载动画'
          ]
        },
      ],
      '/blog/js封装工具/': [
        '时间格式化',
        '过滤对象中为空的属性',
        'Cookie增删改查',
        '函数柯里化',
        '滚动条操作',
        '排序',
        'call && apply && bind',
        '节流&防抖',
        'Base64转Blob',
        '保留小数',
        '常用正则表达式',
        'Number处理'

      ],
      '/blog/css浪漫动画/': [
        '手风琴',
        '随机轮播',
        '旋转木马',
        '霓虹灯六角形粒子动画',
      ]
    }
  },
  // configureWebpack: {
  //   "resolve": {
  //     "alias": {
  //       '@assets': '/assets'
  //     }
  //   }
  // },
  // markdown: {
  //   "lineNumbers": true
  // },
  //插件
  plugins: [
    //樱花插件
    ["sakura", {
      num: 10,  // 默认数量
      show: true, //  是否显示
      zIndex: 1,// 层级
      img: {
        replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
        httpUrl: '/img/sakura.png'     // 绝对路径
      }
    }],
    //彩带
    ["ribbon-animation", {
      size: 90,   // 默认数据
      opacity: 0.3,  //  透明度
      zIndex: 1,   //  层级
      opt: {
        // 色带HSL饱和度
        colorSaturation: "80%",
        // 色带HSL亮度量
        colorBrightness: "60%",
        // 带状颜色不透明度
        colorAlpha: 0.65,
        // 在HSL颜色空间中循环显示颜色的速度有多快
        colorCycleSpeed: 6,
        // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
        verticalPosition: "center",
        // 到达屏幕另一侧的速度有多快
        horizontalSpeed: 200,
        // 在任何给定时间，屏幕上会保留多少条带
        ribbonCount: 2,
        // 添加笔划以及色带填充颜色
        strokeSize: 0,
        // 通过页面滚动上的因子垂直移动色带
        parallaxAmount: -0.5,
        // 随着时间的推移，为每个功能区添加动画效果
        animateSections: true
      },
      ribbonShow: false, //  点击彩带  true显示  false为不显示
      ribbonAnimationShow: true  // 滑动彩带
    }],
    //回到顶上
    ['go-top'],
    //url
    [
      "dynamic-title",
      {
        showIcon: "https://www.zpzpup.com/assets/image/favicon.ico",
        showText: "欢迎回来 O(∩_∩)O~",
        hideIcon: "https://www.zpzpup.com/assets/image/favicon.ico",
        hideText: "失联中。。。快回来~",
        recoverTime: 2000
      }
    ],
  ]
}
