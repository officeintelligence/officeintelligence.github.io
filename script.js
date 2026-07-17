const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const header = document.querySelector('.site-header');
const languageToggle = document.querySelector('.language-toggle');
let leaderboardData = [];
let leaderboardView = 'overall';
let leaderboardTable;
let leaderboardNote;
let leaderboardViewButtons = [];
let leaderboardFilterButtons = [];
let leaderboardFamilyFilter = 'all';
let leaderboardInputFilter = 'all';
let caseStudies = {};
let activeCase = 'cross-document-temporal';
let caseTabButtons = [];
let caseTitle;
let caseDescription;
let caseScope;
let caseReasoning;
let caseGroundTruth;
let caseFigureLabel;
let caseStudyImage;

const languageRules = [
  { selector: '.skip-link', zh: '跳至正文' },
  { selector: '.brand[aria-label]', attribute: 'aria-label', zh: 'XL-DocBench 首页' },
  { selector: '.menu-toggle .sr-only', zh: '切换导航菜单' },
  { selector: '.site-nav', attribute: 'aria-label', zh: '主导航' },
  { selector: '.site-nav a', zh: ['基准测试', '构建流程', '推理分类', '排行榜'] },
  { selector: '.hero .eyebrow', html: true, zh: '<span></span>一个经过人工核验的超长文档理解基准' },
  { selector: '.hero h1', zh: 'XL-DocBench：面向超长文档的证据驱动理解基准' },
  { selector: '.hero-identity-label', zh: '作者与机构' },
  { selector: '.hero-summary', zh: 'XL-DocBench 评估系统能否在数百乃至数千页的专业文档中定位、整合并验证证据。' },
  { selector: '.hero-affiliations', html: true, zh: '<span><sup>1</sup> 武汉大学</span><span><sup>2</sup> 微软</span>' },
  { selector: '.hero-contribution', html: true, zh: '<span>† 共同贡献</span><span>‡ 工作在微软亚洲研究院实习期间完成</span><span>* 项目负责人</span>' },
  { selector: '.hero-actions a', html: true, zh: ['基准概览 <span aria-hidden="true">↓</span>', '排行榜 <span aria-hidden="true">→</span>'] },
  { selector: '.release-strip', attribute: 'aria-label', zh: '发布状态' },
  { selector: '.release-strip-label', zh: '项目资源' },
  { selector: '.release-item b', zh: ['论文', '数据集', '代码'] },
  { selector: '.release-item em', zh: ['即将发布', '即将发布', '即将发布'] },
  { selector: '.abstract-heading .eyebrow', html: true, zh: '<span></span>摘要' },
  { selector: '.abstract-heading h2', zh: '面向超长文档的证据驱动评测。' },
  { selector: '.abstract-copy > p', zh: [
    'XL-DocBench 是一个经过完整人工核验的超长专业文档理解基准。它包含来自六个领域的 1,519 个问题，上下文最长达 2,303 页，并提供专家标注的页面级证据。',
    '每个案例存储证据页与引文、答案格式、类型化验证规则及十二类推理标签。该基准可区分检索、证据使用、规则遵循和无支持回答等失败，而这些差异无法仅通过聚合 QA 准确率诊断。'
  ] },
  { selector: '.abstract-facts dd', zh: ['核验问题', '源文档', '人类专家'] },
  { selector: '.benchmark-section .eyebrow', html: true, zh: '<span></span>基准定位' },
  { selector: '.heading-grid h2', html: true, zh: [
    '用于超长文档推理的<br /><em>页面级证据。</em>',
    '树引导构建<br /><em>与人工核验。</em>',
    '推理标签、标注记录<br /><em>与数据集统计。</em>',
    '评测结果与<br /><em>系统比较。</em>',
    '证据检索与<br /><em>答案产出动态。</em>',
    '人工核验的证据<br /><em>案例研究。</em>'
  ] },
  { selector: '.heading-grid > p', zh: [
    'XL-DocBench 在真实文档长度、证据分散性、多模态支持和显式答案验证条件下评估长文档系统。',
    '候选生成在文档树分支上进行；人类专家确定最终的页面级证据和验证标签。',
    '每个案例结合推理标签、证据驱动的验证记录及上下文级统计，从而支持诊断性评测。',
    '直接长上下文阅读器和基于 PDF 的智能体均依据相同的专家核验答案与类型化验证规则进行评估。',
    '证据命中动态可区分页搜索失败与证据使用、规则遵循失败。',
    '这些记录可直接检查检索、证据使用和规则遵循之间的差异。'
  ] },
  { selector: '.benchmark-specification span', zh: ['文档', '标注', '任务条件'] },
  { selector: '.benchmark-specification h3', zh: ['331 份公开专业文档', '专家核验的证据记录', '证据分散性与答案支持'] },
  { selector: '.benchmark-specification p', html: true, zh: [
    '覆盖法律、金融、技术、医疗、科研与叙事类来源；上下文从局部文档扩展到多 PDF 系列。',
    '每个保留案例都包含由标注页面和引文支撑的答案，以及答案格式和类型化验证规则。',
    '多页、多模态、跨文档和 <code>None</code> 答案案例揭示不同的长文档失败模式。'
  ] },
  { selector: '.stat-grid', attribute: 'aria-label', zh: '数据集统计' },
  { selector: '.stat-grid span', zh: ['多页证据', '表格、图表或图像证据', '跨文档问题', 'None 答案案例', '专业领域', '诊断推理类型'] },
  { selector: '.benchmark-table-kicker', zh: '表 01 · 基准测试版图' },
  { selector: '.benchmark-table-intro h3', zh: '规模、证据与范围。' },
  { selector: '.benchmark-table-description', zh: 'XL-DocBench 同时提升了上下文规模、证据分散程度、跨文档范围与答案支持诊断能力。' },
  { selector: '.benchmark-comparison', attribute: 'aria-label', zh: 'XL-DocBench 与既有文档理解基准的对比' },
  { selector: '.comparison-table th', zh: ['基准', '发布时间', '页数', 'Token 数', '跨页', '跨文档', '不可回答', '来源', '平均证据页数'] },
  { selector: '.comparison-table-note', zh: 'TXT/L/C/TAB/I：文本、版面、图表、表格和图像。(*) 表示该基准包含相应能力，但未报告对应比例。' },
  { selector: '.pipeline .eyebrow', html: true, zh: '<span></span>构建方法' },
  { selector: '.visual-section .eyebrow', html: true, zh: '<span></span>构建方法' },
  { selector: '.dataset-design-section .eyebrow', html: true, zh: '<span></span>数据集设计与标注' },
  { selector: '.results-section .eyebrow', html: true, zh: '<span></span>XL-DocBench 排行榜' },
  { selector: '.dynamics-section .eyebrow', html: true, zh: '<span></span>检索分析' },
  { selector: '.cases-section .eyebrow', html: true, zh: '<span></span>案例研究' },
  { selector: '.figure-panel-head span:first-child', zh: ['图 01', '图 02', '图 03', '图 04', '图 05', '图 06', '示例'] },
  { selector: '.figure-panel-head span:nth-child(2)', zh: ['构建流程', '推理标签与证据结构', '数据集构成', '上下文与证据压力下的准确率', '智能体答案产出', '证据命中动态', '跨文档时间推理'] },
  { selector: '.figure-image', attribute: 'alt', zh: [
    'XL-DocBench 构建流程', 'XL-DocBench 推理标签分布与证据结构', 'XL-DocBench 上下文、证据跨度、模态与答案格式构成',
    '按上下文长度、证据页数与证据跨度划分的准确率诊断', '随检索轮次增加的智能体答案产出', '随检索和阅读页数轮次增加的证据命中率', '跨文档时间推理案例研究'
  ] },
  { selector: '.pipeline-list h3', zh: ['构建文档结构', '测试分支依赖', '细化并过滤', '专家核验'] },
  { selector: '.pipeline-list p', zh: [
    '将 PDF 解析为页面、文本、表格、图形和层级树。', '仅当删除所选分支会移除必要支持时，才保留候选问题。',
    '剔除局部捷径、元数据泄漏、格式错误答案和弱证据。', '专家重新作答、标记页面与引文，并检查类型化规则。'
  ] },
  { selector: '.tier h3', zh: ['核心', '结构化', '高级'] },
  { selector: '.tier p', zh: ['比较 · 引用链', '排序 · 覆盖 · 对齐', '集合差 · 不可回答 · 时间 · 合规 · 反事实 · 聚合 · 一致性'] },
  { selector: '.taxonomy-note', zh: '这些标签区分证据定位、集合追踪、规则遵循和拒答错误。' },
  { selector: '.subsection-kicker', zh: ['2.1 推理分类', '2.2 标注记录', '2.3 数据集统计'] },
  { selector: '.dataset-subsection-copy > p', zh: [
    '每个保留案例都将答案与证据页、证据片段、答案格式和类型化验证规则配对。',
    '上下文长度、证据跨度、证据页数、模态和答案格式刻画了不同的文档级难度。'
  ] },
  { selector: '.evidence-card .small-label', zh: ['证据', '规则', '答案'] },
  { selector: '.evidence-card b', zh: ['第 83 · 217 · 891 页', '在指定条件下对数值进行对齐。', '已验证并归一化'] },
  { selector: '.evidence-card p', html: true, zh: [
    '可追溯来源可揭示模型是否找到了全部必要支持。', '验证反映推理操作，而不只是答案表面形式。', '通过 <code>None</code> 答案案例显式衡量无支持回答。'
  ] },
  { selector: '.result-notes h3', zh: ['OCR 有利于检索。', '集合追踪仍然困难。', '检索可能造成误导。'] },
  { selector: '.result-notes p', zh: [
    '可搜索的页面文本改进长文档导航，但无法保留全部视觉证据。', '排序、覆盖和集合差要求模型持续维护完整的候选集合。', '部分相关的页面可能推动智能体在必要支持缺失时仍然作答。'
  ] },
  { selector: '.leaderboard-kicker', zh: '主要指标 · 基于规则的准确率' },
  { selector: '.leaderboard-description', zh: '分数均为百分比。失败、缺失或无法解析的预测均计为错误。' },
  { selector: '.leaderboard-switch', attribute: 'aria-label', zh: '排行榜视图' },
  { selector: '.leaderboard-view', zh: ['总体排名', '完整推理明细'] },
  { selector: '.leaderboard-filter-group', attribute: 'aria-label', zh: ['模型系列筛选', '输入接口筛选'] },
  { selector: '.leaderboard-filter-group > span', zh: ['模型系列', '输入'] },
  { selector: '.leaderboard-filter[data-filter-family]', zh: ['全部系统', '闭源模型', '开源模型', '智能体'] },
  { selector: '.leaderboard-filter[data-filter-input]', zh: ['全部输入', 'OCR', '整页图像', '智能体 / PDF'] },
  { selector: '.leaderboard-diagnostic-copy span', zh: '诊断视图' },
  { selector: '.leaderboard-diagnostic-copy p', zh: '仅看总体排名会掩盖由上下文长度、证据数量和证据跨度造成的失败模式。' },
  { selector: '.case-kicker', zh: '代表性示例' },
  { selector: '.case-copy h3', zh: '跨文档时间推理' },
  { selector: '.case-copy > p', zh: '此案例需要连接相关文档中的证据，而非从单页提取局部短语。' },
  { selector: '.case-copy dt', zh: ['证据范围', '推理类型', '真实标签'] },
  { selector: '.case-copy dd', zh: ['多个 PDF', '时间推理', '专家核验'] },
  { selector: '.case-tabs', attribute: 'aria-label', zh: '案例选择器' },
  { selector: '.case-tab', zh: ['跨文档时间推理', '比较', '集合差', '不可回答', '合规'] },
  { selector: '.site-footer p', zh: '衡量超长文档理解中的证据驱动推理。' },
  { selector: '.site-footer > a:last-child', zh: '返回顶部 ↑' }
];

