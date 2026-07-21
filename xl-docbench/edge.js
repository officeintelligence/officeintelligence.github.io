const copy = {
  en: {
    tagline: 'Benchmarking evidence-grounded extra-long document understanding.',
    overviewTitle: 'A human-verified benchmark for evidence-grounded reasoning across extra-long documents',
    overviewLead: 'Most document benchmarks test whether a model can answer. XL-DocBench also records where the answer comes from, what rule verifies it, and whether the available evidence is sufficient.',
    f1Title: 'Questions verified end to end', f1Text: 'Every retained item is re-answered by experts with full access to the source documents.',
    f2Title: 'Professional-scale contexts', f2Text: 'The median context is 211 pages, while the longest multi-document context spans 2,303 pages.',
    f3Title: 'Evidence beyond one page', f3Text: '1,103 questions require evidence distributed across multiple pages.',
    f4Title: 'Diagnostic reasoning types', f4Text: 'Twelve labels separate retrieval, set tracking, rule following, and abstention failures.',
    domainsTitle: 'Six professional domains, one evidence standard', domainsLead: 'Select a domain to inspect its coverage in the final human-verified benchmark.',
    evidenceTitle: 'Why page-level evidence matters', evidenceLead: 'The same wrong answer can come from very different system failures.',
    evidenceBody: 'A model may miss the required page, read the right page but ignore a table, combine only part of the support, or answer even though a required condition is absent. XL-DocBench stores evidence pages, supporting snippets, answer formats, and typed verification rules so these failures can be distinguished.',
    loopTitle: 'The evidence-grounding loop', loopFooter: 'Repeats across pages and related documents',
    loop1: 'Locate', loop1Text: 'Search the complete document context.', loop2: 'Inspect', loop2Text: 'Read text, tables, charts, and figures.', loop3: 'Combine', loop3Text: 'Track all required support and exceptions.', loop4: 'Verify', loop4Text: 'Apply the typed rule or abstain.',
    scaleTitle: 'From one page to 2,303 pages', scaleLead: 'Document QA has grown longer, but XL-DocBench also increases evidence dispersion, multimodal support, and cross-document scope.',
    scaleCall1: 'average context pages', scaleCall2: 'longest evaluation context', scaleCall3: 'questions over 1,000 pages',
    constructionTitle: 'Tree-guided synthesis, verified by 194 human experts', constructionLead: 'Models propose difficult candidates from document branches; people establish the final answer, evidence pages, supporting quotes, and verification rule.',
    p1: 'Structure documents', p1Text: 'Parse pages, text, tables, figures, and headings into a navigable tree.', p2: 'Test branch dependency', p2Text: 'Reject questions that remain answerable after a required branch is removed.', p3: 'Refine and filter', p3Text: 'Remove world-knowledge shortcuts, metadata leakage, weak support, and malformed answers.', p4: 'Verify every item', p4Text: 'Experts re-answer, mark exact pages and quotes, resolve ambiguity, and check the rule.',
    findingsTitle: 'Current systems still fail on more than half of XL-DocBench', findingsLead: 'The strongest evaluated pipeline reaches 44.0% overall accuracy. Long windows help, but evidence selection and set tracking remain binding constraints.',
    bestLabel: 'best overall accuracy', find1: 'A long window is not enough', find1Text: 'Models with the same 1M-token window still differ at the same OCR budget.', find2: 'Agents are not automatically better', find2Text: 'With GPT-5.4, SimpleDoc reaches 44.0%, MDocAgent 35.0%, and DeepRead 32.2%.', find3: 'Set tracking remains difficult', find3Text: 'Best ranking, coverage, and set-difference accuracy stays below 37%.',
    diagnosticsTitle: 'Same final accuracy, different failure modes', diagnosticsLead: 'Breakdowns by context length, evidence count, and evidence span reveal whether a system loses information because the input is long or because the required support is dispersed.',
    d1: 'Context pressure', d1Text: 'Direct readers degrade as irrelevant pages grow, even before hard context limits bind.', d2: 'Evidence pressure', d2Text: 'Questions requiring several support pages expose incomplete retrieval and set tracking.', d3: 'Span pressure', d3Text: 'Evidence separated by hundreds of pages is harder to keep active and reconcile.',
    dynamicsTitle: 'Retrieval is not the same as a correct answer', dynamicsLead: 'Evidence-hit curves and answer-yield curves separate page-search failures from evidence-use and rule-following failures.',
    casesTitle: 'Inside a human-verified example', casesLead: 'Each case exposes the question, evidence scope, reasoning type, and expert-verified support rather than showing only a final answer.',
    leaderboardTitle: 'Benchmark leaderboard across 27 evaluated systems', leaderboardLead: 'Filter by system family or inspect the full twelve-type reasoning breakdown. All scores come from the same deterministic evaluator and expert-verified ground truth.',
    overall: 'Overall ranking', detailed: 'Full reasoning breakdown', all: 'All systems', closed: 'Closed-source', open: 'Open-source', agent: 'Agent pipelines',
    tableNote: 'Best values in the selected view are highlighted in red; second-best values are blue. Failed, missing, and unparsable predictions count as incorrect.',
    footer: 'Measuring evidence-grounded reasoning in extra-long document understanding.', back: 'Back to top'
  },
  zh: {
    tagline: '面向超长文档证据驱动理解的基准评测。',
    overviewTitle: '一个面向超长文档证据驱动推理的人工核验基准',
    overviewLead: '多数文档基准只测试模型能否回答。XL-DocBench 还记录答案来自哪里、应由什么规则核验，以及现有证据是否足以支持回答。',
    f1Title: '端到端人工核验问题', f1Text: '每个保留样本都由专家在完整访问源文档的条件下重新作答。',
    f2Title: '专业尺度上下文', f2Text: '上下文中位数为 211 页，最长跨文档上下文达到 2,303 页。',
    f3Title: '跨越单页的证据', f3Text: '1,103 个问题需要分散在多个页面中的证据。',
    f4Title: '诊断性推理类型', f4Text: '十二类标签区分检索、集合追踪、规则遵循和拒答失败。',
    domainsTitle: '六个专业领域，一套证据标准', domainsLead: '选择领域，查看最终人工核验基准中的覆盖情况。',
    evidenceTitle: '为什么页面级证据至关重要', evidenceLead: '同一个错误答案可能来自完全不同的系统失败。',
    evidenceBody: '模型可能错过必要页面、读到正确页面却忽略表格、只整合部分支持，或在缺少必要条件时仍然作答。XL-DocBench 存储证据页、支持片段、答案格式和类型化验证规则，从而区分这些失败。',
    loopTitle: '证据驱动闭环', loopFooter: '跨页面与相关文档反复执行',
    loop1: '定位', loop1Text: '搜索完整文档上下文。', loop2: '检查', loop2Text: '阅读文本、表格、图表和图像。', loop3: '整合', loop3Text: '追踪全部必要支持与例外。', loop4: '核验', loop4Text: '应用类型化规则或拒绝作答。',
    scaleTitle: '从一页到 2,303 页', scaleLead: '文档问答正在变长，但 XL-DocBench 还同时增加证据分散、多模态支持和跨文档范围。',
    scaleCall1: '平均上下文页数', scaleCall2: '最长评测上下文', scaleCall3: '超过 1,000 页的问题',
    constructionTitle: '树引导合成，由 194 位人类专家核验', constructionLead: '模型从文档分支中提出困难候选；人工确定最终答案、证据页面、支持引文和验证规则。',
    p1: '构建文档结构', p1Text: '将页面、文本、表格、图像和标题解析为可导航的树。', p2: '测试分支依赖', p2Text: '删除必要分支后仍可回答的问题会被拒绝。', p3: '细化并过滤', p3Text: '移除世界知识捷径、元数据泄漏、弱证据和格式错误答案。', p4: '核验每个样本', p4Text: '专家重新作答、标记精确页面与引文、消除歧义并检查规则。',
    findingsTitle: '当前系统在超过一半的 XL-DocBench 问题上仍然失败', findingsLead: '最强评测系统的总体准确率仅为 44.0%。长窗口有所帮助，但证据选择与集合追踪仍是核心瓶颈。',
    bestLabel: '最佳总体准确率', find1: '长窗口仍然不够', find1Text: '具有相同 1M-token 窗口的模型，在同一 OCR 预算下仍有明显差异。', find2: '智能体并非自动更强', find2Text: '同样使用 GPT-5.4，SimpleDoc 为 44.0%，MDocAgent 为 35.0%，DeepRead 为 32.2%。', find3: '集合追踪仍然困难', find3Text: '排序、覆盖和集合差的最佳准确率均低于 37%。',
    diagnosticsTitle: '相同最终准确率，不同失败模式', diagnosticsLead: '按上下文长度、证据数量和证据跨度进行拆解，可以判断系统是因输入过长，还是因必要支持过于分散而丢失信息。',
    d1: '上下文压力', d1Text: '即便尚未达到上下文硬限制，直接阅读器也会因无关页面增加而退化。', d2: '证据压力', d2Text: '需要多个支持页面的问题会暴露不完整检索和集合追踪失败。', d3: '跨度压力', d3Text: '相隔数百页的证据更难保持激活并完成对齐。',
    dynamicsTitle: '检索到证据不等于回答正确', dynamicsLead: '证据命中曲线与答案产出曲线将页面搜索失败和证据使用、规则遵循失败区分开。',
    casesTitle: '深入一个人工核验案例', casesLead: '每个案例展示问题、证据范围、推理类型和专家核验支持，而不只展示最终答案。',
    leaderboardTitle: '27 个评测系统的基准排行榜', leaderboardLead: '可按系统类型筛选，或检查完整的十二类推理明细。全部分数均来自同一确定性评估器与专家核验真实标签。',
    overall: '总体排名', detailed: '完整推理明细', all: '全部系统', closed: '闭源模型', open: '开源模型', agent: '智能体系统',
    tableNote: '当前视图的最佳值以红色突出，第二佳值以蓝色突出。失败、缺失或无法解析的预测均计为错误。',
    footer: '衡量超长文档理解中的证据驱动推理。', back: '返回顶部'
  }
};

