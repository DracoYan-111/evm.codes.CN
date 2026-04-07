import React from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import HomeLayout from 'components/layouts/Home'
import { Container, H1, H2, H3, Icon, RelativeLink } from 'components/ui'
import { Pre } from 'components/ui/Doc'

type SectionWrapperProps = {
  header: React.ReactNode
  anchorKey: string
  children: React.ReactNode
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  header,
  anchorKey,
  children,
}) => {
  return (
    <>
      <React.Fragment>
        <Head>
          <title> EVM Codes - About the EVM </title>
        </Head>
        <meta
          property="og:description"
          content="How does the EVM work? We explain the relationship between opcode
          instructions, gas costs, storage and the execution environment for
          your understanding."
        />
      </React.Fragment>
      <div
        id={anchorKey}
        className="font-mono mb-4 justify-start relative items-center scroll-mt-14"
      >
        <Link legacyBehavior href={`/about#${anchorKey}`}>
          <a className="absolute -left-6">
            <Icon name="links-line" className="text-indigo-500" />
          </a>
        </Link>

        {header}
      </div>
      <div>{children}</div>
    </>
  )
}

// NOTE: It seems the memory expansion computation and constants did not change
// since frontier, but we have to keep an eye on new fork to keep this up to date
const AboutPage = () => {
  return (
    <Container className="text-sm leading-6 max-w-4xl">
      <H1>关于EVM</H1>

      <SectionWrapper header={<H2>介绍</H2>} anchorKey="introduction">
        <p className="pb-6">
          <H3>什么是以太坊虚拟机？</H3>
          以太坊虚拟机(或{' '}
          <a
            href="https://ethereum.org/en/developers/docs/evm/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            EVM
          </a>
          ) 是一个基于堆栈的计算机，负责执行智能 合同说明。所有 EVM
          指令的参数均来自 堆栈，但 <RelativeLink to="#60" title="PUSHx" />{' '}
          除外， 从代码中获取它们的参数。每条指令都有堆栈
          输入、它们可能需要的参数以及堆栈输出（它们的
          返回值）。这些指令及其操作码的列表是 可在我们的{' '}
          <RelativeLink title="reference" /> 中访问.
        </p>
        <p className="pb-8">
          <H3>什么是智能合约？</H3>智能合约是一组
          说明。每条指令都是一个操作码（有自己方便的操作码）
          供参考的助记符、其指定值的文本表示 0 到 255
          之间）。当EVM执行智能合约时，它会读取 并按顺序执行每条指令，除了{' '}
          <RelativeLink to="#56" title="JUMP" /> 和{' '}
          <RelativeLink to="#57" title="JUMPI" /> 说明。如果一个
          指令无法执行（例如，当气体不足或
          堆栈上没有足够的值），执行将恢复。交易 还可以使用 触发还原
          <RelativeLink to="#FD" title="REVERT" /> 操作码（退还 与所有的 Gas
          相比，其调用上下文中未使用的 Gas 费
          在所有其他恢复情况下都会被消耗）。如果发生
          恢复的交易，交易指示的任何状态更改 指令返回到事务之前的状态。
        </p>
      </SectionWrapper>

      <SectionWrapper header={<H2>执行环境</H2>} anchorKey="executionenv">
        <p className="pb-8">
          当 EVM 执行智能合约时，会为其创建一个上下文。
          该上下文由多个数据区域组成，每个数据区域都有不同的
          目的以及变量，例如程序计数器、 当前调用者、被调用者和当前代码的地址。
        </p>
      </SectionWrapper>

      <SectionWrapper header={<H3>代码</H3>} anchorKey="code">
        <p className="pb-8">
          代码是存储指令的区域。指令数据
          存储在代码中作为合约帐户状态的一部分是持久的 场。外部拥有的帐户（或
          EOA）具有空代码区域。 代码是 EVM 在执行期间读取、解释和执行的字节
          智能合约执行。代码是不可变的，这意味着它不能
          已修改，但可以按照说明读取 <RelativeLink to="#38" title="CODESIZE" />{' '}
          和 <RelativeLink to="#39" title="CODECOPY" />
          。一份合约的代码 可以被其他合约读取，带有说明{' '}
          <RelativeLink to="#3B" title="EXTCODESIZE" /> 和{' '}
          <RelativeLink to="#3C" title="EXTCODECOPY" />。
        </p>
      </SectionWrapper>

      <SectionWrapper header={<H3>程序计数器</H3>} anchorKey="counter">
        <p className="pb-8">
          程序计数器（PC）对存储在指令中的指令进行编码 接下来应该由 EVM
          读取代码。程序计数器通常是 增加一个字节，指向下面的指令，其中
          一些例外。例如， <RelativeLink to="#60" title="PUSHx" /> 指令比
          单字节，并导致 PC 跳过其参数。这{' '}
          <RelativeLink to="#56" title="JUMP" /> 指令不增加 PC
          的值，而是将程序计数器修改为一个位置 由堆栈顶部指定。{' '}
          <RelativeLink to="#57" title="JUMPI" /> 也可以这样做，如果它
          条件为真（非零代码值），否则，它增加 PC 和其他指令一样。
        </p>
      </SectionWrapper>

      <SectionWrapper header={<H3>The Stack</H3>} anchorKey="stack">
        <p className="pb-8">
          堆栈是一个32字节元素的列表，用于存储智能合约
          指令输入和输出。每次调用都会创建一个堆栈
          上下文，并且当调用上下文结束时它被销毁。当一个新的
          值被放入堆栈，它被放在顶部，并且只有顶部的值
          按说明使用。目前堆栈有最大限制 1024
          个值。所有指令都与堆栈交互，但它可以 可以通过像 这样的指令直接操作
          <RelativeLink to="#60" title="PUSH1" />,{' '}
          <RelativeLink to="#50" title="POP" />,{' '}
          <RelativeLink to="#80" title="DUP1" />, or{' '}
          <RelativeLink to="#90" title="SWAP1" />.
        </p>
      </SectionWrapper>

      <SectionWrapper header={<H3>The Memory</H3>} anchorKey="memory">
        <p className="pb-8">
          EVM内存不是持久的，并且在调用结束时被销毁
          上下文。在调用上下文开始时，内存被初始化为 0。
          从内存中读取和写入通常使用 <RelativeLink to="#51" title="MLOAD" /> 和{' '}
          <RelativeLink to="#52" title="MSTORE" /> 分别说明，
          但也可以通过其他指令访问，例如{' '}
          <RelativeLink to="#F0" title="CREATE" /> 或{' '}
          <RelativeLink to="#F3" title="EXTCODECOPY" />
          。我们讨论{' '}
          <RelativeLink
            to="about#memoryexpansion"
            title="memory size calculations"
          />{' '}
          稍后将在本文档中介绍。
        </p>
      </SectionWrapper>

      <SectionWrapper header={<H3>The Storage</H3>} anchorKey="storage">
        <p className="pb-8">
          存储是 32 字节槽到 32 字节值的映射。存储是
          智能合约的持久内存：由智能合约写入的每个值
          合约在调用完成后仍保留，除非其价值 更改为 0，或者{' '}
          <RelativeLink to="#FF" title="SELFDESTRUCT" />{' '}
          指令被执行。从未写入的密钥中读取存储的字节
          也返回0。每个合约都有自己的存储，不能读取或
          修改另一个合约的存储。存储的读取和写入使用 说明{' '}
          <RelativeLink to="#54" title="SLOAD" /> 和{' '}
          <RelativeLink to="#55" title="SSTORE" />。
        </p>
      </SectionWrapper>

      <SectionWrapper header={<H3>The calldata</H3>} anchorKey="calldata">
        <p className="pb-8">
          calldata 区域是作为交易的一部分发送到事务的数据
          智能合约交易。例如，在创建合同时， calldata
          将是新合约的构造函数代码。呼叫数据 是不可变的，可以通过指令读取{' '}
          <RelativeLink to="#35" title="CALLDATALOAD" />,{' '}
          <RelativeLink to="#36" title="CALLDATASIZE" />
          ，以及 <RelativeLink to="#37" title="CALLDATACOPY" />
          。重要的是 请注意，当合约执行 xCALL 指令时，它还会
          创建内部事务。结果，当执行xCALL时， 新上下文中有一个 calldata 区域。
        </p>
      </SectionWrapper>

      <SectionWrapper header={<H3>返回数据</H3>} anchorKey="returndata">
        <p className="pb-8">
          返回数据是智能合约在执行后返回值的方式 打电话。可以通过合约调用通过{' '}
          来设置
          <RelativeLink to="#F3" title="RETURN" /> 和{' '}
          <RelativeLink to="#FD" title="REVERT" /> 说明，可阅读 通过与{' '}
          的调用合约
          <RelativeLink to="#3D" title="RETURNDATASIZE" /> 和{' '}
          <RelativeLink to="#3E" title="RETURNDATACOPY" />。
        </p>
      </SectionWrapper>

      <SectionWrapper header={<H2>GAS 成本</H2>} anchorKey="gascosts">
        <p className="pb-4">
          以太坊区块链上的每笔交易均由第三方审核
          验证器，在添加到区块链之前。这些验证器是 补偿进行此审查过程，并添加
          交易到区块链，并支付奖励费。费用各异
          从一笔交易到另一笔交易，取决于不同的变量 不同的
          fork。计算费用时的一些变量包括：
          <ul className="list-disc mb-2">
            <br></br>
            <li>
              <b>一个天然气单位的当前价格：</b>天然气，或gwei，是一种
              以太坊的面额，用于费用支付。天然气价格各不相同
              随着时间的推移，根据当前对块空间的需求，测量 每气体 ETH 。
            </li>
            <br></br>
            <li>
              <b>Calldata 大小：</b> 每个 calldata 字节都会消耗 Gas，越大
              交易数据规模越大，gas 费用越高。呼叫数据 每个字节花费 4 个 Gas
              等于 0，其他字节花费 16 个 Gas（64 在伊斯坦布尔硬分叉之前）。
            </li>
            <br></br>
            <li>
              {' '}
              <b>内在气体</b>：每笔交易的内在成本为
              21000汽油。创建一份合约需要花费 32000 天然气
              交易成本。再次强调：calldata 每字节花费 4 个 Gas，等于 0， 以及 16
              个 Gas 给其他人（硬分叉 <b>伊斯坦布尔</b> 之前为 64 个）
              ）。该费用是在任何操作码或之前的交易中支付的 转移执行。
            </li>
            <br></br>
            <li>
              <b>操作码固定执行成本</b>：每个操作码都有固定成本
              执行时支付，以天然气计量。这个费用是一样的
              对于所有执行，尽管这可能会在新版本中发生变化 硬分叉。请参阅我们的{' '}
              <a
                href="https://www.evm.codes/"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                参考
              </a>
              {''}
              了解每个操作码和分叉的具体成本。
            </li>
            <br></br>
            <li>
              {''}
              <b>操作码动态执行成本：</b>一些指令执行
              比其他人做更多的工作，具体取决于他们的参数。因为
              除了固定成本之外，一些指令还具有动态成本。
              这些动态成本取决于几个因素（各因素各不相同）
              从硬分叉到硬分叉）。请参阅我们的{' '}
              <a
                href="https://www.evm.codes/"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                参考
              </a>
              {''}
              了解每个操作码和分叉的具体计算。
            </li>
          </ul>
        </p>
        <p className="pb-8">
          要完整估算您的程序的 Gas 成本，请使用
          您的编译器选项以及特定状态和输入，请使用类似 的工具
          <a
            href="https://remix.ethereum.org/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Remix
          </a>{' '}
          或{' '}
          <a
            href="https://trufflesuite.com/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Truffle
          </a>
          。
        </p>
      </SectionWrapper>
      <SectionWrapper header={<H3>内存扩展</H3>} anchorKey="memoryexpansion">
        <p className="pb-6">
          在智能合约执行期间，可以通过以下方式访问内存
          操作码。当第一次访问偏移量时（读或写），
          内存可能会触发扩展，这会消耗gas。
        </p>
        <p className="pb-6">
          当字节偏移（模32）时可能会触发内存扩展
          访问的偏移量大于之前的偏移量。如果较大的偏移触发
          发生内存扩展时，访问较高偏移量的成本为 计算并从当前调用可用的总 Gas
          中删除 上下文。
        </p>

        <p className="pb-4">
          <p className="pb-4">给定内存大小的总成本计算如下：</p>
          <Pre>
            <code>
              memory_size_word = (memory_byte_size + 31) / 32
              <br />
              memory_cost = (memory_size_word ** 2) / 512 + (3 *
              memory_size_word)
            </code>
          </Pre>
        </p>

        <p className="pb-4">
          <p className="pb-4">
            当内存扩展被触发时，只有额外的字节
            记忆必须付出代价。因此，内存扩展的成本为 具体的操作码是：
          </p>
          <Pre>
            <code>
              memory_expansion_cost = new_memory_cost - last_memory_cost
            </code>
          </Pre>
        </p>

        <p className="pb-8">
          <code>memory_byte_size</code> 可以通过 opcode 获取
          <RelativeLink to="#59" title="MSIZE" />
          。内存扩展的成本 由 <RelativeLink to="#59" title="MSIZE" /> 触发增长
          二次方，通过提高内存的利用率来抑制内存的过度使用
          抵消成本更高。任何访问内存的操作码都可能触发 扩展（例如{' '}
          <RelativeLink to="#51" title="MLOAD" />,{' '}
          <RelativeLink to="#F3" title="RETURN" /> 或{' '}
          <RelativeLink to="#37" title="CALLDATACOPY" />
          ）。使用我们的 <RelativeLink title="reference" /> 查看哪个操作码
          能够访问内存。请注意，具有字节大小的操作码
          参数为0不会触发内存扩展，无论它们如何 偏移参数。
        </p>
      </SectionWrapper>

      <SectionWrapper header={<H3>访问列表</H3>} anchorKey="access_list">
        <p className="pb-6">
          访问列表是按外部事务定义的，而不是按调用定义的。
          每个交易可以由其发送者的某种组合来定义，
          呼叫数据或被呼叫者。交易可以是外部的，也可以是内部的。
          外部交易被发送到以太坊网络。内部 事务由已执行的外部事务触发 xCALL
          指令。因此，内部交易也被称为
          作为调用。访问列表可以被认为是两种独立的类型
          列表：涉及的地址和涉及的合约的列表 存储槽。
        </p>
        <p className="pb-6">
          当地址被事务、指令访问或用作
          调用者或被调用者，它被放入访问列表中。调用操作码{' '}
          <RelativeLink to="#31" title="BALANCE" />
          ，地址不存在 访问列表中的成本比地址已存在于访问列表中的成本更高
          列表。其他可以修改访问列表的操作码包括{' '}
          <RelativeLink to="#3B" title="EXTCODESIZE" />,{' '}
          <RelativeLink to="#3C" title="EXTCODECOPY" />,{' '}
          <RelativeLink to="#3F" title="EXTCODEHASH" />,{' '}
          <RelativeLink to="#F1" title="CALL" />,{' '}
          <RelativeLink to="#F2" title="CALLCODE" />,{' '}
          <RelativeLink to="#F4" title="DELEGATECALL" />,{' '}
          <RelativeLink to="#FA" title="STATICCALL" />,{' '}
          <RelativeLink to="#F0" title="CREATE" />,{' '}
          <RelativeLink to="#F5" title="CREATE2" /> 和{' '}
          <RelativeLink to="#FF" title="SELFDESTRUCT" />
          。每个操作码都有其 修改访问集时的自身成本。
        </p>
        <p className="pb-6">
          触摸槽列表是合约访问的存储槽键的列表
          地址。槽列表初始化为空。当一个操作码
          访问列表中不存在的插槽，会将其添加到列表中。
          可以修改触摸槽列表的操作码是 <RelativeLink to="#54" title="SLOAD" />{' '}
          和 <RelativeLink to="#55" title="SSTORE" />
          。同样，两个操作码都有 修改访问列表时自己的成本。
        </p>
        <p className="pb-6">
          如果集合中存在地址或存储槽，则称为
          '温暖'；否则就是“冷”。触摸的存储插槽 交易期间第一次从冷状态变为热状态
          交易的。交易可以预先指定合约为温合约 使用 EIP-2930
          访问列表。某些操作码的动态成本取决于 地址或插槽是热的还是冷的。
        </p>
        <p className="pb-8">
          在交易执行开始时，所触及的地址设置 被初始化为包括以下地址，因此
          永远“温暖”：
          <ul className="list-disc mb-2">
            <br></br>
            <li>
              <b>柏林</b>硬分叉之后：所有预编译合约 地址以及 <b>tx.sender</b> 和{' '}
              <b>tx.to</b> （或 如果是合约创建交易，则创建地址）。
            </li>
            <br></br>
            <li>
              <b>上海</b>硬分叉之后： <RelativeLink to="#41" title="COINBASE" />{' '}
              地址。
            </li>
          </ul>
        </p>
        <p className="pb-6">
          如果上下文恢复，访问变暖效应将恢复到原来的状态 在上下文之前声明。
        </p>
      </SectionWrapper>

      <SectionWrapper header={<H3>Gas 退款</H3>} anchorKey="gasrefunds">
        <p className="pb-8">
          一些操作码可以触发 Gas 退款，从而降低了 Gas 成本 交易。 Gas
          退款在交易结束时应用。如果一个 交易没有足够的 Gas 来达到其运行结束，其
          Gas 无法触发退款，交易失败。随着 引入<b>伦敦</b>
          硬分叉，gas退款的两个方面 改变了。一、降低gas退款限额
          从总交易成本的一半到总交易成本的五分之一 交易成本。其次，{' '}
          <RelativeLink to="#FF" title="SELFDESTRUCT" /> 操作码无法触发
          天然气退款，仅限 <RelativeLink to="#55" title="SSTORE" />。
        </p>
      </SectionWrapper>

      <SectionWrapper
        header={<H2>其他 EVM 相关资源</H2>}
        anchorKey="otherevmresources"
      >
        <p className="pb-8">
          <a
            href="https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            以太坊 EVM 图解 (2018)
          </a>
          <br></br>{' '}
          <a
            href="https://ethereum.org/en/history/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            以太坊的历史和分叉
          </a>
          <br></br>{' '}
          <a
            href="https://www.youtube.com/watch?v=RxL_1AfV7N4&t=1s"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            EVM：从 Solidity 到字节码、内存和存储
          </a>
          <br></br>{' '}
          <a
            href="https://noxx.substack.com/p/evm-deep-dives-the-path-to-shadowy"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            noxx 深入探讨 EVM
          </a>
          <br></br>{' '}
          <a
            href="https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            《掌握以太坊》一书中的 EVM 章节
          </a>
          <br></br>{' '}
          <a
            href="https://x.com/uttam_singhk/status/1830526179105001771"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            EOF（EVM 对象格式）：完整指南
          </a>
        </p>

        <em>
          <p>
            致谢{' '}
            <a
              href="https://github.com/wolflo/evm-opcodes"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              沃尔夫洛
            </a>{' '}
            查看成本说明。{' '}
          </p>
          <p>
            检查{' '}
            <a
              href="https://blog.smlxl.io/"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              我们的博客
            </a>{' '}
            有关 EVM 和其他区块链概念的更多文章。
          </p>
        </em>
      </SectionWrapper>
    </Container>
  )
}

AboutPage.getLayout = function getLayout(page: NextPage) {
  return <HomeLayout>{page}</HomeLayout>
}

export default AboutPage
