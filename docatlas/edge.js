const copy = {
  en: {
    tagline: 'Long-document understanding as mutable-state interaction.',
    overviewTitle: 'A document becomes more useful as the agent interacts with it',
    overviewLead: 'DocAtlas turns long-document understanding into a stateful process: search proposes where to look, reading exposes multimodal evidence, notes write findings back, and review recalls what matters next.',
    f1Title: 'MMLongBench-Doc accuracy', f1Text: 'GPT-5.4 with DocAtlas exceeds the 65.8% human-expert reference.',
    f2Title: 'Compact policy after RL', f2Text: 'A Qwen3.5-4B policy improves from 54.4% direct input to 63.7%.',
    f3Title: 'FinRAGBench-V gain', f3Text: 'GPT-5.4 improves from 55.1 to 75.6 LLM-as-judge.',
    f4Title: 'Tools in one environment', f4Text: 'Search, Read, Note, and Review can be selected in any order.',
    benchmarkTitle: 'Three benchmarks, one interaction strategy', benchmarkLead: 'Select a benchmark to compare DocAtlas with direct long-context input.',
    stateTitle: 'Why long documents should be mutable state', stateLead: 'Static retrieval commits before reasoning begins. DocAtlas lets evidence change what the agent can find and do next.',
    stateBody: 'The initial tree contains titles, page ranges, and summaries. When the agent records a source-grounded note, that finding updates both structured memory and the document tree. Later search operates on an enriched state rather than the same frozen index.',
    loopTitle: 'The mutable-state loop', loopFooter: 'Evidence updates the state used by later actions',
    loop1: 'Search', loop1Text: 'Navigate the visual-aware tree.', loop2: 'Read', loop2Text: 'Inspect selected multimodal pages.', loop3: 'Note', loop3Text: 'Write grounded findings back.', loop4: 'Review', loop4Text: 'Recall evidence when it matters.',
    frameworkTitle: 'One document harness for inference and end-to-end RL', frameworkLead: 'The same environment supports frontier VLM agents at inference time and trains compact open policies with outcome rewards.',
    p1: 'Search the tree', p1Text: 'Retrieve candidate regions from hierarchy, summaries, and prior findings.', p2: 'Read selectively', p2Text: 'Choose the pages and multimodal views that enter active context.', p3: 'Write grounded notes', p3Text: 'Compress evidence with source attribution and update the tree.', p4: 'Review on demand', p4Text: 'Retrieve relevant findings from structured memory before answering.',
    efficiencyTitle: 'Search broadly. Read selectively.', efficiencyLead: 'Search is optimized for evidence recall; Read converts those candidates into a compact, high-precision evidence set.',
    e1: 'Full Search All-Hit', e1Text: 'Coverage of all gold evidence pages before selective reading.', e2: 'Pages after Full Read', e2Text: 'The agent consumes only a small subset of candidate pages.', e3: 'Tree-annotation gain', e3Text: 'All-Hit improvement from writing findings back into the tree.',
    findingsTitle: 'Mutable-state interaction improves frontier and compact agents', findingsLead: 'DocAtlas reaches 71.4% on MMLongBench-Doc with GPT-5.4 and trains a 4B policy to 63.7% in the same environment.',
    bestLabel: 'MMLongBench-Doc accuracy', find1: 'Above the human reference', find1Text: 'DocAtlas + GPT-5.4 reaches 71.4%, compared with 65.8% for human experts.', find2: 'One harness, two scales', find2Text: 'The same tools support frontier inference and end-to-end RL for compact VLMs.', find3: 'Gains transfer across benchmarks', find3Text: 'GPT-5.4 improves by 20.5 points on FinRAGBench-V and 11.9 on LongDocURL.',
    analysisTitle: 'What changes when state is mutable', analysisLead: 'Component ablations and tool allocation show that performance comes from the interaction loop rather than a single retrieval call.',
    trajectoriesTitle: 'Inside a complete DocAtlas trajectory', trajectoriesLead: 'Follow how the agent searches, reads, records source-grounded evidence, reviews memory, and produces a final answer.',
    leaderboardTitle: 'Complete results across 27 systems and three benchmarks', leaderboardLead: 'The full table retains evidence-type breakdowns, aggregate metrics, compact-policy RL, and results on FinRAGBench-V and LongDocURL.',
    overall: 'Overall results', detailed: 'Full 14-metric table', all: 'All systems', baseline: 'Direct / OCR', agent: 'Agent frameworks', ours: 'DocAtlas',
    tableNote: 'Best non-human values in the selected view are highlighted in red; second-best values are blue. Missing results are shown as dashes.',
    footer: 'Long-document understanding as mutable-state interaction.', back: 'Back to top'
  },
  zh: {
    tagline: '将长文档理解建模为可变状态交互。',
    overviewTitle: '文档会随着智能体交互而变得更有用',
    overviewLead: 'DocAtlas 将长文档理解转化为有状态过程：Search 提出查找位置，Read 暴露多模态证据，Note 将发现写回，Review 在下一步调取重要信息。',
    f1Title: 'MMLongBench-Doc 准确率', f1Text: 'GPT-5.4 与 DocAtlas 超过 65.8% 的人类专家参考。',
    f2Title: '强化学习后的紧凑策略', f2Text: 'Qwen3.5-4B 策略从直接输入的 54.4% 提升到 63.7%。',
    f3Title: 'FinRAGBench-V 提升', f3Text: 'GPT-5.4 的 LLM-as-judge 从 55.1 提升到 75.6。',
    f4Title: '同一环境中的工具', f4Text: 'Search、Read、Note 与 Review 可以按任意顺序选择。',
    benchmarkTitle: '三个基准，一种交互策略', benchmarkLead: '选择基准，对比 DocAtlas 与直接长上下文输入。',
    stateTitle: '为什么长文档应当成为可变状态', stateLead: '静态检索在推理开始前就做出承诺。DocAtlas 让证据改变智能体下一步能找到什么、做什么。',
    stateBody: '初始树包含标题、页码范围与摘要。当智能体记录带来源的笔记时，发现会同时更新结构化记忆和文档树。之后的搜索使用富化状态，而不是同一个冻结索引。',
    loopTitle: '可变状态闭环', loopFooter: '证据更新后续行动所使用的状态',
    loop1: '搜索', loop1Text: '导航具备视觉感知的树。', loop2: '阅读', loop2Text: '检查选定的多模态页面。', loop3: '笔记', loop3Text: '将带来源发现写回。', loop4: '回顾', loop4Text: '在需要时调取证据。',
    frameworkTitle: '同一文档环境支持推理与端到端强化学习', frameworkLead: '同一环境既支持前沿 VLM 智能体推理，也通过结果奖励训练紧凑开放策略。',
    p1: '搜索文档树', p1Text: '从层级、摘要和先前发现中检索候选区域。', p2: '选择性阅读', p2Text: '选择进入活动上下文的页面和多模态视图。', p3: '写入带来源笔记', p3Text: '压缩证据、保留来源，并更新文档树。', p4: '按需回顾', p4Text: '在回答前从结构化记忆中检索相关发现。',
    efficiencyTitle: '广泛搜索，选择性阅读。', efficiencyLead: 'Search 优化证据召回；Read 将候选转化为紧凑、高精度的证据集合。',
    e1: '完整 Search All-Hit', e1Text: '选择性阅读前对全部金标准证据页的覆盖。', e2: '完整 Read 后页面数', e2Text: '智能体只消费候选页面中的小部分。', e3: '树标注增益', e3Text: '将发现写回文档树带来的 All-Hit 提升。',
    findingsTitle: '可变状态交互同时提升前沿与紧凑智能体', findingsLead: 'DocAtlas 与 GPT-5.4 在 MMLongBench-Doc 达到 71.4%，并在同一环境中将 4B 策略训练到 63.7%。',
    bestLabel: 'MMLongBench-Doc 准确率', find1: '超过人类参考', find1Text: 'DocAtlas + GPT-5.4 达到 71.4%，人类专家参考为 65.8%。', find2: '同一环境，两种尺度', find2Text: '同一套工具支持前沿模型推理与紧凑 VLM 的端到端强化学习。', find3: '提升迁移到多个基准', find3Text: 'GPT-5.4 在 FinRAGBench-V 提升 20.5 点，在 LongDocURL 提升 11.9 点。',
    analysisTitle: '状态可变时，什么发生了变化', analysisLead: '组件消融与工具分配表明，性能来自交互闭环，而不是一次检索调用。',
    trajectoriesTitle: '深入一条完整 DocAtlas 轨迹', trajectoriesLead: '观察智能体如何搜索、阅读、记录带来源证据、回顾记忆并生成最终答案。',
    leaderboardTitle: '27 个系统、三个基准的完整结果', leaderboardLead: '完整表格保留证据类型拆解、聚合指标、紧凑策略强化学习，以及 FinRAGBench-V 和 LongDocURL 结果。',
    overall: '总体结果', detailed: '完整 14 指标表', all: '全部系统', baseline: '直接输入 / OCR', agent: '智能体框架', ours: 'DocAtlas',
    tableNote: '当前视图的最佳非人工结果以红色突出，第二佳结果以蓝色突出。缺失结果显示为横线。',
    footer: '将长文档理解建模为可变状态交互。', back: '返回顶部'
  }
};

