# Scientific Method Mentor（科学研究导师智能体）

一个面向高中及以上学习者的 MVP Web 应用：通过导师式对话，按科学研究流程一步步形成研究方案。

## 技术栈

- React + TypeScript + Vite
- Tailwind CSS（通过 CDN 引入）

## 功能（MVP）

- 首页：产品介绍 + 三个示例主题
- 对话页：显示当前研究阶段，逐步推进流程
- 右侧动态草稿：实时汇总为 Markdown 研究方案
- 结果页：输出最终 Markdown 研究方案草稿

## 研究流程

1. 现象澄清
2. 问题收窄
3. 概念界定
4. 变量识别
5. 假设生成
6. 验证方案

## 本地运行

```bash
npm install
npm run dev
```

打开终端提示的本地地址（通常是 `http://localhost:5173`）。

## 构建预览

```bash
npm run build
npm run preview
```
