// ============================================================================
// 小冈知识库 (knowledge.ts)
// 从本仓库现有页面内容中提取的结构化知识，供 API 的 function calling 使用。
// 原则：只提取仓库里已有的事实，不编造。提取不到的字段留空并注明。
// 每个区块标注 source（来源文件）。
// ============================================================================

// ---- 1. 转山路线分段（来源：src/pages/routes.astro 的 supplyStations） ----
// 说明：distanceFromPrev 为页面标注的「相对上一站距离」，页面总量 52km 与
// 各段相加略有出入，属页面原始数据，未做推算。
export interface RouteSegment {
  id: number;
  name: string;
  nameEn: string;
  altitude: number;          // 海拔（米）
  distanceFromPrev: string;  // 页面原始字符串，如 "7km" / "+2.6km" / "0km（起点）"
  type: 'start' | 'teahouse' | 'camp' | 'peak' | 'end';
  supply: string[];          // 可购买物资
  lodging: string;           // 住宿情况
  services: string;          // 服务
}

export const ROUTE_SEGMENTS: RouteSegment[] = [
  { id: 1, name: '塔尔钦', nameEn: 'Tarqin (Darchen)', altitude: 4600, distanceFromPrev: '0km（起点）', type: 'start',
    supply: ['矿泉水','可乐','能量饮料','方便面','面包','巧克力','牛肉干','压缩饼干','氧气瓶','冲锋衣','帽子','手套','登山杖','护膝','防晒霜','唇膏'],
    lodging: '客栈、酒店（多人间/标间）', services: '餐厅、商店、加油站、邮局、网吧、医务室、租车/马/背夫' },
  { id: 2, name: '色雄大经幡', nameEn: 'Sexung Prayer Flags', altitude: 4700, distanceFromPrev: '7km', type: 'teahouse',
    supply: ['酥油茶','奶茶','热水','泡面','饼干'], lodging: '无住宿', services: '小型茶馆，建议停留10–20分钟' },
  { id: 3, name: '曲古寺小桥', nameEn: 'Choku Bridge', altitude: 4800, distanceFromPrev: '+2.6km', type: 'teahouse',
    supply: ['热水','饮料','零食'], lodging: '无住宿', services: '路边小铺' },
  { id: 4, name: '珠牡沐浴瀑布', nameEn: 'Jomu Waterfall', altitude: 4900, distanceFromPrev: '+4.5km', type: 'teahouse',
    supply: ['酥油茶','热水','泡面'], lodging: '无住宿', services: '临时板房' },
  { id: 5, name: '马头明王石茶馆', nameEn: 'Hayagriva Rock Teahouse', altitude: 5000, distanceFromPrev: '+2.3km', type: 'teahouse',
    supply: ['酥油茶','奶茶','热水','泡面','饼干','能量棒'], lodging: '无住宿', services: '中型茶馆' },
  { id: 6, name: '止热寺 / 哲日普寺', nameEn: 'Drirapuk Gompa', altitude: 5200, distanceFromPrev: '+4.2km（D1住宿点）', type: 'camp',
    supply: ['酥油茶','奶茶','藏面','蛋炒饭','泡面','饼干','巧克力','牛肉干','矿泉水','饮料','零食','简单药品','氧气瓶'],
    lodging: '多人间（5–10人）、毛毯/被子，建议自备-10℃睡袋', services: '大型补给站：餐厅+住宿+商店' },
  { id: 7, name: '卓玛拉山口', nameEn: 'Drolma La Pass', altitude: 5648, distanceFromPrev: '+5.8km（最高点）', type: 'peak',
    supply: [], lodging: '无补给', services: '只有经幡、玛尼堆，停留5–10分钟，快速通过，注意防风保暖' },
  { id: 8, name: '托吉措 / 慈悲湖', nameEn: 'Tsoji Lake', altitude: 5400, distanceFromPrev: '+2.6km', type: 'teahouse',
    supply: ['酥油茶','热水','泡面'], lodging: '无住宿', services: '小茶馆' },
  { id: 9, name: '第三不动地钉茶馆', nameEn: '3rd Immovable Peg Teahouse', altitude: 5100, distanceFromPrev: '+2.4km', type: 'teahouse',
    supply: ['酥油茶','奶茶','热水','泡面','饼干'], lodging: '无住宿', services: '中型茶馆' },
  { id: 10, name: '空地母密道出口对面', nameEn: 'Sky Dancer Exit', altitude: 4900, distanceFromPrev: '+3km', type: 'teahouse',
    supply: ['热水','饮料','零食'], lodging: '无住宿', services: '临时板房' },
  { id: 11, name: '仲哲普寺 / 祖楚寺', nameEn: 'Zhongzhepu Temple', altitude: 4800, distanceFromPrev: '+4.5km', type: 'camp',
    supply: ['酥油茶','藏面','泡面','零食'], lodging: '多人间（旺季开放）', services: '中型补给，简易住宿' },
  { id: 12, name: '宗堆茶馆', nameEn: 'Zongdui Teahouse', altitude: 4700, distanceFromPrev: '+6.2km', type: 'teahouse',
    supply: ['热水','饮料','零食'], lodging: '无住宿', services: '路边小铺' },
  { id: 13, name: '塔尔钦', nameEn: 'Tarqin (Finish)', altitude: 4600, distanceFromPrev: '+4km（终点）', type: 'end',
    supply: ['矿泉水','可乐','能量饮料','方便面','面包','巧克力','牛肉干','压缩饼干','氧气瓶','冲锋衣','帽子','手套','登山杖','护膝','防晒霜','唇膏'],
    lodging: '客栈、酒店（多人间/标间）', services: '餐厅、商店、加油站、邮局、网吧、医务室、租车/马/背夫' }
];

