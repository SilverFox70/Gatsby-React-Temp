import React from 'react'
import styled from 'react-emotion'
import colors from '@ibmduo/colors'

const Container = styled.figure`
  margin: 0;
`

const Image = styled.img`
  width: 100%;
`

const Figcaption = styled.figcaption`
  color: ${colors['cool-gray'][80]};
`

const FigcaptionRow = styled.span`
  display: block;
  margin-bottom: 0;
`

const Figure = ({ src, alt, captionTitle, captionAuthor }) => {
  return (
    <Container className="ibm-padding--horizontal">
      <Image src={src} alt={alt} />
      <Figcaption className="ibm-padding--top">
        <FigcaptionRow className="ibm-type-a ibm-type-short">↑</FigcaptionRow>
        <FigcaptionRow className="ibm-type-italic ibm-type-a ibm-type-short">
          {captionTitle}
        </FigcaptionRow>
        <FigcaptionRow className="ibm-type-a ibm-type-short">
          {captionAuthor}
        </FigcaptionRow>
      </Figcaption>
    </Container>
  )
}

export default Figure
