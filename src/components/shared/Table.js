import React from 'react'
import styled from 'react-emotion'
import colors from '@ibmduo/colors'

import { breakpointsREM } from '../../globals/'

const Container = styled.div`
  grid-auto-rows: auto;
  overflow-x: auto;
`

const TableElement = styled.table`
  grid-row: 1/1;
  grid-template-columns: auto 1fr;
  grid-column: 1 / -1;

  border-spacing: 0;
  color: ${colors.gray[90]};
  text-align: left;
  width: 100%;

  th {
    background: ${colors.gray[20]};
    vertical-align: top;
  }

  @media (min-width: ${breakpointsREM.md}) {
    grid-column: ${props => (props.columnMd ? props.columnMd : '1 / -1')};
    table-layout: fixed;
  }

  @media (min-width: ${breakpointsREM.lg}) {
    grid-column: ${props => (props.columnLg ? props.columnLg : '1 / -1')};
  }

  @media (min-width: ${breakpointsREM.max}) {
    grid-column: ${props => (props.columnXl ? props.columnXl : '1 / -1')};
  }
`

const Thead = styled.thead`
  background: ${colors.gray[20]};
`

const Td = styled.td`
  border-bottom: 1px solid ${colors.gray[20]};
  white-space: nowrap;
`

const Table = ({ th, td, columnMd, columnLg, columnXl }) => {
  return (
    <Container className="ibm-grid">
      <TableElement columnMd={columnMd} columnLg={columnLg} columnXl={columnXl}>
        <Thead>
          <tr>
            {th.map((head, index) => (
              <th
                key={index}
                className="ibm-padding--left ibm-padding--vertical ibm-type-b ibm-type-semibold"
              >
                {head}
              </th>
            ))}
          </tr>
        </Thead>
        <tbody>
          {td.map((data, index) => (
            <tr key={index}>
              {data.map((value, index) => (
                <Td
                  key={index}
                  className="ibm-padding--left ibm-padding--vertical ibm-type-b"
                >
                  {value}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableElement>
    </Container>
  )
}

export default Table
