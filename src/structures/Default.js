import React from 'react'
import styled from 'react-emotion'

import { breakpoints } from '../globals'

const Container = styled.div`
  @media (max-width: ${breakpoints.md - 1}px) {
    left: -6.25vw;
  }
`

export default ({ title, children }) => (
  <div className="ibm-col-group">
    <div className="ibm-col-sm-1 ibm-col-md-1 ibm-col-lg-3 ibm-col-group" />
    <Container className="ibm-col-sm-3 ibm-col-md-7 ibm-col-lg-12 ibm-col-group">
      <div className="ibm-height-sm-0 ibm-height-md-1 ibm-height-lg-2 ibm-col-full" />
      <h1 className="ibm-type-i">{title}</h1>
      <main className="ibm-col-group">{children()}</main>
    </Container>
    <div className="ibm-col-lg-1" />
  </div>
)