const domains = {
  legal: { count: 311, en: ['Legal & Regulatory', 'Regulations, policy documents, and legal reports require systems to resolve definitions, exceptions, and compliance conditions across long files.', ['Regulations', 'Policy exceptions', 'Compliance']], zh: ['法律与监管', '法规、政策文件和法律报告要求系统在长文档中解析定义、例外与合规条件。', ['法规', '政策例外', '合规']] },
  finance: { count: 333, en: ['Finance & Business', 'Annual reports and business filings combine narrative disclosures with tables, repeated metrics, and cross-report comparisons.', ['Annual reports', 'Financial tables', 'Cross-report']], zh: ['金融与商业', '年度报告与商业文件混合了叙述披露、表格、重复指标与跨报告比较。', ['年度报告', '财务表格', '跨报告']] },
  technical: { count: 274, en: ['Technical & Engineering', 'Standards and manuals test whether systems can connect requirements, diagrams, component specifications, and operating constraints.', ['Standards', 'Manuals', 'Specifications']], zh: ['技术与工程', '标准与手册测试系统能否连接要求、图示、组件规格和运行约束。', ['标准', '手册', '规格']] },
  medical: { count: 294, en: ['Medical & Clinical', 'Clinical guidelines require evidence-aware reasoning over recommendations, populations, thresholds, and special cases.', ['Guidelines', 'Thresholds', 'Special cases']], zh: ['医疗与临床', '临床指南要求系统围绕建议、人群、阈值和特殊情况进行证据驱动推理。', ['指南', '阈值', '特殊情况']] },
  scientific: { count: 218, en: ['Scientific & Academic', 'Scientific documents combine methods, tables, figures, and findings that may be separated by hundreds of pages.', ['Methods', 'Figures', 'Findings']], zh: ['科研与学术', '科学文档混合方法、表格、图像和结论，这些证据可能相隔数百页。', ['方法', '图像', '结论']] },
  narrative: { count: 89, en: ['Narrative & Literary', 'Long narratives test temporal ordering, reference chains, consistency, and evidence spread across chapters.', ['Temporal', 'Reference chains', 'Consistency']], zh: ['叙事与文学', '长篇叙事测试时间顺序、引用链、一致性和跨章节证据。', ['时间推理', '引用链', '一致性']] }
};