// 行程方案（来源：src/pages/routes.astro 的 routePlans）
export const ROUTE_PLANS = [
  { name: '三天转山（标准）', distance: '52公里', duration: '3天2夜', difficulty: '中等',
    days: [
      { day: '第一天', route: '塔尔钦 → 止热寺', distance: '22公里', altitude: '4600m → 5200m', duration: '6-8小时' },
      { day: '第二天', route: '止热寺 → 尊最普寺（翻卓玛拉垭口5648m）', distance: '18公里', altitude: '5200m → 5648m → 4800m', duration: '8-10小时' },
      { day: '第三天', route: '尊最普寺 → 塔尔钦', distance: '12公里', altitude: '4800m → 4600m', duration: '3-4小时' }
    ] },
  { name: '两天转山（挑战）', distance: '52公里', duration: '2天1夜', difficulty: '困难',
    days: [
      { day: '第一天', route: '塔尔钦 → 止热寺', distance: '22公里', altitude: '4600m → 5200m', duration: '6-8小时' },
      { day: '第二天', route: '止热寺 → 卓玛拉垭口 → 塔尔钦', distance: '30公里', altitude: '5200m → 5648m → 4600m', duration: '10-14小时' }
    ],
    warning: '第二天需行走30公里且翻越5648米垭口，不建议初次转山者选择。' },
  { name: '一天转山（极限）', distance: '52-56公里', duration: '1天（12-22小时）', difficulty: '极限',
    warning: '⚠️ 极高风险！每年均有救援案例。仅限藏族资深朝圣者、专业耐力运动员、极少数硬核驴友。普通游客禁止尝试！' }
];

