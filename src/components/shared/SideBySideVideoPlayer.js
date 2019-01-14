import React from 'react'
import styled from 'react-emotion'

import { breakpointsREM } from '../../globals'

import VideoPlayer from '../shared/VideoPlayer'

const Row = styled.div`
  grid-column: 1 / -1;
  grid-template-rows: auto;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`

const Column = styled.div`
  grid-column: 1 / -1;

  @media (min-width: ${breakpointsREM.md}) {
    grid-column: span 4;
  }

  @media (min-width: ${breakpointsREM.lg}) {
    grid-column: span 6;
  }
`

const CaptionHeading = styled.h4`
  grid-column: span 4;
  margin-bottom: 0;
`

const CaptionParagraph = styled.p`
  grid-column: span 4;
`

const SideBySideVideoPlayer = props => {
  return (
    <Row className="ibm-grid">
      <Column>
        <VideoPlayer video={props.leftVideo} />
        <div className="ibm-grid ibm-padding--top">
          <CaptionHeading className="ibm-type-b ibm-type-semibold ibm-padding--horizontal">
            {props.leftHeading}
          </CaptionHeading>
          <CaptionParagraph className="ibm-type-b ibm-padding--horizontal">
            {props.leftParagraph}
          </CaptionParagraph>
        </div>
      </Column>
      <Column>
        <VideoPlayer video={props.rightVideo} />
        <div className="ibm-grid ibm-padding--top">
          <CaptionHeading className="ibm-type-b ibm-type-semibold ibm-padding--horizontal">
            {props.rightHeading}
          </CaptionHeading>
          <CaptionParagraph className="ibm-type-b ibm-padding--horizontal">
            {props.rightParagraph}
          </CaptionParagraph>
        </div>
      </Column>
    </Row>
  )
}

export default SideBySideVideoPlayer