const cases = {
  cross: { image: 'assets/figures/cross-document-temporal.png', en: ['Cross-document temporal reasoning', 'Multiple PDFs', 'Temporal', 'The answer requires linking dated evidence across related reports rather than extracting one local phrase.'], zh: ['跨文档时间推理', '多个 PDF', '时间推理', '答案需要连接相关报告中的带日期证据，而不是抽取一个局部短语。'] },
  comparison: { image: 'assets/figures/case-comparison.png', en: ['Comparison', 'Multiple pages', 'Comparison', 'The system must align comparable values and conditions from different document locations.'], zh: ['比较推理', '多个页面', '比较', '系统必须对齐不同文档位置中的可比数值与条件。'] },
  difference: { image: 'assets/figures/case-set-difference.png', en: ['Set difference', 'Multiple pages', 'Set difference', 'Two evidence-grounded sets must be maintained before identifying what appears in only one.'], zh: ['集合差推理', '多个页面', '集合差', '系统必须先维护两个由证据支撑的集合，再识别只属于其中一个集合的元素。'] },
  unanswerable: { image: 'assets/figures/case-unanswerable.png', en: ['Unanswerable', 'Missing support', 'Abstention', 'A required condition is absent, so the correct behavior is to return None instead of guessing.'], zh: ['不可回答', '缺少支持', '拒答', '文档中缺少必要条件，因此正确行为是返回 None，而不是猜测。'] },
  compliance: { image: 'assets/figures/case-compliance.png', en: ['Compliance', 'Multiple pages', 'Compliance', 'The answer must satisfy a general rule together with its explicit special cases and exceptions.'], zh: ['合规推理', '多个页面', '合规', '答案必须同时满足一般规则及其明确的特殊情形与例外。'] }
};