// ---- 2. 最佳季节与各月天气（来源：src/content/blog/zh/kailash-best-season-2026.md + src/pages/guide.astro monthlyDetail） ----
export const SEASON = {
  overall: '4月-10月可转山；最佳窗口为 5月中旬-6月中旬 与 9月全月；7-8月为雨季，11月-次年3月冬季封闭。',
  peak: '5月-6月、9月-10月',
  avoid: '避开7-8月雨季，冬季（11月-3月）大雪封山',
  monthly: [
    { month: '4月', temp: '-5°C ~ 10°C', weather: '残雪未消，早晚严寒', pro: '游客稀少，价格较低，雪山景色壮丽', con: '垭口积雪可能未融化，需备冰爪' },
    { month: '5月', temp: '-2°C ~ 13°C', weather: '回暖明显，白天舒适，天气稳定，能见度极佳', pro: '全年最佳转山窗口之一', con: '早晚温差大，5月下旬游客开始增多' },
    { month: '6月', temp: '2°C ~ 16°C', weather: '日照充足（白昼超14小时），偶有阵雨', pro: '萨嘎达瓦节（藏历四月十五）通常在6月，转山功德翻倍', con: '节日期间人山人海，住宿涨价30%-50%' },
    { month: '7月', temp: '5°C ~ 18°C', weather: '雨季高峰，午后多雷阵雨', pro: '气温全年最舒适，草原绿意盎然；印度官方朝圣团集中此时', con: '路面泥泞湿滑，偶有塌方；云雾可能遮住神山' },
    { month: '8月', temp: '6°C ~ 19°C', weather: '雨季尾声，湿度较大', pro: '植被最茂盛，看到野生动物概率最高', con: '云雾较多，神山可能被遮挡' },
    { month: '9月', temp: '0°C ~ 14°C', weather: '秋高气爽，天空澄澈，雨季彻底结束', pro: '全年最好的转山月份之一', con: '夜晚温度骤降，月末可能偶有早雪' },
    { month: '10月', temp: '-4°C ~ 10°C', weather: '初冬气息，偶有降雪', pro: '秋色巅峰，游客渐少', con: '夜晚可降至-10°C以下，月末可能降雪封路' },
    { month: '11月-3月', temp: '可低于-20°C', weather: '冬季封闭', pro: '', con: '不建议转山：卓玛拉垭口被深雪覆盖，沿途茶馆全部关闭' }
  ],
  source: 'blog/zh/kailash-best-season-2026.md; pages/guide.astro'
};

