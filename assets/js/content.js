/* 王锦 · 作品集内容源
   播放数据来自抖音主账号后台（作品数据.xlsx，截至 2026-10） */
window.SITE = {
  name: "王 锦",
  nameTight: "王锦",
  role: "AI 短剧导演 / AIGC 视频导演",
  intent: "求职意向：AI 短剧导演 · AIGC 视频导演 ｜ 北京",
  lead: "两年，十部短剧，基本都是从剧本跟到成片。国内做男频逆袭和亲情反转，海外做英文版，也在 DramaBox 上过线。选题、分镜、生成、配音、调色，每个环节自己都干过。",

  phone: "13901299403",
  email: "baigeishaonianxiao@163.com",
  city: "北京市朝阳区",
  age: "21 岁",
  school: "中国传媒大学 · 影视编导",
  netdisk: "https://pan.baidu.com/s/1AmwV9ru76oMEKsYk8qQvGw?pwd=85tn",

  stats: [
    { n: 4.16, dec: 2, suffix: "亿", label: "累计播放", sub: "6 部执导作品 · 抖音主账号" },
    { n: 3.06, dec: 2, suffix: "亿", label: "单部最高", sub: "《妻子与陪伴机器人的秘密》" },
    { n: 1930, suffix: "万", label: "海外最高", sub: "《以牙还牙》DramaBox · 收藏 754K" },
    { n: 10, suffix: "部", label: "导演作品", sub: "国内 6 部 · 海外 4 部" }
  ],

  /* 播放量：抖音主账号后台读数 */
  domestic: [
    { no: "01", title: "妻子与陪伴机器人的秘密", genre: "男频 · 亲情反转", eps: 53, play: "3.06 亿",
      raw: "305958009", role: "导演",
      video: "assets/video/w05.mp4", poster: "assets/img/p05.jpg",
      note: "53 集。开场先把冲突摆出来，每集结尾留一个反转。任期内播放最高的一部。" },
    { no: "02", title: "人心隔肚皮，公道自在天", genre: "家庭伦理 · 复仇", eps: 43, play: "6664 万",
      raw: "66638611", role: "导演",
      video: "assets/video/w04.mp4", poster: "assets/img/p04.jpg",
      note: "43 集。每三集一个反转，人物关系先画成图，再拆成分镜。" },
    { no: "03", title: "你嫌家贫，却不知家藏万贯", genre: "家贫逆袭", eps: 52, play: "3066 万",
      raw: "30656601", role: "导演",
      video: "assets/video/w06.mp4", poster: "assets/img/p06.jpg",
      note: "52 集。前后两段光不一样：穷的时候低饱和、窄光比，翻身之后换成暖调。" },
    { no: "04", title: "不分钱，我逆袭成樱桃女王", genre: "女性逆袭", eps: 40, play: "760 万",
      raw: "7601673", role: "导演",
      video: "assets/video/w11.mp4", poster: "assets/img/p11.jpg",
      note: "40 集。大女主线用高饱和暖调，反差靠光打出来。" },
    { no: "05", title: "风断之时，冷暖自知", genre: "情感虐恋", eps: 40, play: "348 万",
      raw: "3484664", role: "导演",
      video: "assets/video/w07.mp4", poster: "assets/img/p07.jpg",
      note: "40 集。虐点放在每集前九十秒，后面留一口气给观众。" },
    { no: "06", title: "撕开机器人的伪装", genre: "身份反转", eps: 41, play: "200 万",
      raw: "2000274", role: "导演",
      video: "assets/video/w08.mp4", poster: "assets/img/p08.jpg",
      note: "41 集。角色三视图和参考图提前锁死，跨集不崩，揭底那一下才立得住。" },
    { no: "07", title: "749 密档：坠龙", genre: "悬疑 · 密档", eps: 38, play: "205 万",
      raw: "2047393", role: "参与制作", tag: "join",
      video: "assets/video/w01.mp4", poster: "assets/img/p01.jpg",
      note: "38 集。做了其中一部分集数的生成，跟着主创把全剧的调色统一。" }
  ],

  overseas: [
    { title: "Tit for Tat", zh: "以牙还牙", play: "19.3M", save: "754K", genre: "复仇爽剧",
      video: "assets/video/w10.mp4", poster: "assets/img/p10.jpg",
      note: "开场十五秒就得把冲突立住。海外观众不给铺垫的时间。" },
    { title: "The Man Inside Her Robot", zh: "她机器人里的男人", play: "2.9M", save: "111K", genre: "科幻 · 情感",
      video: "assets/video/w03.mp4", poster: "assets/img/p03.jpg",
      note: "机器人的质感和人的表演要放进同一个画面。TikTok 切片跑了 33 万。" },
    { title: "Mecha Underdog", zh: "机甲", play: "578K", save: "15K", genre: "机甲 · 逆袭",
      video: "assets/video/w09.mp4", poster: "assets/img/p09.jpg",
      note: "机体、材质、光效做成一整套，后面几集直接调。" },

    { title: "Revenge of the Hidden Mafia Heiress", zh: "温太太黑手党", play: "OPC", save: "—", genre: "黑手党 · 复仇",
      video: "assets/video/w02.mp4", poster: "assets/img/p02.jpg",
      note: "从选题到交付一个人做完。没有外包，也没有第二个人兜底。" }
  ],

  method: [
    { k: "开场三分钟", en: "OPENING",
      text: "不解释人物关系，先把矛盾摆出来。前三分钟留不住人，后面拍得再细也没用。我的习惯是把最狠的一句台词压在前四十秒，让观众来不及划走；第一集结束前必须有一次翻盘，否则完播率撑不住。" },
    { k: "别一张脸拍到底", en: "CAMERA",
      text: "正反打、过肩、情绪特写、空镜，按节奏换。AI 出图最容易一个机位到底，看着就困。每场戏我会先把机位表写死，再让模型照着出——出来的素材才有剪辑空间，而不是一堆不能剪的漂亮画面。" },
    { k: "先把色拉齐", en: "COLOR",
      text: "一级校色把每集的曝光和白平衡对齐，二级再按题材上风格。不统一，几十集剪在一起就是一盘拼盘。观众记住的从来不是某一帧多好看，而是整部片子从头到尾是同一种味道。" },
    { k: "能复用才算产能", en: "PIPELINE",
      text: "Prompt 和参考图做成模板，在 Coze 里串成流程。原来三天一部，后来一天一部。人还是那个人，产出翻了几倍，差别只在有没有把经验变成别人也能用的东西。" }
  ],

  works_extra: [
    { title: "囍蚀：阴缘结 / 开局灭门，我继承了聊斋秘术", genre: "东方志怪 · 系列", role: "AI 导演 / 总制作人",
      note: "两个项目一起推，没拖期。内部评审按他们的标准给了 S。" },
    { title: "末日来临：我在红雾里跑毒 等", genre: "动态漫 · 简笔画", role: "AI 导演 / 视觉风格设计",
      note: "线条少、色块大，一帧的成本是常规动画的十分之一。这类风格后来被用在别的项目上。" },
    { title: "木木与森", genre: "公益 · 商业", role: "AIGC 制作人",
      note: "客户要的是传统实拍的质感，最后是生成做的。热点新闻那种，两小时内能出片。" }
  ],

  tools: {
    gen: ["即梦", "Seedance 2.5", "Midjourney", "Stable Diffusion", "Runway"],
    audio: ["Suno", "Udio", "ElevenLabs"],
    post: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Final Cut Pro"],
    auto: ["Coze 工作流"]
  },

  timeline: [
    { year: "2026", from: "2026.01", to: "2026.10", org: "北京星火剧能网络科技有限公司", title: "AI 短剧导演",
      points: [
        "独立执导 6 部国内短剧，加起来 4.16 亿播放",
        "4 部海外剧上线 DramaBox，最高一部 1930 万",
        "有一部海外剧，从选题到交付是一个人做完的"
      ] },
    { year: "2025", from: "2025.06", to: "2025.12", org: "北京棠橙文化有限公司", title: "AIGC 视频创作师",
      points: [
        "角色和场景全用生成，制作成本降四成，出片快六成",
        "音频换成 Suno 和 ElevenLabs，一个项目省下 3000 元，三天的活一小时做完",
        "在 Coze 上把流程串起来，组里四个人都在用，出片从三天变一天"
      ] },
    { year: "2025", from: "2025.01", to: "2025.05", org: "北京棠橙文化有限公司", title: "视频制作实习生",
      points: [
        "跟了十多个商业项目的前期和分镜，镜头表是能直接照着拍的",
        "每天 50GB 素材的归档和备份，剪了 500 多分钟粗剪"
      ] },
    { year: "2024", from: "2024.08", to: "2024.12", org: "北京金兴鑫盛科茂有限公司", title: "拍摄助理",
      points: [
        "五场拍摄的现场统筹，搭景时间每场省下四十分钟",
        "重新排了布光和走位，效率提了两成"
      ] }
  ]
};
