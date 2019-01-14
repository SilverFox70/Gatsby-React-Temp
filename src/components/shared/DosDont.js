import React from 'react'
import styled from 'react-emotion'
import colors from '@ibmduo/colors'

import { breakpointsREM } from '../../globals'

import Margin from '../shared/Margin'

const ImagePlaceholder = styled.img`
  box-sizing: border-box;
  width: 100%;
`

const SVGContainer = styled.div`
  grid-column: 1 / -1;
  margin-bottom: 2rem;

  svg {
    height: auto;
    width: 100%;
    display: block;
  }

  @media (min-width: ${breakpointsREM.md}) {
    grid-column: span 4;
  }
`

const SVGCaption = styled.p`
  color: ${colors.gray['80']};
  max-width: 20rem;
  width: calc(100% - 4rem);
  margin-bottom: 0;
`

const DosDont = props => {
  return (
    <div className={`ibm-grid ${props.className || ''}`}>
      <SVGContainer className="ibm-padding--horizontal">
        {props.dos}
        {props.dosTag && (
          <SVGCaption className="ibm-type-b ibm-type-short ibm-padding--top">
            {props.dosTag}
          </SVGCaption>
        )}
      </SVGContainer>
      <SVGContainer className="ibm-padding--horizontal">
        {props.donts}
        {props.dontsTag && (
          <SVGCaption className="ibm-type-b ibm-type-short ibm-padding--top">
            {props.dontsTag}
          </SVGCaption>
        )}
      </SVGContainer>
    </div>
  )
}

export default DosDont