// ---- 3. 高原反应分级与处置（来源：src/content/blog/zh/kailash-altitude-sickness.md + src/pages/guide.astro） ----
export const AMS = {
  overview: '冈仁波齐转山最高点卓玛拉山口约5648m（部分页面写5630m），平均徒步海拔超4700m，空气含氧量约为海平面55%。AMS本质是脑部轻度水肿。',
  // 路易斯湖 AMS 评分分级
  levels: [
    { level: '轻微', symptoms: '轻度头痛（弯腰时加重）、乏力、食欲下降', severity: '不影响基本活动', action: '原地休息1天，不继续上升，多喝水，可服布洛芬' },
    { level: '中度', symptoms: '持续头痛（药物难缓解）、恶心呕吐、明显乏力、头晕', severity: '影响活动但可勉强行走', action: '立即停止上升，休息至少24小时，服止吐药，考虑下降500-1000米' },
    { level: '严重', symptoms: '剧烈头痛、反复呕吐、走路不稳（共济失调）、极度疲劳、静息时呼吸困难', severity: '无法自理，行走困难', action: '立即下降至少1000米，寻求医疗救助，可能需要地塞米松急救' },
    { level: '危险', symptoms: '意识模糊、幻觉、昏迷（HACE）、咳粉红色泡沫痰（HAPE）', severity: '生命危险', action: '紧急撤离，立即下降+吸氧，必须专业医疗介入' }
  ],
  // 分级症状速查（来源：guide.astro symptomChecklist）
  symptomChecklist: [
    { symptom: '轻度头痛', level: '轻度', action: '休息、喝水、服止痛药' },
    { symptom: '恶心/食欲减退', level: '轻度', action: '清淡饮食、少量多餐' },
    { symptom: '疲乏无力', level: '轻度', action: '充分休息、补充葡萄糖' },
    { symptom: '失眠多梦', level: '中度', action: '药物助眠、低流量吸氧' },
    { symptom: '呼吸困难', level: '中度', action: '减慢速度、深呼吸、吸氧' },
    { symptom: '持续呕吐', level: '重度', action: '立即下撤、寻求医疗' },
    { symptom: '意识模糊', level: '危重', action: '紧急下撤、呼叫救援' },
    { symptom: '粉红色泡沫痰', level: '危重', action: '此为肺水肿征兆，即刻下撤' }
  ],
  dangerSigns: [
    '走路不稳（共济失调）——HACE前兆',
    '静息状态下气喘——可能是HAPE信号',
    '意识改变——迷糊、答非所问、昏昏欲睡',
    '咳出粉红色泡沫状痰——HAPE典型表现'
  ],
  goldenRules: [
    '上升速度是决定因素，而非绝对海拔。',
    '症状出现后，停止上升；症状加重，立即下降。',
    '不要在高原上"硬扛"——高反不会在相同海拔自行消失。',
    '海拔上升，睡眠高度最关键。',
    '任何人对高反都没有"免疫力"。'
  ],
  prevention: [
    { drug: '乙酰唑胺（醋氮酰胺）', usage: '上升前1天开始，125mg每日2次，到达最高海拔后再服2天', note: '首选预防药；磺胺类过敏者禁用；处方药' },
    { drug: '布洛芬', usage: '头痛时400mg/次，每日不超过1200mg', note: '缓解头痛，不治疗AMS本身' },
    { drug: '地塞米松', usage: '严重AMS/HACE急救：8mg首剂，之后每6小时4mg', note: '仅急救用，不可用于预防，不能替代下降；处方药' },
    { drug: '红景天/高原安', usage: '按说明提前1周-2周服用', note: '研究证据有限，不能替代梯度适应和乙酰唑胺' }
  ],
  acclimatize: '在3000米以上，每天睡眠海拔提升不超过300-500米；到达塔钦（约4675m）后至少休息一整天再开始转山。',
  hydration: '每天饮水3-4升；少食多餐、以碳水为主；避免酒精、安眠药、大餐。',
  spo2: [
    { range: '90%以上', eval: '良好', action: '正常活动' },
    { range: '85%-89%', eval: '偏低', action: '放慢节奏，深呼吸，休息' },
    { range: '80%-84%', eval: '较低', action: '停止上升，休息，补水' },
    { range: '80%以下', eval: '危险', action: '立即下降，考虑吸氧' }
  ],
  scenarios: [
    { scene: '到达塔钦当晚头痛', right: '服布洛芬400mg，大量温水，卧床休息，不洗澡不喝酒；多数人次日好转。', wrong: '忍痛不吃药、吃安眠药、按原计划出发。' },
    { scene: '卓玛拉垭口前恶心呕吐', right: '立即告知同伴/向导，停下休息，小口喝水，必要时含服止吐药；头晕加重或走路不稳必须下撤。', wrong: '独自坚持、隐瞒症状、不补水。' },
    { scene: '同伴意识模糊、走路摇晃', right: 'HACE急症：立即组织下撤，给服地塞米松8mg（如有），吸氧，立即联系救援。', wrong: '让患者"睡一觉就好了"。' }
  ],
  evacuation: '紧急求助：西藏旅游救援 0891-12301；塔钦镇卫生所可初步急救和吸氧；最近正规医院为狮泉河（阿里）医院，约300公里；部分路段可直升机救援（需保险覆盖）。',
  source: 'blog/zh/kailash-altitude-sickness.md; pages/guide.astro; pages/assistant.astro'
};

