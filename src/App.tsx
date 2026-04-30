import { useMemo, useState } from 'react';

type Stage = '现象澄清' | '问题收窄' | '概念界定' | '变量识别' | '假设生成' | '验证方案';

type Message = {
  role: 'user' | 'mentor';
  text: string;
};

type Draft = {
  topic: string;
  researchQuestion: string;
  concepts: string;
  variables: string;
  hypothesis: string;
  method: string;
};

type Example = {
  label: string;
  prompt: string;
};

const stages: Stage[] = ['现象澄清', '问题收窄', '概念界定', '变量识别', '假设生成', '验证方案'];

const examples: Example[] = [
  { label: 'AI使用与学习', prompt: '我想研究使用 AI 工具会怎样影响我的学习效果。' },
  { label: '短视频与专注力', prompt: '我发现我看短视频后很难专注学习，想做一个研究。' },
  { label: '睡眠与学习效率', prompt: '我想研究睡眠时长和第二天学习效率之间的关系。' }
];

const mentorPrompts: Record<Stage, string> = {
  现象澄清: '先从现象开始：请描述一个你真实观察到的情境（时间、地点、人群）。',
  问题收窄: '很好。接下来把范围收窄成一个可研究的问题：你最想解释哪一个具体变化？',
  概念界定: '现在定义关键概念：你说的核心词（如“学习效果”）打算如何界定？',
  变量识别: '下一步识别变量：自变量、因变量，以及你要控制的干扰因素分别是什么？',
  假设生成: '基于前面内容，试着写一个可检验的假设句（如果...那么...）。',
  验证方案: '最后设计验证方案：样本、数据收集方式、评价指标和时间周期是什么？'
};

function App() {
  const [page, setPage] = useState<'home' | 'chat' | 'result'>('home');
  const [stageIndex, setStageIndex] = useState(0);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState<Draft>({
    topic: '',
    researchQuestion: '',
    concepts: '',
    variables: '',
    hypothesis: '',
    method: ''
  });

  const currentStage = stages[stageIndex];
  const progress = Math.round(((stageIndex + 1) / stages.length) * 100);

  const markdownDraft = useMemo(
    () => `# 研究方案草稿\n\n## 1. 研究主题\n${draft.topic || '（待补充）'}\n\n## 2. 研究问题\n${draft.researchQuestion || '（待补充）'}\n\n## 3. 概念界定\n${draft.concepts || '（待补充）'}\n\n## 4. 变量识别\n${draft.variables || '（待补充）'}\n\n## 5. 科学假设\n${draft.hypothesis || '（待补充）'}\n\n## 6. 验证方案\n${draft.method || '（待补充）'}\n`,
    [draft]
  );

  const startWithPrompt = (prompt: string) => {
    setPage('chat');
    setStageIndex(0);
    setDraft({ topic: prompt, researchQuestion: '', concepts: '', variables: '', hypothesis: '', method: '' });
    setMessages([
      { role: 'user', text: prompt },
      { role: 'mentor', text: mentorPrompts['现象澄清'] }
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const newMessages: Message[] = [...messages, { role: 'user', text: userText }];
    const updatedDraft = { ...draft };

    if (currentStage === '现象澄清') updatedDraft.topic = userText;
    if (currentStage === '问题收窄') updatedDraft.researchQuestion = userText;
    if (currentStage === '概念界定') updatedDraft.concepts = userText;
    if (currentStage === '变量识别') updatedDraft.variables = userText;
    if (currentStage === '假设生成') updatedDraft.hypothesis = userText;
    if (currentStage === '验证方案') updatedDraft.method = userText;

    const nextIndex = Math.min(stageIndex + 1, stages.length - 1);
    const nextStage = stages[nextIndex];

    if (stageIndex < stages.length - 1) {
      newMessages.push({ role: 'mentor', text: mentorPrompts[nextStage] });
    } else {
      newMessages.push({ role: 'mentor', text: '很好！你已经完成核心步骤。现在可查看最终研究方案草稿。' });
    }

    setMessages(newMessages);
    setDraft(updatedDraft);
    setStageIndex(nextIndex);
    setInput('');
  };

  if (page === 'home') {
    return (
      <main className="min-h-screen p-6 md:p-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold">Scientific Method Mentor</h1>
          <p className="mt-2 text-lg text-slate-600">科学研究导师智能体</p>
          <p className="mt-6 text-slate-700">
            通过导师式对话，帮助你从现象出发，逐步形成研究问题、科学假设与验证方案。
          </p>

          <button
            onClick={() => startWithPrompt('我有一个现象想讨论，但还不确定如何研究。')}
            className="mt-6 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            开始空白对话
          </button>

          <h2 className="mt-8 text-xl font-semibold">示例主题</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {examples.map((item) => (
              <button
                key={item.label}
                onClick={() => startWithPrompt(item.prompt)}
                className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-left hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="font-medium">{item.label}</div>
                <div className="mt-1 text-sm text-slate-600">{item.prompt}</div>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (page === 'result') {
    return (
      <main className="min-h-screen p-6 md:p-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">
          <h1 className="text-2xl font-bold">最终研究方案草稿</h1>
          <pre className="mt-4 overflow-auto rounded-lg bg-slate-900 p-4 text-sm text-slate-100">{markdownDraft}</pre>
          <button onClick={() => setPage('home')} className="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-white">
            返回首页
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl bg-white p-4 shadow md:p-6">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h2 className="text-xl font-semibold">导师对话</h2>
              <p className="text-sm text-slate-600">当前阶段：{currentStage}（{stageIndex + 1}/{stages.length}）</p>
            </div>
            <button onClick={() => setPage('home')} className="rounded-md border px-3 py-1 text-sm">
              返回首页
            </button>
          </div>

          <div className="mt-4">
            <div className="h-2 w-full rounded-full bg-slate-200">
              <div className="h-2 rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {stages.map((stage, idx) => (
                <span
                  key={stage}
                  className={`rounded-full px-2 py-0.5 text-xs ${idx <= stageIndex ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-500'}`}
                >
                  {stage}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 h-[48vh] space-y-3 overflow-y-auto pr-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.role === 'mentor' ? 'mr-10 rounded-xl bg-blue-50 p-3' : 'ml-10 rounded-xl bg-slate-100 p-3'}>
                <p className="text-xs text-slate-500">{msg.role === 'mentor' ? '导师' : '你'}</p>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入你这一轮的回答..."
              className="flex-1 rounded-lg border px-3 py-2"
            />
            <button onClick={handleSend} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              发送
            </button>
            <button onClick={() => setPage('result')} className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
              查看结果
            </button>
          </div>
        </section>

        <aside className="rounded-2xl bg-white p-4 shadow md:p-6">
          <h2 className="text-lg font-semibold">动态研究方案草稿</h2>
          <pre className="mt-3 h-[65vh] overflow-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-100">{markdownDraft}</pre>
        </aside>
      </div>
    </main>
  );
}

export default App;