const englishValues = new Map();

function getRuleValue(node, rule) {
  if (rule.attribute) return node.getAttribute(rule.attribute) ?? '';
  return rule.html ? node.innerHTML : node.textContent;
}

function setRuleValue(node, rule, value) {
  if (rule.attribute) {
    node.setAttribute(rule.attribute, value);
  } else if (rule.html) {
    node.innerHTML = value;
  } else {
    node.textContent = value;
  }
}

languageRules.forEach((rule) => {
  document.querySelectorAll(rule.selector).forEach((node) => {
    englishValues.set(node, getRuleValue(node, rule));
  });
});

function applyLanguage(language) {
  const isChinese = language === 'zh';

  languageRules.forEach((rule) => {
    const translatedValues = Array.isArray(rule.zh) ? rule.zh : null;
    document.querySelectorAll(rule.selector).forEach((node, index) => {
      const value = isChinese ? (translatedValues ? translatedValues[index] : rule.zh) : englishValues.get(node);
      if (value !== undefined) setRuleValue(node, rule, value);
    });
  });

  document.documentElement.lang = isChinese ? 'zh-CN' : 'en';
  document.documentElement.classList.toggle('is-chinese', isChinese);
  document.title = isChinese ? 'XL-DocBench — 面向超长文档的证据驱动推理' : 'XL-DocBench — Evidence at Scale';
  document.querySelector('meta[name="description"]')?.setAttribute(
    'content',
    isChinese
      ? 'XL-DocBench 是一个由人工核验的基准测试，用于衡量超长专业文档中的证据驱动推理。'
      : 'XL-DocBench is a human-verified benchmark for evidence-grounded reasoning over extra-long professional documents.'
  );
  languageToggle.textContent = isChinese ? 'EN' : '中文';
  languageToggle.setAttribute('aria-label', isChinese ? 'Switch to English' : '切换至中文');
  languageToggle.setAttribute('aria-pressed', String(isChinese));
  languageToggle.setAttribute('title', isChinese ? 'Switch to English' : '切换至中文');
  renderLeaderboard();
  renderEvidenceExplorer();

  try {
    window.localStorage.setItem('xldocbench-language', language);
  } catch {
    // Language selection remains available when storage is unavailable.
  }
}