// ---- 4. 签证 / 边防证 / 入藏函（来源：pages/guide.astro, pages/faq.astro, blog/en/kailash-visa-permit-guide.md） ----
export const PERMITS = {
  mainland: {
    documents: '身份证 + 边防证（目的地必须写明「西藏自治区阿里地区」）',
    borderPermit: {
      where: '① 户籍所在地公安局（推荐，免费或10-20元，常可当场办理）；② 拉萨旅行社代办（100-200元，1-2个工作日）',
      materials: '身份证原件+复印件，2张一寸白底证件照；有护照一并带上',
      leadTime: '户籍地1-7天；拉萨1-2个工作日',
      note: '目的地只写"西藏"或"日喀则"无法进入塔尔钦，必须写「阿里地区」。第一次办建议提前1周。'
    }
  },
  hkMacau: '回乡证 + 边防证（经拉萨旅行社办理，100-300元，7-14天）',
  taiwan: '台胞证 + 进藏函 + 边防证（台湾同胞必须跟团，14-30天）',
  foreigner: {
    documents: '护照 + 中国签证 + 进藏函（Tibet Travel Permit，必须通过注册旅行社办理）',
    steps: '① 中国旅游签证(L签，申请表不要写西藏/阿里)；② 旅行社代办进藏函（提前30-60天，7-14个工作日）；③ 到拉萨后由旅行社代办阿里地区许可证（1-2个工作日）；④ 记者/研究者/外交官等可能还需外事办(FAO)许可',
    note: '外籍人士不得在西藏自由行，必须跟持证旅行社的团。2026马年建议提前60天启动。'
  },
  indian: '印度公民经印度外交部(MEA)官方朝圣团办理：Lipulekh线（经北阿坎德邦，传统线路）或 Nathu La线（锡金，较短）。需在MEA开放申请时报名（通常2-3月），经指定医院体检；年龄18-70岁，心脏/呼吸/严重糖尿病史不合格。申请到出发约2-4个月。',
  horseYear2026: '2026火马年朝圣人数预计为常年3-5倍，各类证件处理都会变慢，建议：国内提前3周、外籍提前60天、港澳台提前45天启动。',
  source: 'pages/guide.astro (permits/permitSteps); pages/faq.astro; blog/en/kailash-visa-permit-guide.md'
};

// ---- 5. 装备清单（来源：src/content/blog/zh/kailash-equipment-checklist.md + src/pages/guide.astro equipment） ----
export const EQUIPMENT = {
  core: [
    '冲锋衣裤（硬壳，防水≥20000mm；三合一更佳）',
    '高帮防水登山鞋（Gore-Tex/Vibram，提前磨合50公里）',
    '背包（30-40L 有腰带支撑；请背夫则另配25-35L小包）',
    '羽绒睡袋（舒适温标-10℃或更低；寺庙住宿建议自备）',
    '保暖层（抓绒衣 / 羽绒内胆，800FP鹅绒100-150g）'
  ],
  recommended: [
    '登山杖×2（双杖，碳纤维或铝合金外锁）',
    '头灯（LED≥150流明，必备备用电池，夜行翻垭口必须）',
    '防晒霜（SPF50+ PA++++）+ 防晒唇膏（SPF30+）+ 太阳镜/雪镜（UV400，防雪盲）+ 宽檐帽',
    '保温杯（1L，沿途热水5-10元/杯）',
    '护膝（下山保护膝盖）',
    '防水手套、速干内衣、魔术头巾、雨衣',
    '急救包（常用药、创可贴/水泡贴、碘伏棉签）',
    '充电宝（20000mAh+）、离线地图、可选卫星通信设备'
  ],
  medications: [
    '乙酰唑胺（处方药，预防高反，磺胺过敏者禁用）',
    '布洛芬（高原头痛首选）',
    '地塞米松（严重高反急救，处方药）',
    '感冒药、肠胃药、晕车药、止吐药、个人常用药',
    '红景天/高原安（辅助，效果因人而异）'
  ],
  food: ['能量棒/巧克力', '坚果/干果', '葡萄糖粉', '泡面/速食', '电解质冲剂', '压缩饼干'],
  notBring: ['牛仔裤', '雨伞', '大瓶洗发水', '笔记本电脑'],
  note: '总重（含水）控制在10-12公斤；核心安全装备（鞋、冲锋衣、睡袋）不要贪便宜。每天饮3-4升水。',
  source: 'blog/zh/kailash-equipment-checklist.md; pages/guide.astro'
};