const benchmarks = {
  mml: { score: '71.4', en: ['MMLongBench-Doc', 'All accuracy', 'GPT-5.4 improves from 62.4 direct input to 71.4 with DocAtlas, exceeding the 65.8 human-expert reference.', ['Direct 62.4', 'Human 65.8', 'DocAtlas 71.4']], zh: ['MMLongBench-Doc', '总体准确率', 'GPT-5.4 从直接输入的 62.4 提升到 DocAtlas 的 71.4，并超过 65.8 的人类专家参考。', ['直接输入 62.4', '人类 65.8', 'DocAtlas 71.4']] },
  fin: { score: '75.6', en: ['FinRAGBench-V', 'LLM-as-judge', 'DocAtlas + GPT-5.4 reaches 75.6, a 20.5-point gain over the 55.1 direct-input baseline.', ['Direct 55.1', '+20.5 points', 'DocAtlas 75.6']], zh: ['FinRAGBench-V', 'LLM-as-judge', 'DocAtlas + GPT-5.4 达到 75.6，相较 55.1 的直接输入基线提升 20.5 点。', ['直接输入 55.1', '提升 20.5 点', 'DocAtlas 75.6']] },
  long: { score: '78.8', en: ['LongDocURL', 'LLM-as-judge', 'DocAtlas + GPT-5.4 reaches 78.8, compared with 66.9 for direct long-context input.', ['Direct 66.9', '+11.9 points', 'DocAtlas 78.8']], zh: ['LongDocURL', 'LLM-as-judge', 'DocAtlas + GPT-5.4 达到 78.8，而直接长上下文输入为 66.9。', ['直接输入 66.9', '提升 11.9 点', 'DocAtlas 78.8']] }
};

