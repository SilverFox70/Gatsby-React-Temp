import React from 'react'
import styled from 'react-emotion'

import { breakpointsREM } from '../../globals'

const Container = styled.div`
  grid-template-rows: auto auto;

  &.second-row {
    @media (min-width: ${breakpointsREM.md}) {
      margin-top: 2rem;
    }
  }
`

const Image = styled.img`
  width: 100%;
`

const Block1 = styled.div`
  grid-column: 1 / -1;
  text-align: center;

  @media (max-width: ${breakpointsREM.md}) {
    padding: 0.5rem 1rem;
  }

  @media (min-width: ${breakpointsREM.md}) {
    grid-column: 1 / 4;
  }

  @media (min-width: ${breakpointsREM.lg}) {
    grid-column: 1 / 5;
  }
`

const Block2 = styled.div`
  grid-column: 1 / -1;
  text-align: center;

  @media (max-width: ${breakpointsREM.md}) {
    padding: 1rem;
  }

  @media (min-width: ${breakpointsREM.md}) {
    grid-column: 4 / 7;
  }

  @media (min-width: ${breakpointsREM.lg}) {
    grid-column: 5 / 9;
  }
`

class ImgPair extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container
        className={`ibm-grid ${this.props.secondRow ? 'second-row' : ''}`}
      >
        <Block1 className="ibm-padding--right">
          {<this.props.left />}
        </Block1>
        <Block2 className="ibm-padding--left">
          {<this.props.right />}
        </Block2>
      </Container>
    )
  }
}

export default ImgPair
