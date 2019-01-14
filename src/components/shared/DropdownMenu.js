import React from 'react'
import styled from 'react-emotion'
import colors from '@ibmduo/colors'

import { zIndexConfig } from '../../globals'

import Chevron from '@ibmduo/icons/svg/chevron--down-16px.svg'

const Container = styled.div`
  width: 100%;
  position: relative;
  z-index: ${zIndexConfig.absoluteComponentLayer};
`

const MenuTrigger = styled.button`
  align-items: center;
  background-color: ${colors.white[0]};
  border: none;
  border-bottom: 1px solid ${colors.gray[20]};
  cursor: pointer;
  display: flex;
  height: 3rem;
  justify-content: space-between;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${colors.gray[20]};
  }

  &:active {
    color: ${colors.gray[100]};
  }
`

const MenuItemsContainer = styled.div`
  position: relative;
`

const MenuItems = styled.ul`
  background: ${colors.white[0]};
  display: ${props => (props.open ? 'block' : 'none')};
  list-style: none;
  margin-top: 0;
  padding-left: 0;
  position: absolute;
  width: 100%;
`

const MenuItem = styled.li`
  width: 100%;
  height: 3rem;
`

const MenuButton = styled.button`
  background-color: ${props =>
    props.selected ? colors.gray[100] : colors.white[0]};
  border: none;
  color: ${props => (props.selected ? colors.gray[20] : colors.gray[100])};
  cursor: ${props => (props.selected ? 'default' : 'pointer')};
  height: 100%;
  width: 100%;
  text-align: left;

  &:hover {
    background-color: ${props =>
      props.selected ? colors.gray[100] : colors.gray[20]};
    color: ${props => (props.selected ? colors.gray[20] : colors.gray[100])};
  }
`

class DropdownMenu extends React.Component {
  state = {
    open: false,
    selected: this.props.content[0].label,
  }

  constructor(props) {
    super(props)

    this.toggleMenu = this.toggleMenu.bind(this)
    this.updateSelection = this.updateSelection.bind(this)
  }

  toggleMenu() {
    this.setState({ open: !this.state.open })
  }

  updateSelection = (label, value) => {
    this.setState({ selected: label, open: false })
    this.props.onChange(label, value)
  }

  render() {
    return (
      <Container>
        <MenuTrigger
          className="ibm-padding--horizontal"
          onClick={this.toggleMenu}
        >
          <span className="ibm-type-b" style={{ marginBottom: 0 }}>
            {this.state.selected}
          </span>
          <Chevron
            style={{ transform: this.state.open ? 'rotate(-180deg)' : 'none' }}
          />
        </MenuTrigger>
        <MenuItemsContainer>
          <MenuItems open={this.state.open}>
            {this.props.content.map((item, i) => (
              <MenuItem key={i} className="">
                <MenuButton
                  className="ibm-padding--horizontal"
                  onClick={() => {
                    this.updateSelection(item.label, item.value)
                  }}
                  selected={this.state.selected === item.label}
                >
                  <span className="ibm-type-b">{item.label}</span>
                </MenuButton>
              </MenuItem>
            ))}
          </MenuItems>
        </MenuItemsContainer>
      </Container>
    )
  }
}

export default DropdownMenu