const trajectories = {
  multihop: { image: 'assets/figures/trajectory-multihop.png', en: ['Multi-hop evidence gathering', 'Search · Read · Note · Review', 'Evidence writes back to the tree', 'DocAtlas iteratively gathers evidence from different document regions and records intermediate findings before answering.'], zh: ['多跳证据收集', '搜索 · 阅读 · 笔记 · 回顾', '证据写回文档树', 'DocAtlas 从不同文档区域迭代收集证据，并在回答前记录中间发现。'] },
  raptor: { image: 'assets/figures/trajectory-raptor.png', en: ['Complete reasoning flow', 'Search · Read · Note · Review', 'Notes and index evolve together', 'The complete trajectory shows how selective reading, source-grounded notes, and final evidence consolidation interact inside one episode.'], zh: ['完整推理流程', '搜索 · 阅读 · 笔记 · 回顾', '笔记与索引共同演化', '完整轨迹展示选择性阅读、带来源笔记与最终证据整合如何在一次交互中协同工作。'] }
};

const columns = ['TXT','LAY','CHA','TAB','FIG','UNA','Acc','F1','LasJ','Fin TXT','Fin TAB','Fin CHA','Fin LasJ','Long LasJ'];
const resultRows = [
  { group:'vanilla', model:'GPT-5.2', v:[45.8,45.6,45.3,43.3,33.5,86.0,52.8,52.1,57.6,40.4,28.9,40.7,36.0,59.4] },
  { group:'vanilla', model:'GPT-5.4', v:[57.8,57.7,55.7,61.1,51.7,75.6,62.4,59.4,63.4,64.6,45.2,59.9,55.1,66.9] },
  { group:'vanilla', model:'Claude-4-Sonnet', v:[50.4,49.4,50.5,57.3,43.9,59.0,53.4,null,null,36.6,20.2,51.9,33.8,null] },
  { group:'vanilla', model:'Gemini-2.5-Flash', v:[44.0,53.2,46.0,43.9,48.2,56.7,49.6,null,null,49.0,41.6,41.0,43.0,null] },
  { group:'vanilla', model:'Gemini-2.5-Pro', v:[52.1,62.1,55.5,55.3,54.0,59.9,58.1,null,null,62.2,55.3,50.4,54.9,null] },
  { group:'vanilla', model:'Qwen3.5-4B', v:[47.5,48.7,47.6,55.4,45.5,63.4,54.4,53.1,58.7,66.2,49.0,48.8,52.8,52.4] },
  { group:'vanilla', model:'Qwen3.5-9B', v:[54.2,53.8,51.0,55.7,46.4,66.9,58.0,55.0,60.2,64.2,52.2,54.7,55.8,55.5] },
  { group:'vanilla', model:'Qwen3.5-397B-A13B', v:[null,null,null,null,null,null,61.9,null,null,null,null,null,null,null] },
  { group:'ocr', model:'Claude-4-Sonnet + OCR', v:[52.7,51.6,50.0,58.1,45.3,65.9,56.0,null,null,58.7,21.6,54.3,41.0,null] },
  { group:'ocr', model:'Gemini-2.5-Flash + OCR', v:[55.9,54.9,52.7,63.4,50.3,60.8,58.5,null,null,67.6,64.4,46.1,58.3,null] },
  { group:'ocr', model:'Gemini-2.5-Pro + OCR', v:[59.7,65.3,60.8,68.3,55.7,58.4,63.3,null,null,70.0,70.0,56.2,64.9,null] },
  { group:'agent', model:'M3DocRAG (Qwen2-VL-7B)†', v:[30.0,23.5,18.9,20.1,20.8,5.8,21.0,null,null,null,null,null,null,null] },
  { group:'agent', model:'MDocAgent (GPT-4o)†', v:[null,null,null,null,null,null,42.0,null,null,null,null,null,null,null] },
  { group:'agent', model:'DocDancer (GPT-5.2)', v:[null,null,null,null,null,null,57.0,null,null,null,null,null,null,null] },
  { group:'agent', model:'SimpleDoc + Claude-4-Sonnet', v:[52.1,53.3,58.3,62.4,46.9,66.5,58.6,null,null,59.6,68.9,54.9,61.7,null] },
  { group:'agent', model:'SimpleDoc + Gemini-2.5-Flash', v:[45.5,57.4,49.0,51.6,45.2,66.5,53.3,null,null,70.2,56.2,53.6,58.3,null] },
  { group:'agent', model:'SimpleDoc + Gemini-2.5-Pro', v:[48.4,54.8,55.7,56.1,52.5,59.7,56.6,null,null,67.5,64.0,60.9,63.6,null] },
  { group:'agent', model:'DocLens + Claude-4-Sonnet', v:[59.9,58.2,54.4,63.9,55.3,74.0,63.3,null,null,70.2,66.0,60.3,64.8,null] },
  { group:'agent', model:'DocLens + Gemini-2.5-Flash', v:[59.5,61.5,54.8,66.9,59.0,73.8,64.7,null,null,69.9,71.3,64.5,68.5,null] },
  { group:'agent', model:'DocLens + Gemini-2.5-Pro', v:[63.7,64.6,64.3,69.7,60.2,72.2,67.6,null,null,68.9,74.2,67.1,70.4,null] },
  { group:'ours', model:'DocAtlas + Qwen3.5-4B', v:[58.4,54.6,56.1,67.0,48.1,70.6,61.0,58.7,63.5,73.3,66.5,65.4,67.9,72.5] },
  { group:'ours', model:'DocAtlas + Qwen3.5-9B', v:[58.8,55.3,56.2,67.8,51.9,70.8,61.6,59.4,64.7,73.9,67.1,66.4,69.8,74.0] },
  { group:'ours', model:'DocAtlas RL + Qwen3.5-4B', v:[59.2,55.9,57.5,67.8,51.8,74.6,63.7,62.4,67.9,75.2,70.7,68.5,71.7,null] },
  { group:'ours', model:'DocAtlas RL + Qwen3.5-9B', v:[66.6,60.5,58.9,70.1,59.9,59.3,64.4,63.1,69.6,75.8,72.0,70.7,72.6,null] },
  { group:'ours', model:'DocAtlas + GPT-5.2', v:[67.0,71.5,68.0,74.4,67.6,66.5,70.6,69.6,73.9,76.0,76.2,73.1,75.2,77.5] },
  { group:'ours', model:'DocAtlas + GPT-5.4', v:[68.8,69.0,68.2,74.1,69.8,68.6,71.4,70.3,74.6,76.3,77.4,73.2,75.6,78.8] },
  { group:'human', model:'Human Expert†', v:[null,null,null,null,null,null,65.8,null,null,null,null,null,null,null] }
];

