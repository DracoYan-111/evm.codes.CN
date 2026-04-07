import fs from 'fs'
import path from 'path'

import React, { useContext, useEffect } from 'react'

import matter from 'gray-matter'
import type { NextPage } from 'next'
import getConfig from 'next/config'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { serialize } from 'next-mdx-remote/serialize'
import { IItemDocs, IGasDocs, IDocMeta } from 'types'

import { EthereumContext } from 'context/ethereumContext'

import ContributeBox from 'components/ContributeBox'
import HomeLayout from 'components/layouts/Home'
import ReferenceTable from 'components/Reference'
import { H1, H2, Container, RelativeLink as Link } from 'components/ui'

const { serverRuntimeConfig } = getConfig()

// It seems the memory expansion computation and constants did not change since frontier, but we have to keep an eye on new fork to keep this up to date
const PrecompiledPage = ({
  precompiledDocs,
  gasDocs,
}: {
  precompiledDocs: IItemDocs
  gasDocs: IGasDocs
}) => {
  const { precompiled, onForkChange, areForksLoaded } =
    useContext(EthereumContext)

  // Change selectedFork according to query param
  const router = useRouter()

  useEffect(() => {
    const query = router.query

    if ('fork' in query) {
      onForkChange(query.fork as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, areForksLoaded])

  return (
    <>
      <React.Fragment>
        <Head>
          <title> EVM Codes - Precompiled Contracts </title>
          <meta
            name="description"
            content="EVM Codes offers a reference of precompiled contracts - complex
          client-side functions bundled with the Ethereum Virtual Machine for
          efficiency."
          />
        </Head>
      </React.Fragment>
      <Container className="text-sm leading-6">
        <H1>预编译合约</H1>

        <H2 className="mb-4">介绍</H2>
        <p className="pb-6">
          除了有一组操作码可供选择之外，EVM 还提供
          通过预编译合约提供一组更高级的功能。 这些是一种特殊的合约，与 EVM
          捆绑在一起 固定地址，并且可以用确定的 Gas 成本进行调用。的 地址从 1
          开始，每个合约递增。新的硬分叉
          可能会引入新的预编译合约。他们被称为来自
          操作码类似于常规合约，指令类似于 <Link to="#F1" title="CALL" />
          。这里所说的gas费用纯粹是 合约费用，不考虑通话费用
          本身或将参数放入内存的指令。的 预编译合约也可在{' '}
          <Link to="playground" title="playground" />。
        </p>
        <p className="pb-6">
          对于所有预编译合约，如果输入比预期短， 假定最后实际上用零填充。如果
          输入比预期长，末尾的多余字节将被忽略。
        </p>
        <p className="pb-6">
          硬分叉<b>柏林</b>后，所有预编译合约 地址始终被认为是温暖的。请参阅{' '}
          部分
          <Link to="about" title="access sets" />.
        </p>
      </Container>

      <section className="py-10 md:py-20 bg-gray-50 dark:bg-black-700">
        <Container>
          <ReferenceTable
            isPrecompiled
            reference={precompiled}
            itemDocs={precompiledDocs}
            gasDocs={gasDocs}
          />
        </Container>
      </section>

      <section className="pt-20 pb-10 text-center">
        <ContributeBox />
      </section>
    </>
  )
}

PrecompiledPage.getLayout = function getLayout(page: NextPage) {
  return <HomeLayout>{page}</HomeLayout>
}

export const getStaticProps = async () => {
  const docsPath = path.join(serverRuntimeConfig.APP_ROOT, 'docs/precompiled')
  const docs = fs.readdirSync(docsPath)

  const precompiledDocs: IItemDocs = {}
  const gasDocs: IGasDocs = {}

  await Promise.all(
    docs.map(async (doc) => {
      const stat = fs.statSync(path.join(docsPath, doc))
      const address = path.parse(doc).name.toLowerCase()

      try {
        if (stat?.isDirectory()) {
          fs.readdirSync(path.join(docsPath, doc)).map((fileName) => {
            const markdown = fs.readFileSync(
              path.join(docsPath, doc, fileName),
              'utf-8',
            )
            const forkName = path.parse(fileName).name
            if (!(address in gasDocs)) {
              gasDocs[address] = {}
            }
            gasDocs[address][forkName] = markdown
          })
        } else {
          const markdownWithMeta = fs.readFileSync(
            path.join(docsPath, doc),
            'utf-8',
          )
          const { data, content } = matter(markdownWithMeta)
          const meta = data as IDocMeta
          const mdxSource = await serialize(content)

          precompiledDocs[address] = {
            meta,
            mdxSource,
          }
        }
      } catch (error) {
        console.debug("Couldn't read the Markdown doc for the opcode", error)
      }
    }),
  )
  return {
    props: {
      precompiledDocs,
      gasDocs,
    },
  }
}

export default PrecompiledPage
