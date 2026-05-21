// 八字命理核心计算工具

// 天干
export const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支
export const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 天干五行
export const TG_WU_XING = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 天干阴阳
export const TG_YIN_YANG = {
  '甲': '阳', '乙': '阴',
  '丙': '阳', '丁': '阴',
  '戊': '阳', '己': '阴',
  '庚': '阳', '辛': '阴',
  '壬': '阳', '癸': '阴'
};

// 地支五行
export const DZ_WU_XING = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 地支阴阳
export const DZ_YIN_YANG = {
  '子': '阳', '丑': '阴', '寅': '阳', '卯': '阴',
  '辰': '阳', '巳': '阴', '午': '阳', '未': '阴',
  '申': '阳', '酉': '阴', '戌': '阳', '亥': '阴'
};

// 地支藏干
export const DZ_CANG_GAN = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '庚', '戊'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲']
};

// 五行颜色（使用 CSS 变量，自动响应白天/黑夜模式）
export const WX_COLOR = {
  '木': 'var(--wx-wood)',
  '火': 'var(--wx-fire)',
  '土': 'var(--wx-earth)',
  '金': 'var(--wx-metal)',
  '水': 'var(--wx-water)'
};

// 五行生克关系
export const WX_SHENG = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
export const WX_KE = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };

// 十神计算
// 以日干为中心，计算其他天干对日干的十神关系
export function getShiShen(riGan, targetGan) {
  if (riGan === targetGan) return { name: '比肩', type: '同我', zhengPian: '正' };
  
  const riWuxing = TG_WU_XING[riGan];
  const riYinyang = TG_YIN_YANG[riGan];
  const targetWuxing = TG_WU_XING[targetGan];
  const targetYinyang = TG_YIN_YANG[targetGan];
  
  // 判断关系
  let relation = '';
  if (WX_SHENG[riWuxing] === targetWuxing) {
    relation = '我生';
  } else if (WX_SHENG[targetWuxing] === riWuxing) {
    relation = '生我';
  } else if (WX_KE[riWuxing] === targetWuxing) {
    relation = '我克';
  } else if (WX_KE[targetWuxing] === riWuxing) {
    relation = '克我';
  } else {
    relation = '同我';
  }
  
  // 判断正偏（阴阳相同为偏/同性，不同为正/异性）
  const isSameYinyang = riYinyang === targetYinyang;
  
  let result = { relation };
  
  switch (relation) {
    case '生我':
      result.name = isSameYinyang ? '偏印' : '正印';
      result.zhengPian = isSameYinyang ? '偏' : '正';
      break;
    case '克我':
      result.name = isSameYinyang ? '七杀' : '正官';
      result.zhengPian = isSameYinyang ? '偏' : '正';
      break;
    case '我克':
      result.name = isSameYinyang ? '偏财' : '正财';
      result.zhengPian = isSameYinyang ? '偏' : '正';
      break;
    case '我生':
      result.name = isSameYinyang ? '食神' : '伤官';
      result.zhengPian = isSameYinyang ? '正' : '偏';
      break;
    case '同我':
      result.name = isSameYinyang ? '比肩' : '劫财';
      result.zhengPian = isSameYinyang ? '正' : '偏';
      break;
  }
  
  return result;
}

// 获取天干索引
export function getGanIndex(gan) {
  return TIAN_GAN.indexOf(gan);
}

// 获取地支索引
export function getZhiIndex(zhi) {
  return DI_ZHI.indexOf(zhi);
}

// 天乙贵人查询
export function getTianYiGuiRen(gan) {
  const map = {
    '甲': ['丑', '未'],
    '乙': ['子', '申'],
    '丙': ['酉', '亥'],
    '丁': ['酉', '亥'],
    '戊': ['丑', '未'],
    '己': ['子', '申'],
    '庚': ['丑', '未'],
    '辛': ['寅', '午'],
    '壬': ['卯', '巳'],
    '癸': ['卯', '巳']
  };
  return map[gan] || [];
}

