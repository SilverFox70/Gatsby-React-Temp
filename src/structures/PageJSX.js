import React from 'react'
import styled from 'react-emotion'
import { breakpointsREM } from '../globals'

import Hero from '../components/shared/Hero'
import navDimensions from '../components/navigation/NavDimensions'

const Main = styled.main`
  grid-template-rows: auto;
  margin-top: ${navDimensions.triggerSize}rem;

  @media (min-width: ${breakpointsREM.lg}) {
    margin-top: 0;
  }
`

const Container = styled.section`
  grid-column: 1 / -1;
`

export default ({ children }) => {
  return (
    <Main className="ibm-grid">
      <Container>{children()}</Container>
    </Main>
  )
}
