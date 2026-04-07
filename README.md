<p align="center">
  <h1 align="center">EVM.Codes</h1>
</p>
<p align="center">
  <strong><i>以太坊虚拟机（EVM）操作码的交互式参考指南</i></strong>
  <img width="1408" alt="screenshot" src="https://user-images.githubusercontent.com/5113/142245431-08ad9922-9115-43fd-9572-8b33cde75bb0.png">
</p>

这是运行 [evm.codes](https://evm.codes) 网络应用程序的源代码。您可以在下面找到有关如何为项目做出贡献并在本地运行它以进行进一步开发的文档。

evm.codes 由 [Dune](https://dune.com/home) 为您提供，由 [EthereumJS](https://github.com/ethereumjs/ethereumjs-monorepo)、[SolcJS](https://github.com/ethereum/solc-js) 及其它 [许多开源项目](package.json) 提供技术支持。

## ⚙️ 安装

该应用程序需要以下依赖项：

- [NodeJS](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/)

## 👩‍💻 本地开发

为该项目做贡献，您可以按照以下步骤快速启动和运行应用程序：

克隆此仓库：

    git clone git@github.com:duneanalytics/evm.codes.git

安装依赖项：

    pnpm install

如果您想运行合约浏览器，请在 `.env.local` 中指定环境变量：

    APIKEY_ETHERSCAN=

启动应用程序并访问 <http://localhost:3000> 查看运行效果：

    pnpm dev

## 🚀 部署

只要您的 PR 被合并到 `main` 分支，部署就会由 [Vercel](https://vercel.com/) 自动处理。

## 🤗 参与贡献

evm.codes 由一个小团队构建和维护，因此我们非常欢迎你的帮助来修复 Bug、添加新功能和改进，或更新 EVM [参考文档](docs/opcodes)。

在提交拉取请求（Pull Request）之前，请确保没有现成的 [GitHub issue](https://github.com/duneanalytics/evm.codes/issues)。如果没有，请先创建一个 issue，探讨解决该问题的最佳方法，并听取团队的一些反馈意见。

准备提交拉取请求时，请以 `chore:`（小改进和定期维护）、`fix:`（Bug 和热修复）或 `feat:`（新功能）开头，以帮助我们直接从 Git 历史记录中找到该问题的类型。

### 编码规范

项目已预先配置了 [Eslint](.eslintrc.js)、[TypeScript](tsconfig.json) 和 [Prettier](.prettierrc)。以下是一些有用的命令，可以确保您的更改符合项目的编码规范：

检查并修复任何代码规范问题：

    pnpm lint --fix

检查任何 TypeScript 类型问题：

    pnpm typecheck

对 `package.json` 进行排序：

    pnpm lint:package

## 架构

如果您想做出贡献，请务必查看 [架构文档](docs/ARCHITECTURE.md)，以了解代码结构和应用程序的构建方式。

## 许可证

[MIT](LICENSE)