const reasoningKeys = ['cmp','ref','rnk','cov','rec','sdiff','unans','tmp','cmpl','ctf','agg','con'];
const reasoningLabels = ['Cmp.','Ref.','Rnk.','Cov.','Rec.','SDiff','Unans','Tmp.','Cmpl','Ctf','Agg','Con'];
const rows = [];
function add(family, system, input, values, acc, f1, anls) { rows.push({ family, system, input, values, acc, f1, anls }); }
add('closed','GPT-5.2 (256K)','Img',[9.8,13.7,10.8,12.6,18.3,13.6,88.3,10.3,13.1,5.2,4.3,28.6],22.9,25.6,22.7);
add('closed','GPT-5.2 (256K)','OCR',[19.1,28.2,17.6,25.8,28.7,25.4,83.6,13.8,26.2,13.8,4.3,19.0],30.9,33.2,28.1);
add('closed','GPT-5.4 (1M)','Img',[28.9,26.9,20.5,18.7,23.5,20.3,44.9,24.1,26.2,22.4,23.4,28.6],26.9,29.6,25.9);
add('closed','GPT-5.4 (1M)','OCR',[31.5,36.8,21.0,30.8,40.0,33.9,70.6,36.2,32.8,31.0,27.7,23.8],37.3,39.5,34.1);
add('closed','Claude Opus 4.6 (1M)','OCR',[38.7,36.8,29.0,29.1,39.1,31.4,66.8,34.5,41.0,37.9,46.8,47.6],39.8,40.5,34.7);
add('open','Kimi-K2.5 (256K)','Img',[27.7,23.5,19.9,23.6,27.8,21.2,29.0,37.9,23.0,32.8,25.5,9.5],25.4,27.0,22.5);
add('open','Kimi-K2.5 (256K)','OCR',[39.1,39.3,30.1,29.1,27.0,31.4,39.7,36.2,44.3,41.4,42.6,42.9],35.8,37.9,32.3);
add('open','DeepSeek-V3.2 (128K)','OCR',[23.0,26.5,17.0,19.2,21.7,24.6,78.5,17.2,18.0,15.5,23.4,23.8],29.6,32.8,29.0);
add('open','Qwen3.5 9B (256K)','Img',[17.9,18.4,18.8,12.1,9.6,13.6,38.8,25.9,21.3,12.1,23.4,23.8],19.8,22.6,20.1);
add('open','Qwen3.5 9B (256K)','OCR',[13.6,25.6,15.9,18.1,18.3,22.0,50.0,17.2,13.1,12.1,2.1,23.8],22.3,26.8,24.1);
add('open','Qwen3.5 35B-A3B (256K)','Img',[23.0,19.2,24.4,19.8,23.5,16.9,38.3,31.0,19.7,19.0,23.4,42.9],24.2,17.5,11.6);
add('open','Qwen3.5 35B-A3B (256K)','OCR',[24.3,29.1,18.2,17.6,32.2,18.6,84.1,19.0,27.9,17.2,31.9,23.8],32.0,35.8,32.5);
add('agent','MDocAgent + GPT-5.4','Agent',[43.8,36.3,33.5,30.8,35.7,26.3,22.0,46.6,39.3,48.3,48.9,38.1],35.0,35.8,28.4);
add('agent','MDocAgent + Claude Opus 4.6','Agent',[42.1,37.6,29.5,24.7,36.5,25.4,21.5,44.8,39.3,43.1,40.4,42.9],33.2,34.9,28.6);
add('agent','MDocAgent + GPT-5.2','Agent',[39.6,34.6,27.8,27.5,33.0,28.0,24.8,39.7,42.6,46.6,46.8,33.3],33.0,33.5,26.3);
add('agent','MDocAgent + Kimi-K2.5','Agent',[39.6,33.3,27.3,23.6,33.9,25.4,21.5,39.7,34.4,46.6,38.3,33.3],31.1,33.6,27.5);
add('agent','MDocAgent + DeepSeek-V3.2','Agent',[24.3,25.6,26.1,20.9,27.8,18.6,18.7,31.0,24.6,32.8,27.7,19.0],24.0,27.7,22.3);
add('agent','SimpleDoc + GPT-5.4','Agent',[48.5,41.0,35.8,28.0,41.7,36.4,60.7,46.6,49.2,55.2,51.1,47.6],44.0,43.7,35.7);
add('agent','SimpleDoc + Claude Opus 4.6','Agent',[44.3,38.5,31.2,30.8,36.5,33.1,57.0,44.8,39.3,46.6,48.9,38.1],40.6,41.3,33.3);
add('agent','SimpleDoc + GPT-5.2','Agent',[37.9,33.8,33.0,25.8,34.8,26.3,68.2,37.9,36.1,39.7,36.2,38.1],38.3,37.7,30.6);
add('agent','SimpleDoc + Kimi-K2.5','Agent',[34.9,33.3,23.9,23.1,31.3,26.3,55.6,34.5,44.3,39.7,31.9,33.3],34.4,35.7,29.5);
add('agent','SimpleDoc + DeepSeek-V3.2','Agent',[32.8,34.2,22.7,20.3,33.9,28.0,76.2,37.9,36.1,36.2,36.2,33.3],36.7,38.1,31.8);
add('agent','DeepRead + GPT-5.4','Agent',[35.3,37.6,27.8,29.1,38.3,32.2,27.6,29.3,36.1,25.9,29.8,33.3],32.2,33.2,26.8);
add('agent','DeepRead + Claude Opus 4.6','Agent',[26.0,24.4,23.9,25.3,27.8,17.0,32.7,22.4,31.1,36.2,25.5,33.3],26.3,28.3,23.1);
add('agent','DeepRead + GPT-5.2','Agent',[30.6,30.8,22.2,26.4,30.4,28.0,27.6,32.8,39.3,19.0,27.7,33.3],28.4,31.0,25.4);
add('agent','DeepRead + Kimi-K2.5','Agent',[27.7,24.4,22.7,18.7,20.0,21.2,14.0,24.1,32.8,27.6,31.9,23.8],22.6,25.0,21.5);
add('agent','DeepRead + DeepSeek-V3.2','Agent',[31.5,27.4,19.3,17.0,27.8,13.6,25.7,31.0,36.1,44.8,19.1,28.6],25.5,26.7,22.0);