// 天德贵人查询（以月支为准）
export function getTianDeGuiRen(yueZhi) {
  const map = {
    '寅': '丁', '卯': '申', '辰': '壬', '巳': '辛',
    '午': '甲', '未': '癸', '申': '丙', '酉': '乙',
    '戌': '丙', '亥': '乙', '子': '巳', '丑': '庚'
  };
  return map[yueZhi] || '';
}

// 月德贵人查询（以月支为准）
export function getYueDeGuiRen(yueZhi) {
  const map = {
    '寅': '丙', '卯': '甲', '辰': '壬', '巳': '庚',
    '午': '丙', '未': '甲', '申': '壬', '酉': '庚',
    '戌': '丙', '亥': '甲', '子': '壬', '丑': '庚'
  };
  return map[yueZhi] || '';
}

// 桃花查询（以年支或日支为准）
export function getTaoHua(zhi) {
  const map = {
    '申': '酉', '子': '卯', '辰': '酉',
    '寅': '午', '午': '卯', '戌': '午',
    '巳': '午', '酉': '午', '丑': '午',
    '亥': '子', '卯': '子', '未': '子'
  };
  return map[zhi] || '';
}

// 驿马查询（以年支或日支为准）
export function getYiMa(zhi) {
  const map = {
    '申': '寅', '子': '寅', '辰': '寅',
    '寅': '申', '午': '申', '戌': '申',
    '巳': '亥', '酉': '亥', '丑': '亥',
    '亥': '巳', '卯': '巳', '未': '巳'
  };
  return map[zhi] || '';
}

// 文昌贵人查询（以日干为准）
export function getWenChang(gan) {
  const map = {
    '甲': '巳', '乙': '午', '丙': '申', '丁': '酉',
    '戊': '申', '己': '酉', '庚': '亥', '辛': '子',
    '壬': '寅', '癸': '卯'
  };
  return map[gan] || '';
}

// 公历转八字（简化版，仅用于演示）
// 实际八字排盘需要农历转换和节气计算，这里用简化逻辑
export function getBaziFromDate(year, month, day, hour) {
  // 简化计算：使用年份和月份推算年柱和月柱
  // 实际应用中应使用lunar-javascript等库
  
  const ganZhiYear = getYearGanZhi(year);
  const ganZhiMonth = getMonthGanZhi(year, month);
  
  // 日柱计算（简化版，实际需要复杂的算法）
  const ganZhiDay = getDayGanZhi(year, month, day);
  
  // 时柱计算
  const ganZhiHour = getHourGanZhi(ganZhiDay.gan, hour);
  
  return {
    year: ganZhiYear,
    month: ganZhiMonth,
    day: ganZhiDay,
    hour: ganZhiHour
  };
}

// 年柱计算
function getYearGanZhi(year) {
  const ganIndex = (year - 4) % 10;
  const zhiIndex = (year - 4) % 12;
  return {
    gan: TIAN_GAN[ganIndex],
    zhi: DI_ZHI[zhiIndex]
  };
}

// 月柱计算（简化，不考虑节气）
function getMonthGanZhi(year, month) {
  const yearGanIndex = (year - 4) % 10;
  const monthZhiIndex = (month + 1) % 12; // 正月=寅
  
  // 月干根据年干推算（五虎遁）
  const monthGanStart = [2, 14, 26, 38, 50]; // 甲己之年丙作首...
  const startGan = monthGanStart[Math.floor(yearGanIndex / 2)] % 10;
  const monthGanIndex = (startGan + month - 1) % 10;
  
  return {
    gan: TIAN_GAN[monthGanIndex],
    zhi: DI_ZHI[monthZhiIndex]
  };
}

