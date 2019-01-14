import React from 'react'
import styled from 'react-emotion'

import { breakpoints } from '../../globals'

const Container = styled.div`
  margin: 0 -6.25vw;

  @media (min-width: ${breakpoints.md}px) {
    margin: 0 -28.125vw 0 -3.125vw;
  }

  @media (min-width: ${breakpoints.lg}px) {
    margin: 0 -25.75757vw 0 -1.51515vw;
  }

  @media (min-width: ${breakpoints.max}px) {
    margin: 0 -425px 0 -25.78125px;
  }
`

const ExtendGrid = () => {
  return <Container className="ibm-col-group">{this.props.children}</Container>
}

export default ExtendGrid
