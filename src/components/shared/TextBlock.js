import React from 'react'
import styled from 'react-emotion'

const Block = styled.div`
  grid-auto-rows: auto;
`

const Content = styled.div`
  grid-column: 1 / 9;
`

const TextBlock = ({ children }) => {
  return (
    <Block className="ibm-grid">
      <Content>{children}</Content>
    </Block>
  )
}

export default TextBlock