let language = localStorage.getItem('xl-edge-language') || 'en';
let activeDomain = 'legal';
let activeCase = 'cross';
let leaderboardFamily = 'all';
let leaderboardView = 'overall';
let loopIndex = 0;
let loopTimer;

function applyLanguage(next) {
  language = next;
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-copy]').forEach(node => {
    const value = copy[language][node.dataset.copy];
    if (value !== undefined) node.textContent = value;
  });
  const toggle = document.querySelector('#edge-language');
  if (toggle) toggle.textContent = language === 'zh' ? 'EN / 中文' : 'EN / 中文';
  document.title = language === 'zh' ? 'XL-DocBench｜超长文档证据驱动理解' : 'XL-DocBench | Evidence-grounded extra-long document understanding';
  localStorage.setItem('xl-edge-language', language);
  renderDomain();
  renderCase();
  renderLeaderboard();
}

function renderDomain() {
  const item = domains[activeDomain];
  if (!item) return;
  const data = item[language];
  document.querySelector('#domain-count').textContent = item.count;
  document.querySelector('#domain-title').textContent = data[0];
  document.querySelector('#domain-description').textContent = data[1];
  document.querySelector('#domain-examples').innerHTML = data[2].map(value => `<span>${value}</span>`).join('');
  document.querySelectorAll('[data-domain]').forEach(button => button.classList.toggle('is-active', button.dataset.domain === activeDomain));
}

