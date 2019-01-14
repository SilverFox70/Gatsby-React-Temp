// Margin
//
// A layout component for setting the distance between components with margins,
// so that components don't have to handle margins themselves and thus can
// be reused in more different contexts.
//
// Use it:
// - When doing page layouts
//
// Don't use it:
// - Internally in components meant for reuse
//
// Is mobile first and supports responsive margins via *Md, *Lg and *Xl props.
//
// Only the rem unit is supported in order to enforce that standard.
//
// TODO
// - explore if it would be beneficial to make it into a HOC which
//   passes down styles to the child component.
// - Add support for the shorthand margin="" prop
// - Support unitless 0 value
// - Enforce the mini unit in the prop validator?

import React from 'react'
import styled, { css } from 'react-emotion'

import { breakpointsREM } from '../../globals'

import PropTypes from 'prop-types'

const Margin = props => {
  const styles = css`
    margin-top: ${props.marginTop || props.margintop};
    margin-bottom: ${props.marginBottom || props.marginbottom};
    margin-left: ${props.marginLeft || props.marginleft};
    margin-right: ${props.marginRight || props.marginright};
    @media (min-width: ${breakpointsREM.md}) {
      margin-top: ${props.marginTopMd || props.margintopmd};
      margin-bottom: ${props.marginBottomMd || props.marginbottommd};
      margin-left: ${props.marginLeftMd || props.marginleftmd};
      margin-right: ${props.marginRightMd || props.marginrightmd};
    }
    @media (min-width: ${breakpointsREM.lg}) {
      margin-top: ${props.marginTopLg || props.margintoplg};
      margin-bottom: ${props.marginBottomLg || props.marginbottomlg};
      margin-left: ${props.marginLeftLg || props.marginleftlg};
      margin-right: ${props.marginRightLg || props.marginrightlg};
    }
    @media (min-width: ${breakpointsREM.xl}) {
      margin-top: ${props.marginTopXl || props.margintopxl};
      margin-bottom: ${props.marginBottomXl || props.marginbottomxl};
      margin-left: ${props.marginLeftXl || props.marginleftxl};
      margin-right: ${props.marginRightXl || props.marginrightxl};
    }
  `

  return <div className={`${styles} ${props.className}`}>{props.children}</div>
}

const remValidator = (props, propName, componentName) => {
  if (props[propName] && !/.*rem/.test(props[propName])) {
    return new Error(
      'Invalid prop `' +
        propName +
        '` supplied to' +
        ' `' +
        componentName +
        '`. Validation failed.'
    )
  }
}

Margin.propTypes = {
  marginTop: remValidator,
  marginBottom: remValidator,
  marginLeft: remValidator,
  marginRight: remValidator,
  marginTopMd: remValidator,
  marginBottomMd: remValidator,
  marginLeftMd: remValidator,
  marginRightMd: remValidator,
  marginTopLg: remValidator,
  marginBottomLg: remValidator,
  marginLeftLg: remValidator,
  marginRightLg: remValidator,
  marginTopXl: remValidator,
  marginBottomXl: remValidator,
  marginLeftXl: remValidator,
  marginRightXl: remValidator,
}

export default Margin
