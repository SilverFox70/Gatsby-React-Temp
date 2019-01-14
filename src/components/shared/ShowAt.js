/**
 * ShowAt
 *
 * A thin wrapper to apply showing rules per break point. Useful to wrap components in markdown and have them show in certain breakpoints.
 *
 * Usage:
 * <ShowAt md="true">{...children}</ShowAt>
 *
 * Use it:
 * - When doing page layout, specially in markdown
 *
 * Don't use it:
 * - Internally in components meant for reuse
 *
 * TODO
 * - explore if it would be beneficial to make it into a HOC which passes down styles to the child component.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'

import { breakpointsREM } from '../../globals'

const ShowAt = props => {
  const styles = css`
    display: ${props.sm ? 'block' : 'none'};
    @media (min-width: ${breakpointsREM.md}) {
      display: ${props.md ? 'block' : 'none'};
    }
    @media (min-width: ${breakpointsREM.lg}) {
      display: ${props.lg ? 'block' : 'none'};
    }
    @media (min-width: ${breakpointsREM.xl}) {
      display: ${props.max ? 'block' : 'none'};
    }
  `
  return (
    <div className={`${styles} ${props.className || ''}`}>{props.children}</div>
  )
}

//Markdown only allows to pass string props, but these are Boolean in disguise
ShowAt.propTypes = {
  sm: PropTypes.string,
  md: PropTypes.string,
  lg: PropTypes.string,
  max: PropTypes.string,
}

export default ShowAt
