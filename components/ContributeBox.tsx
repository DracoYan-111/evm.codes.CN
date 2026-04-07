import React from 'react'

import { GITHUB_REPO_URL } from 'util/constants'

import { H2, Container, Button } from 'components/ui'

const ContributeBox = () => {
  return (
    <Container>
      <H2 className="mb-10">有让 evm.codes.cn 变得更好的想法吗？</H2>
      <Button external href={GITHUB_REPO_URL}>
        在 GitHub 上做出贡献
      </Button>
    </Container>
  )
}

export default ContributeBox