// 日柱计算（简化版）
function getDayGanZhi(year, month, day) {
  // 使用已知基准日计算（1900-01-31 = 甲辰日）
  const baseDate = new Date(1900, 0, 31);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
  
  const ganIndex = (diffDays % 10 + 10) % 10;
  const zhiIndex = (diffDays % 12 + 12) % 12;
  
  return {
    gan: TIAN_GAN[ganIndex],
    zhi: DI_ZHI[zhiIndex]
  };
}

// 时柱计算（根据日干和小时）
function getHourGanZhi(riGan, hour) {
  const riGanIndex = TIAN_GAN.indexOf(riGan);
  
  // 时辰对应
  const shiChen = Math.floor((hour + 1) / 2) % 12;
  
  // 时干根据日干推算（五鼠遁）
  const hourGanStart = [0, 12, 24, 36, 48]; // 甲己还加甲...
  const startGan = hourGanStart[Math.floor(riGanIndex / 2)] % 10;
  const hourGanIndex = (startGan + shiChen) % 10;
  
  return {
    gan: TIAN_GAN[hourGanIndex],
    zhi: DI_ZHI[shiChen]
  };
}

// 十二长生状态查询
export function getShiErChangSheng(riGan, zhi) {
  const changShengZhi = {
    '甲': '亥', '乙': '午', '丙': '寅', '丁': '酉',
    '戊': '寅', '己': '酉', '庚': '巳', '辛': '子',
    '壬': '申', '癸': '卯'
  };
  
  const states = ['长生', '沐浴', '冠带', '临官', '帝旺', '衰', '病', '死', '墓', '绝', '胎', '养'];
  
  const startZhi = changShengZhi[riGan];
  const startIndex = DI_ZHI.indexOf(startZhi);
  const targetIndex = DI_ZHI.indexOf(zhi);
  
  // 阳干顺行，阴干逆行
  const isYang = TG_YIN_YANG[riGan] === '阳';
  let diff;
  if (isYang) {
    diff = (targetIndex - startIndex + 12) % 12;
  } else {
    diff = (startIndex - targetIndex + 12) % 12;
  }
  
  return states[diff];
}

// 身强身弱判断（简化版）
export function judgeShenQiang(riGan, yueZhi, riZhi, otherGans, otherZhis) {
  let score = 0;
  const riWuxing = TG_WU_XING[riGan];
  
  // 1. 得令（月令是否帮扶）
  const yueWuxing = DZ_WU_XING[yueZhi];
  if (yueWuxing === riWuxing) {
    score += 30; // 同五行，得令
  } else if (WX_SHENG[yueWuxing] === riWuxing) {
    score += 20; // 月令生我
  } else if (WX_KE[yueWuxing] === riWuxing) {
    score -= 10; // 月令克我
  }
  
  // 2. 得地（日支和地支藏干是否有根）
  const riZhiCangGan = DZ_CANG_GAN[riZhi];
  const hasRootInRiZhi = riZhiCangGan.some(g => TG_WU_XING[g] === riWuxing);
  if (hasRootInRiZhi) score += 20;
  
  otherZhis.forEach(z => {
    const cangGan = DZ_CANG_GAN[z];
    if (cangGan.some(g => TG_WU_XING[g] === riWuxing)) {
      score += 10;
    }
  });
  
  // 3. 得势（天干是否有比劫印）
  otherGans.forEach(g => {
    const ss = getShiShen(riGan, g);
    if (ss.name === '比肩' || ss.name === '劫财') {
      score += 10;
    } else if (ss.name === '正印' || ss.name === '偏印') {
      score += 8;
    } else if (ss.name === '正官' || ss.name === '七杀') {
      score -= 5;
    } else if (ss.name === '正财' || ss.name === '偏财') {
      score -= 3;
    }
  });
  
  return {
    score,
    result: score >= 50 ? '身强' : score >= 30 ? '中和' : '身弱',
    details: {
      deLing: yueWuxing === riWuxing || WX_SHENG[yueWuxing] === riWuxing,
      deDi: hasRootInRiZhi,
      deShi: score > 30
    }
  };
}