let language = localStorage.getItem('docatlas-edge-language') || 'en';
let activeBenchmark = 'mml';
let activeTrajectory = 'multihop';
let resultFilter = 'all';
let resultView = 'overall';
let loopIndex = 0;
let loopTimer;

function applyLanguage(next) {
  language = next;
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-copy]').forEach(node => { const value = copy[language][node.dataset.copy]; if (value !== undefined) node.textContent = value; });
  document.title = language === 'zh' ? 'DocAtlas｜可变状态长文档理解' : 'DocAtlas | Mutable-state long-document understanding';
  localStorage.setItem('docatlas-edge-language', language);
  renderBenchmark();
  renderTrajectory();
  renderResults();
}

function renderBenchmark() {
  const item = benchmarks[activeBenchmark];
  const data = item[language];
  document.querySelector('#benchmark-score').textContent = item.score;
  document.querySelector('#benchmark-title').textContent = data[0];
  document.querySelector('#benchmark-metric').textContent = data[1];
  document.querySelector('#benchmark-description').textContent = data[2];
  document.querySelector('#benchmark-delta').innerHTML = data[3].map(value => `<span>${value}</span>`).join('');
  document.querySelectorAll('[data-benchmark]').forEach(button => button.classList.toggle('is-active', button.dataset.benchmark === activeBenchmark));
}

