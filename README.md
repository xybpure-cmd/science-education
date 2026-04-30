# Scientific Method Mentor（科学研究导师智能体）

一个面向高中及以上学习者的科研方法学习智能体：通过导师式对话，按科学研究流程一步步形成研究方案。

## 技术栈

- React + TypeScript + Vite
- Tailwind CSS（通过 CDN 引入）

## 当前功能

- 首页：产品介绍 + 三个示例主题
- 对话页：
  - 当前阶段显示
  - 阶段进度条
  - 导师式短句追问（每轮推进一个关键步骤）
- 右侧动态草稿：实时汇总 Markdown 研究方案
- 结果页：输出最终 Markdown 草稿

## 科研引导流程

1. 现象澄清
2. 问题收窄
3. 概念界定
4. 变量识别
5. 假设生成
6. 验证方案

## GitHub Pages 自动部署

已配置 GitHub Actions：
- `push` 到 `main` 后自动构建并部署到 GitHub Pages。
- Workflow 文件：`.github/workflows/deploy-pages.yml`
- 构建时会自动读取 Pages 的 `base_path`，避免仓库名路径导致的资源 404。

部署成功后，在线地址通常是：

- `https://<你的GitHub用户名>.github.io/science-education/`

如果你改了仓库名，地址中的最后一段会随之变化。