function showLoop(index) {
  const steps = [...document.querySelectorAll('.loop-step')];
  if (!steps.length) return;
  loopIndex = (index + steps.length) % steps.length;
  steps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex === loopIndex));
  clearTimeout(loopTimer);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) loopTimer = setTimeout(() => showLoop(loopIndex + 1), 1900);
}

function renderCase() {
  const item = cases[activeCase];
  if (!item) return;
  const data = item[language];
  document.querySelector('#case-title').textContent = data[0];
  document.querySelector('#case-scope').textContent = data[1];
  document.querySelector('#case-reasoning').textContent = data[2];
  document.querySelector('#case-description').textContent = data[3];
  const image = document.querySelector('#case-image');
  image.src = item.image;
  image.alt = data[0];
  document.querySelectorAll('[data-case]').forEach(button => button.classList.toggle('is-active', button.dataset.case === activeCase));
}

function ranksFor(filtered, keys) {
  return Object.fromEntries(keys.map(key => {
    const values = [...new Set(filtered.map(row => key.startsWith('v') ? row.values[Number(key.slice(1))] : row[key]))].sort((a,b) => b-a);
    return [key, { best: values[0], second: values[1] }];
  }));
}

function renderLeaderboard() {
  const table = document.querySelector('#results-table');
  if (!table) return;
  const filtered = rows.filter(row => leaderboardFamily === 'all' || row.family === leaderboardFamily).sort((a,b) => b.acc-a.acc || b.f1-a.f1);
  const keys = leaderboardView === 'overall' ? ['acc','f1','anls'] : [...reasoningKeys.map((_,index)=>`v${index}`),'acc','f1','anls'];
  const ranks = ranksFor(filtered, keys);
  const labels = leaderboardView === 'overall' ? ['Acc.','F1','ANLS'] : [...reasoningLabels,'Acc.','F1','ANLS'];
  const titleRank = language === 'zh' ? '排名' : 'Rank';
  const titleSystem = language === 'zh' ? '系统' : 'System';
  const titleInput = language === 'zh' ? '输入' : 'Input';
  const cells = (row,key) => {
    const value = key.startsWith('v') ? row.values[Number(key.slice(1))] : row[key];
    const cls = value === ranks[key].best ? 'best-cell' : value === ranks[key].second ? 'second-cell' : '';
    return `<td class="${cls}">${value.toFixed(1)}</td>`;
  };
  table.classList.toggle('is-detailed', leaderboardView === 'detailed');
  table.innerHTML = `<thead><tr><th>${titleRank}</th><th>${titleSystem}</th><th>${titleInput}</th>${labels.map(label=>`<th>${label}</th>`).join('')}</tr></thead><tbody>${filtered.map((row,index)=>`<tr class="${index===0?'top-one':''}"><td class="rank">${index+1}</td><td class="model">${row.system}</td><td class="input">${row.input}</td>${keys.map(key=>cells(row,key)).join('')}</tr>`).join('')}</tbody>`;
  document.querySelectorAll('[data-family]').forEach(button => button.classList.toggle('is-active', button.dataset.family === leaderboardFamily));
  document.querySelectorAll('[data-view]').forEach(button => button.classList.toggle('is-active', button.dataset.view === leaderboardView));
}