// ---- 6. FAQ（来源：src/pages/faq.astro） ----
export const FAQS = [
  { category: '身体状况', q: '没有高原经验可以参加吗？', a: '可以。行程会安排2-3天在拉萨（3650米）适应海拔。但建议出发前咨询医生，确认身体状况适合高原活动。严重心肺疾病、高血压患者不建议参加。初次上高原者，建议提前1-2周开始服用红景天。' },
  { category: '身体状况', q: '高原反应严重怎么办？', a: '团队配备氧气罐和常用药品。如遇严重高反，向导会立即安排下撤至低海拔地区，必要时使用卫星电话呼叫救援。所有路线均规划了下撤点。轻度高反（头痛、恶心）可通过吸氧和休息缓解。' },
  { category: '身体状况', q: '需要带什么药品？', a: '建议携带：红景天（提前1周开始服用）、高原安、葡萄糖、感冒药、肠胃药、创可贴。团队也会准备常用药品和氧气。如有特殊疾病，请提前告知并携带个人常用药。' },
  { category: '装备准备', q: '睡袋可以租借吗？', a: '可以。我们提供羽绒睡袋租借服务（¥100/全程），但建议使用自己的睡袋更卫生舒适。如需租借请提前告知。' },
  { category: '装备准备', q: '登山杖需要自带吗？', a: '建议自带，选择双杖可大大节省体力。如不方便携带，我们也提供租借服务（¥50/全程）。' },
  { category: '装备准备', q: '穿什么衣服合适？', a: '采用三层穿衣法：内层排汗（速干衣）、中层保暖（抓绒/羽绒）、外层防风防水（冲锋衣）。颜色建议鲜艳，拍照好看且便于识别。' },
  { category: '转山过程', q: '转山一定要走三天吗？', a: '标准行程是3天2夜。体力好的朝圣者可选2天完成（第一天到止热寺，第二天翻垭口后直接回塔尔钦）。也可雇佣背夫或马匹协助。初次朝圣者建议按3天标准行程，给身体充分适应时间。' },
  { category: '转山过程', q: '途中住宿条件如何？', a: '塔尔钦有酒店标间；止热寺和尊最普寺是板房或帐篷通铺，条件简陋但干净，有被子提供。建议对住宿条件有合理预期——转山不是度假，而是朝圣。' },
  { category: '转山过程', q: '途中吃什么？', a: '塔尔钦有餐厅；转山途中检查站有简单补给（泡面、饼干、开水）。建议自备高能量零食。团队提供早晚餐。高原上食欲会下降，建议少食多餐。' },
  { category: '转山过程', q: '手机有信号吗？', a: '塔尔钦、止热寺有4G信号；翻垭口途中信号不稳定；部分路段无信号。建议提前告知家人行程。' },
  { category: '证件手续', q: '需要什么证件？', a: '中国大陆公民：身份证 + 边防证（注明阿里地区）；港澳台同胞：回乡证/台胞证 + 边防证；外籍人士：护照 + 进藏函（需提前通过旅行社办理）。' },
  { category: '证件手续', q: '边防证怎么办理？', a: '两种方式：1）在户籍所在地公安局办理（免费，建议提前1周）；2）在拉萨办理（我们可协助，需提前1天）。' }
];

// ---- 7. 四大宗教（来源：src/pages/culture.astro religions） ----
export const RELIGIONS = [
  { name: '藏传佛教', summary: '称冈仁波齐为「岗仁波切」（珍贵的雪山），密宗视为胜乐金刚（Chakrasamvara）的修行圣地；米拉日巴在此修行的传说使其成为噶举派重要圣地。' },
  { name: '印度教', summary: '称「凯拉萨」（Kailasa），是湿婆神（Shiva）的居所、众神聚会之地。印度政府自1981年起组织官方朝圣团（每年6-8月，名额约800-1000人，需抽签）。' },
  { name: '苯教', summary: '西藏最古老宗教，视冈仁波齐为世界中心、连接天地的宇宙之轴；苯教创始人敦巴辛饶被认为从天而降于此山。苯教徒逆时针转山。' },
  { name: '耆那教', summary: '相信第一位祖师勒舍波（Rishabhanatha / Adinatha）在冈仁波齐获得最终解脱（Moksha）。' }
];

// ---- 便捷聚合 ----
export const KNOWLEDGE = {
  route: { segments: ROUTE_SEGMENTS, plans: ROUTE_PLANS },
  season: SEASON,
  ams: AMS,
  permits: PERMITS,
  equipment: EQUIPMENT,
  faqs: FAQS,
  religions: RELIGIONS
};

export default KNOWLEDGE;
