/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { increment, move, doubleAsync } from '../../redux/modules/counter'

import BlockList from '../../blocks'
import Canvas from '../../components/Canvas'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function,
  move: Function
};

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<void, Props, void> {
  static propTypes = {
    counter: PropTypes.object.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
    move: PropTypes.func.isRequired
  };

  render () {
    const width = window.innerWidth
    const height = window.innerHeight

    const leftPaneWidth = BlockList.defaultProps.width

    return (
      <div>
        <BlockList width={leftPaneWidth} height={height} />

        <Canvas x={leftPaneWidth} y={0}
          width={width - leftPaneWidth} height={height}
          {...this.props.counter} moveBlocks={this.props.move} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect((mapStateToProps), {
  increment: () => increment(1),
  move,
  doubleAsync
})(HomeView)