document.querySelector('#edge-language')?.addEventListener('click', () => applyLanguage(language === 'en' ? 'zh' : 'en'));
document.querySelectorAll('[data-domain]').forEach(button => button.addEventListener('click', () => { activeDomain = button.dataset.domain; renderDomain(); }));
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => { activeCase = button.dataset.case; renderCase(); }));
document.querySelectorAll('[data-figure]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-figure]').forEach(item => item.classList.toggle('is-active', item === button));
  document.querySelectorAll('.figure-stage figure').forEach(figure => figure.classList.toggle('is-active', figure.dataset.figurePanel === button.dataset.figure));
}));
document.querySelectorAll('[data-family]').forEach(button => button.addEventListener('click', () => { leaderboardFamily = button.dataset.family; renderLeaderboard(); }));
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => { leaderboardView = button.dataset.view; renderLeaderboard(); }));

const observedSections = [...document.querySelectorAll('.story-section')];
const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('is-visible');
}), { threshold: .16 });
observedSections.forEach(section => sectionObserver.observe(section));

const contentsLinks = [...document.querySelectorAll('.contents a')];
const navObserver = new IntersectionObserver(entries => {
  const active = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
  if (!active) return;
  contentsLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${active.target.id}`));
}, { rootMargin: '-20% 0px -70% 0px', threshold: [0,.1,.3] });
observedSections.forEach(section => navObserver.observe(section));

applyLanguage(language);
showLoop(0);
window.lucide?.createIcons();

const hero = document.querySelector('.edge-hero');
if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  hero.addEventListener('pointermove', (event) => {
    const bounds = hero.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * 10;
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * 8;
    hero.style.setProperty('--hero-shift-x', `${x}px`);
    hero.style.setProperty('--hero-shift-y', `${y}px`);
  }, { passive: true });
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--hero-shift-x', '0px');
    hero.style.setProperty('--hero-shift-y', '0px');
  });
}