function showLoop(index) {
  const steps = [...document.querySelectorAll('.loop-step')];
  if (!steps.length) return;
  loopIndex = (index + steps.length) % steps.length;
  steps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex === loopIndex));
  clearTimeout(loopTimer);
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) loopTimer = setTimeout(() => showLoop(loopIndex + 1), 1900);
}

function renderTrajectory() {
  const item = trajectories[activeTrajectory];
  const data = item[language];
  document.querySelector('#trajectory-title').textContent = data[0];
  document.querySelector('#trajectory-tools').textContent = data[1];
  document.querySelector('#trajectory-state').textContent = data[2];
  document.querySelector('#trajectory-description').textContent = data[3];
  const image = document.querySelector('#trajectory-image');
  image.src = item.image;
  image.alt = data[0];
  document.querySelectorAll('[data-trajectory]').forEach(button => button.classList.toggle('is-active', button.dataset.trajectory === activeTrajectory));
}

function resultRowsForView() {
  return resultRows.filter(row => {
    if (resultFilter === 'all') return true;
    if (resultFilter === 'baseline') return row.group === 'vanilla' || row.group === 'ocr';
    return row.group === resultFilter;
  }).sort((a,b) => (b.v[6] ?? -1) - (a.v[6] ?? -1));
}

function ranksFor(rows, indices) {
  return Object.fromEntries(indices.map(index => {
    const values = [...new Set(rows.filter(row => row.group !== 'human').map(row => row.v[index]).filter(Number.isFinite))].sort((a,b)=>b-a);
    return [index, { best:values[0], second:values[1] }];
  }));
}

