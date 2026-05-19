# 八字命理 - 互动学习平台

> 一个基于 React + Tailwind CSS 构建的八字命理互动学习网页工具，将传统命理知识转化为可视化、可交互的现代化学习体验。

## 🌐 在线访问

- **生产环境**：http://你的服务器IP （部署在火山云服务器）
- **本地开发**：`npm run dev` → http://localhost:3001

## ✨ 功能特性

| 模块 | 功能 | 互动形式 |
|------|------|----------|
| **八字排盘** | 输入出生时间生成四柱八字 | 点击任意字查看五行/阴阳/十神 |
| **五行生克** | 探索五行相生相克关系 | 点击五行元素，动画展示关系线 |
| **十天干** | 10个天干详解 | 翻转卡片：属性 → 《滴天髓》/类象/喜忌 |
| **十二地支** | 地支藏干与合冲关系 | 圆形布局点击探索 |
| **十神关系** | 以日干为中心的十神网 | 选择日干，查看所有十神关系 |
| **身强身弱** | 三步判断法练习 | 分步骤引导：得令→得地→得势 |
| **神煞速查** | 天乙/天德/桃花/驿马等 | 输入八字信息即时查询 |
| **调候用神** | 寒暖燥湿调节查询 | 选择日干+月支显示用神 |
| **格局识别** | 八字格局学习+练习 | 速查表 + 互动选择题 |

## 🚀 技术栈

- **前端**：React 18 + Vite + Tailwind CSS + React Router
- **部署**：GitHub Actions → 火山云服务器 + Nginx
- **数据**：Excel课程资料导出JSON

## 🔄 CI/CD 工作流

```
git push origin main
    ↓
GitHub Actions 自动触发
    ↓
npm ci → npm run build
    ↓
SCP 上传到火山云服务器 /var/www/bazi
    ↓
重启 Nginx
    ↓
🎉 网站自动更新
```

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
bazi-learning-tool/
├── .github/workflows/    # GitHub Actions CI/CD 配置
├── src/
│   ├── components/       # 公共组件
│   ├── data/            # 课程数据 JSON
│   ├── pages/           # 各知识模块页面
│   ├── utils/           # 八字计算工具函数
│   └── App.jsx          # 主应用
├── dist/                # 构建输出（Git忽略）
└── deploy.sh            # 服务器部署脚本
```

## 📝 数据来源

- **Excel**：`八字命理课程知识点汇总.xlsx`（11个Sheet）
- **PDF**：18课课程资料提取文本
- **名人案例**：马云、郭晶晶、章子怡等

## 📄 License

个人学习项目