let preferredLanguage = 'en';
try {
  preferredLanguage = window.localStorage.getItem('xldocbench-language') || 'en';
} catch {
  preferredLanguage = 'en';
}

if (preferredLanguage === 'zh') applyLanguage('zh');

languageToggle?.addEventListener('click', () => {
  applyLanguage(document.documentElement.lang.startsWith('zh') ? 'en' : 'zh');
});

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navigation?.classList.toggle('open', !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    navigation?.classList.remove('open');
  });
});

const updateHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 8);
};

updateHeaderState();
window.addEventListener('scroll', updateHeaderState, { passive: true });

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    const activeEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!activeEntry) return;

    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${activeEntry.target.id}`;
      link.toggleAttribute('aria-current', isCurrent);
    });
  },
  { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.1, 0.3] }
);

sections.forEach((section) => navObserver.observe(section));

const reasoningColumns = [
  { key: 'cmp', label: 'Cmp.' }, { key: 'ref', label: 'Ref.' }, { key: 'rnk', label: 'Rnk.' },
  { key: 'cov', label: 'Cov.' }, { key: 'rec', label: 'Rec.' }, { key: 'sdiff', label: 'SDiff' },
  { key: 'unans', label: 'Unans' }, { key: 'tmp', label: 'Tmp.' }, { key: 'cmpl', label: 'Cmpl' },
  { key: 'ctf', label: 'Ctf' }, { key: 'agg', label: 'Agg' }, { key: 'con', label: 'Con' }
];

function makeLeaderboardRow(system, input, scores, acc, f1, anls) {
  return {
    system,
    input,
    ...Object.fromEntries(reasoningColumns.map((column, index) => [column.key, scores[index]])),
    acc,
    f1,
    anls
  };
}

leaderboardData = [
  makeLeaderboardRow('GPT-5.2 (256K)', 'Img', [9.8, 13.7, 10.8, 12.6, 18.3, 13.6, 88.3, 10.3, 13.1, 5.2, 4.3, 28.6], 22.9, 25.6, 22.7),
  makeLeaderboardRow('GPT-5.2 (256K)', 'OCR', [19.1, 28.2, 17.6, 25.8, 28.7, 25.4, 83.6, 13.8, 26.2, 13.8, 4.3, 19.0], 30.9, 33.2, 28.1),
  makeLeaderboardRow('GPT-5.4 (1M)', 'Img', [28.9, 26.9, 20.5, 18.7, 23.5, 20.3, 44.9, 24.1, 26.2, 22.4, 23.4, 28.6], 26.9, 29.6, 25.9),
  makeLeaderboardRow('GPT-5.4 (1M)', 'OCR', [31.5, 36.8, 21.0, 30.8, 40.0, 33.9, 70.6, 36.2, 32.8, 31.0, 27.7, 23.8], 37.3, 39.5, 34.1),
  makeLeaderboardRow('Claude Opus 4.6 (1M)', 'OCR', [38.7, 36.8, 29.0, 29.1, 39.1, 31.4, 66.8, 34.5, 41.0, 37.9, 46.8, 47.6], 39.8, 40.5, 34.7),
  makeLeaderboardRow('Kimi-K2.5 (256K)', 'Img', [27.7, 23.5, 19.9, 23.6, 27.8, 21.2, 29.0, 37.9, 23.0, 32.8, 25.5, 9.5], 25.4, 27.0, 22.5),
  makeLeaderboardRow('Kimi-K2.5 (256K)', 'OCR', [39.1, 39.3, 30.1, 29.1, 27.0, 31.4, 39.7, 36.2, 44.3, 41.4, 42.6, 42.9], 35.8, 37.9, 32.3),
  makeLeaderboardRow('DeepSeek-V3.2 (128K)', 'OCR', [23.0, 26.5, 17.0, 19.2, 21.7, 24.6, 78.5, 17.2, 18.0, 15.5, 23.4, 23.8], 29.6, 32.8, 29.0),
  makeLeaderboardRow('Qwen3.5 9B (256K)', 'Img', [17.9, 18.4, 18.8, 12.1, 9.6, 13.6, 38.8, 25.9, 21.3, 12.1, 23.4, 23.8], 19.8, 22.6, 20.1),
  makeLeaderboardRow('Qwen3.5 9B (256K)', 'OCR', [13.6, 25.6, 15.9, 18.1, 18.3, 22.0, 50.0, 17.2, 13.1, 12.1, 2.1, 23.8], 22.3, 26.8, 24.1),
  makeLeaderboardRow('Qwen3.5 35B-A3B (256K)', 'Img', [23.0, 19.2, 24.4, 19.8, 23.5, 16.9, 38.3, 31.0, 19.7, 19.0, 23.4, 42.9], 24.2, 17.5, 11.6),
  makeLeaderboardRow('Qwen3.5 35B-A3B (256K)', 'OCR', [24.3, 29.1, 18.2, 17.6, 32.2, 18.6, 84.1, 19.0, 27.9, 17.2, 31.9, 23.8], 32.0, 35.8, 32.5),
  makeLeaderboardRow('MDocAgent + GPT-5.4 (1M)', 'Agent', [43.8, 36.3, 33.5, 30.8, 35.7, 26.3, 22.0, 46.6, 39.3, 48.3, 48.9, 38.1], 35.0, 35.8, 28.4),
  makeLeaderboardRow('MDocAgent + Claude Opus 4.6 (1M)', 'Agent', [42.1, 37.6, 29.5, 24.7, 36.5, 25.4, 21.5, 44.8, 39.3, 43.1, 40.4, 42.9], 33.2, 34.9, 28.6),
  makeLeaderboardRow('MDocAgent + GPT-5.2 (256K)', 'Agent', [39.6, 34.6, 27.8, 27.5, 33.0, 28.0, 24.8, 39.7, 42.6, 46.6, 46.8, 33.3], 33.0, 33.5, 26.3),
  makeLeaderboardRow('MDocAgent + Kimi-K2.5 (256K)', 'Agent', [39.6, 33.3, 27.3, 23.6, 33.9, 25.4, 21.5, 39.7, 34.4, 46.6, 38.3, 33.3], 31.1, 33.6, 27.5),
  makeLeaderboardRow('MDocAgent + DeepSeek-V3.2 (128K)', 'Agent', [24.3, 25.6, 26.1, 20.9, 27.8, 18.6, 18.7, 31.0, 24.6, 32.8, 27.7, 19.0], 24.0, 27.7, 22.3),
  makeLeaderboardRow('SimpleDoc + GPT-5.4 (1M)', 'Agent', [48.5, 41.0, 35.8, 28.0, 41.7, 36.4, 60.7, 46.6, 49.2, 55.2, 51.1, 47.6], 44.0, 43.7, 35.7),
  makeLeaderboardRow('SimpleDoc + Claude Opus 4.6 (1M)', 'Agent', [44.3, 38.5, 31.2, 30.8, 36.5, 33.1, 57.0, 44.8, 39.3, 46.6, 48.9, 38.1], 40.6, 41.3, 33.3),
  makeLeaderboardRow('SimpleDoc + GPT-5.2 (256K)', 'Agent', [37.9, 33.8, 33.0, 25.8, 34.8, 26.3, 68.2, 37.9, 36.1, 39.7, 36.2, 38.1], 38.3, 37.7, 30.6),
  makeLeaderboardRow('SimpleDoc + Kimi-K2.5 (256K)', 'Agent', [34.9, 33.3, 23.9, 23.1, 31.3, 26.3, 55.6, 34.5, 44.3, 39.7, 31.9, 33.3], 34.4, 35.7, 29.5),
  makeLeaderboardRow('SimpleDoc + DeepSeek-V3.2 (128K)', 'Agent', [32.8, 34.2, 22.7, 20.3, 33.9, 28.0, 76.2, 37.9, 36.1, 36.2, 36.2, 33.3], 36.7, 38.1, 31.8),
  makeLeaderboardRow('DeepRead + GPT-5.4 (1M)', 'Agent', [35.3, 37.6, 27.8, 29.1, 38.3, 32.2, 27.6, 29.3, 36.1, 25.9, 29.8, 33.3], 32.2, 33.2, 26.8),
  makeLeaderboardRow('DeepRead + Claude Opus 4.6 (1M)', 'Agent', [26.0, 24.4, 23.9, 25.3, 27.8, 17.0, 32.7, 22.4, 31.1, 36.2, 25.5, 33.3], 26.3, 28.3, 23.1),
  makeLeaderboardRow('DeepRead + GPT-5.2 (256K)', 'Agent', [30.6, 30.8, 22.2, 26.4, 30.4, 28.0, 27.6, 32.8, 39.3, 19.0, 27.7, 33.3], 28.4, 31.0, 25.4),
  makeLeaderboardRow('DeepRead + Kimi-K2.5 (256K)', 'Agent', [27.7, 24.4, 22.7, 18.7, 20.0, 21.2, 14.0, 24.1, 32.8, 27.6, 31.9, 23.8], 22.6, 25.0, 21.5),
  makeLeaderboardRow('DeepRead + DeepSeek-V3.2 (128K)', 'Agent', [31.5, 27.4, 19.3, 17.0, 27.8, 13.6, 25.7, 31.0, 36.1, 44.8, 19.1, 28.6], 25.5, 26.7, 22.0)
];

leaderboardTable = document.querySelector('#leaderboard-table');
leaderboardNote = document.querySelector('#leaderboard-note');
leaderboardViewButtons = [...document.querySelectorAll('.leaderboard-view')];
leaderboardFilterButtons = [...document.querySelectorAll('.leaderboard-filter')];
caseTitle = document.querySelector('#case-title');
caseDescription = document.querySelector('#case-description');
caseScope = document.querySelector('#case-scope');
caseReasoning = document.querySelector('#case-reasoning');
caseGroundTruth = document.querySelector('#case-ground-truth');
caseFigureLabel = document.querySelector('#case-figure-label');
caseStudyImage = document.querySelector('#case-study-image');
caseTabButtons = [...document.querySelectorAll('.case-tab')];

caseStudies = {
  'cross-document-temporal': {
    image: 'assets/figures/cross-document-temporal.png',
    en: {
      title: 'Cross-document temporal reasoning',
      description: 'This example requires linking evidence across related documents rather than extracting a local phrase from a single page.',
      scope: 'Multiple PDFs', reasoning: 'Temporal', groundTruth: 'Expert verified', label: 'Cross-document temporal',
      alt: 'Cross-document temporal reasoning case study'
    },
    zh: {
      title: '跨文档时间推理', description: '此案例需要连接相关文档中的证据，而非从单页提取局部短语。',
      scope: '多个 PDF', reasoning: '时间推理', groundTruth: '专家核验', label: '跨文档时间推理', alt: '跨文档时间推理案例研究'
    }
  },
  comparison: {
    image: 'assets/figures/case-comparison.png',
    en: {
      title: 'Comparison', description: 'The answer depends on comparing evidence across document locations instead of matching one isolated phrase.',
      scope: 'Multiple pages', reasoning: 'Comparison', groundTruth: 'Expert verified', label: 'Comparison', alt: 'Comparison reasoning case study'
    },
    zh: {
      title: '比较推理', description: '答案依赖于比较不同文档位置的证据，而不是匹配一个孤立短语。',
      scope: '多个页面', reasoning: '比较', groundTruth: '专家核验', label: '比较推理', alt: '比较推理案例研究'
    }
  },
  'set-difference': {
    image: 'assets/figures/case-set-difference.png',
    en: {
      title: 'Set difference', description: 'The system must track two evidence-grounded sets and identify what belongs to one set but not the other.',
      scope: 'Multiple pages', reasoning: 'Set difference', groundTruth: 'Expert verified', label: 'Set difference', alt: 'Set difference reasoning case study'
    },
    zh: {
      title: '集合差推理', description: '系统必须追踪两个由证据支撑的集合，并识别仅属于其中一个集合的内容。',
      scope: '多个页面', reasoning: '集合差', groundTruth: '专家核验', label: '集合差推理', alt: '集合差推理案例研究'
    }
  },
  unanswerable: {
    image: 'assets/figures/case-unanswerable.png',
    en: {
      title: 'Unanswerable', description: 'The required support is absent. Correct behavior is to abstain rather than infer an unsupported answer.',
      scope: 'Missing support', reasoning: 'Unanswerable', groundTruth: 'Expert verified', label: 'Unanswerable', alt: 'Unanswerable case study'
    },
    zh: {
      title: '不可回答', description: '文档中缺少所需支持。正确行为是拒绝作答，而不是推断没有证据支撑的答案。',
      scope: '缺少支持', reasoning: '不可回答', groundTruth: '专家核验', label: '不可回答', alt: '不可回答案例研究'
    }
  },
  compliance: {
    image: 'assets/figures/case-compliance.png',
    en: {
      title: 'Compliance', description: 'The answer follows a rule, its special cases, and the conditions under which the rule applies.',
      scope: 'Multiple pages', reasoning: 'Compliance', groundTruth: 'Expert verified', label: 'Compliance', alt: 'Compliance reasoning case study'
    },
    zh: {
      title: '合规推理', description: '答案需要遵循规则、特殊情形以及规则适用的条件。',
      scope: '多个页面', reasoning: '合规', groundTruth: '专家核验', label: '合规推理', alt: '合规推理案例研究'
    }
  }
};

function scoreText(value) {
  return value.toFixed(1);
}

function inputLabel(input, isChinese) {
  if (!isChinese) return input;
  return { Img: '整页图像', OCR: 'OCR', Agent: '智能体' }[input] || input;
}

function modelFamily(row) {
  if (row.input === 'Agent') return 'agent';
  if (row.system.startsWith('GPT') || row.system.startsWith('Claude')) return 'closed';
  return 'open';
}

function rankedRows() {
  return leaderboardData
    .filter((row) => leaderboardFamilyFilter === 'all' || modelFamily(row) === leaderboardFamilyFilter)
    .filter((row) => leaderboardInputFilter === 'all' || row.input === leaderboardInputFilter)
    .sort((left, right) => right.acc - left.acc || right.f1 - left.f1);
}

function scoreClasses(row, key, columnRanks) {
  if (!columnRanks) return 'leaderboard-score';
  if (row[key] === columnRanks[key].best) return 'leaderboard-score best-score';
  if (row[key] === columnRanks[key].second) return 'leaderboard-score second-score';
  return 'leaderboard-score';
}

function renderLeaderboard() {
  if (!leaderboardTable || !leaderboardNote || leaderboardData.length === 0) return;

  const isChinese = document.documentElement.lang.startsWith('zh');
  const rows = rankedRows();
  const shownSummary = isChinese
    ? `显示 ${rows.length} / ${leaderboardData.length} 个系统。`
    : `Showing ${rows.length} of ${leaderboardData.length} systems.`;
  const aggregateLabels = isChinese
    ? ['排名', '系统', '输入', '准确率 ↑', 'F1', 'ANLS']
    : ['Rank', 'System', 'Input', 'Acc. ↑', 'F1', 'ANLS'];

  if (leaderboardView === 'overall') {
    leaderboardTable.innerHTML = `
      <thead><tr>${aggregateLabels.map((label) => `<th scope="col">${label}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((row, index) => `
        <tr>
          <td class="leaderboard-rank ${index === 0 ? 'rank-one' : index === 1 ? 'rank-two' : index === 2 ? 'rank-three' : ''}">${index + 1}</td>
          <td class="leaderboard-model">${row.system}</td>
          <td class="leaderboard-input">${inputLabel(row.input, isChinese)}</td>
          <td class="leaderboard-score">${scoreText(row.acc)}</td>
          <td class="leaderboard-score">${scoreText(row.f1)}</td>
          <td class="leaderboard-score">${scoreText(row.anls)}</td>
        </tr>`).join('')}</tbody>`;
    leaderboardNote.textContent = isChinese
      ? `${shownSummary} 按 1,519 个人工核验样本上的基于规则总体准确率排序。前三名以绿色、蓝色和橙色标记。`
      : `${shownSummary} Ranked by rule-based overall accuracy on 1,519 human-verified examples. The top three systems are marked in green, blue, and orange.`;
    leaderboardTable.setAttribute('aria-label', isChinese ? 'XL-DocBench 总体排行榜' : 'XL-DocBench overall leaderboard');
  } else {
    const detailedColumns = [...reasoningColumns, { key: 'acc', label: 'Acc.' }, { key: 'f1', label: 'F1' }, { key: 'anls', label: 'ANLS' }];
    const columnRanks = Object.fromEntries(detailedColumns.map((column) => {
      const uniqueValues = [...new Set(rows.map((row) => row[column.key]))].sort((left, right) => right - left);
      return [column.key, { best: uniqueValues[0], second: uniqueValues[1] }];
    }));
    const detailedLabels = isChinese ? ['排名', '系统', '输入'] : ['Rank', 'System', 'Input'];

    leaderboardTable.innerHTML = `
      <thead><tr>${[...detailedLabels, ...detailedColumns.map((column) => column.label)].map((label) => `<th scope="col">${label}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((row, index) => `
        <tr>
          <td class="leaderboard-rank ${index === 0 ? 'rank-one' : index === 1 ? 'rank-two' : index === 2 ? 'rank-three' : ''}">${index + 1}</td>
          <td class="leaderboard-model">${row.system}</td>
          <td class="leaderboard-input">${inputLabel(row.input, isChinese)}</td>
          ${detailedColumns.map((column) => `<td class="${scoreClasses(row, column.key, columnRanks)}">${scoreText(row[column.key])}</td>`).join('')}
        </tr>`).join('')}</tbody>`;
    leaderboardNote.textContent = isChinese
      ? `${shownSummary} 明细保留论文主表的 12 类推理指标及聚合指标。每列最佳值为绿色，第二佳值为蓝色；并列项均会高亮。`
      : `${shownSummary} This view retains the paper’s 12 reasoning-type metrics and aggregate metrics. Per-column best values are green and second-best values are blue; ties are highlighted.`;
    leaderboardTable.setAttribute('aria-label', isChinese ? 'XL-DocBench 完整推理明细排行榜' : 'XL-DocBench full reasoning breakdown leaderboard');
  }

  leaderboardViewButtons.forEach((button) => {
    const isActive = button.dataset.leaderboardView === leaderboardView;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  leaderboardFilterButtons.forEach((button) => {
    const isFamilyButton = Boolean(button.dataset.filterFamily);
    const isActive = isFamilyButton
      ? button.dataset.filterFamily === leaderboardFamilyFilter
      : button.dataset.filterInput === leaderboardInputFilter;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

leaderboardViewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    leaderboardView = button.dataset.leaderboardView || 'overall';
    renderLeaderboard();
  });
});

leaderboardFilterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.filterFamily) leaderboardFamilyFilter = button.dataset.filterFamily;
    if (button.dataset.filterInput) leaderboardInputFilter = button.dataset.filterInput;
    renderLeaderboard();
  });
});

function renderEvidenceExplorer() {
  const study = caseStudies[activeCase];
  if (!study || !caseTitle || !caseDescription || !caseStudyImage) return;

  const content = document.documentElement.lang.startsWith('zh') ? study.zh : study.en;
  caseTitle.textContent = content.title;
  caseDescription.textContent = content.description;
  caseScope.textContent = content.scope;
  caseReasoning.textContent = content.reasoning;
  caseGroundTruth.textContent = content.groundTruth;
  caseFigureLabel.textContent = content.label;
  caseStudyImage.src = study.image;
  caseStudyImage.alt = content.alt;
  caseTabButtons.forEach((button) => {
    const isActive = button.dataset.case === activeCase;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

caseTabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeCase = button.dataset.case || 'cross-document-temporal';
    renderEvidenceExplorer();
  });
});

renderLeaderboard();
renderEvidenceExplorer();
