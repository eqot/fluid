import React from 'react'

import Block from './Block'
import styles from './Canvas.scss'

export default class Canvas extends React.Component {
  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    blocks: React.PropTypes.array,
    children: React.PropTypes.object
  }

  static defaultProps = {
    width: 800,
    height: 600
  }

  render () {
    const blocks = this.props.blocks.map((block, index) => {
      return (
        <Block {...block} key={block.uid}/>
      )
    })

    return (
      <svg className={styles.canvas} width={this.props.width} height={this.props.height}>
        {blocks}
      </svg>
    )
  }
}