function renderResults() {
  const table = document.querySelector('#results-table');
  if (!table) return;
  const rows = resultRowsForView();
  const indices = resultView === 'overall' ? [6,7,8,12,13] : columns.map((_,index)=>index);
  const labels = resultView === 'overall' ? ['MML Acc','MML F1','MML LasJ','Fin LasJ','Long LasJ'] : columns;
  const ranks = ranksFor(rows, indices);
  const rankLabel = language === 'zh' ? '排名' : 'Rank';
  const systemLabel = language === 'zh' ? '系统' : 'System';
  table.classList.toggle('is-detailed', resultView === 'detailed');
  table.innerHTML = `<thead><tr><th>${rankLabel}</th><th>${systemLabel}</th>${labels.map(label=>`<th>${label}</th>`).join('')}</tr></thead><tbody>${rows.map((row,rowIndex)=>`<tr class="${row.group==='ours'?'ours-row':''} ${row.group==='human'?'human-row':''}"><td class="rank">${rowIndex+1}</td><td class="model">${row.model}</td>${indices.map(index=>{const value=row.v[index];if(!Number.isFinite(value))return'<td>--</td>';const cls=value===ranks[index].best?'best-cell':value===ranks[index].second?'second-cell':'';return`<td class="${cls}">${value.toFixed(1)}</td>`;}).join('')}</tr>`).join('')}</tbody>`;
  document.querySelectorAll('[data-result-filter]').forEach(button => button.classList.toggle('is-active', button.dataset.resultFilter === resultFilter));
  document.querySelectorAll('[data-result-view]').forEach(button => button.classList.toggle('is-active', button.dataset.resultView === resultView));
}

document.querySelector('#edge-language')?.addEventListener('click',()=>applyLanguage(language==='en'?'zh':'en'));
document.querySelectorAll('[data-benchmark]').forEach(button=>button.addEventListener('click',()=>{activeBenchmark=button.dataset.benchmark;renderBenchmark();}));
document.querySelectorAll('[data-trajectory]').forEach(button=>button.addEventListener('click',()=>{activeTrajectory=button.dataset.trajectory;renderTrajectory();}));
document.querySelectorAll('[data-figure]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-figure]').forEach(item=>item.classList.toggle('is-active',item===button));document.querySelectorAll('.figure-stage figure').forEach(figure=>figure.classList.toggle('is-active',figure.dataset.figurePanel===button.dataset.figure));}));
document.querySelectorAll('[data-result-filter]').forEach(button=>button.addEventListener('click',()=>{resultFilter=button.dataset.resultFilter;renderResults();}));
document.querySelectorAll('[data-result-view]').forEach(button=>button.addEventListener('click',()=>{resultView=button.dataset.resultView;renderResults();}));

const sections=[...document.querySelectorAll('.story-section')];
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible');}),{threshold:.16});
sections.forEach(section=>revealObserver.observe(section));
const contentsLinks=[...document.querySelectorAll('.contents a')];
const navObserver=new IntersectionObserver(entries=>{const active=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!active)return;contentsLinks.forEach(link=>link.classList.toggle('is-active',link.getAttribute('href')===`#${active.target.id}`));},{rootMargin:'-20% 0px -70% 0px',threshold:[0,.1,.3]});
sections.forEach(section=>navObserver.observe(section));

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
