import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import ColumnTitle from '/imports/client/Components/Reusable/ColumnTitle';
import Text from '/imports/client/Components/Reusable/Text';
import Illustrate from '/imports/client/Components/Reusable/IllustrateChartPattern';

import config from '/imports/client/config';

import Patterns from '/imports/both/fixtures/patterns';

import {
  IconButton,
} from 'material-ui';

// Styled components

const ChartPattern = Styled.div`
  width: 100%;
`;

const Grid = Styled.div`
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const GridItems = Styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
`;

const GridItem = Styled.div`
  padding: 12px;
  margin: 0 12px 12px 0;
  border: 1px solid #eee;
  position: relative;

  ${props => props.disabled ? 'background-color: #eee;' : 'cursor: pointer;'}
  ${props => props.selected && `
    &::after {
      content: "selected";
      position: absolute;
      top: 100%;
      left: -1px;
      width: 100%;
      background-color: ${config.colors.primary};
      border: 1px solid ${config.colors.primary};
      text-transform: uppercase;
      font-size: 11px;
      line-height: 1;
      color: #FFF;
      text-align: center;
      padding: 3px 0;
    }
  `}
`;

export default class ChartPatternComponent extends Component {
  constructor(props) {
    super(props);
  }

  drawGrid(title, type, patterns) {
    patterns = Lodash.filter(patterns, p => p.status !== 3);

    return (
      <Grid>
        <Text>
          {title} ({Object.keys(patterns).length})
        </Text>

        <GridItems>
          {Lodash.map(patterns, pattern =>
            <GridItem
              key={pattern.acronym}
              disabled={pattern.status === 1}
              selected={pattern.acronym === this.props.selected}
              onClick={pattern.status === 2 ?
                () => this.props.handleChange('chart', { type, pattern: pattern.acronym}) :
                () => {}
              }
              title={`${pattern.name}${pattern.status === 1 ? ' (not yet available)' : ''}`}
            >
              {Illustrate(pattern.acronym, { width: 120 * 0.4, height: 100 * .4 })}
            </GridItem>
          )}
        </GridItems>
      </Grid>
    )
  }

  render() {
    return (
      <ChartPattern>
        <ColumnTitle>Chart pattern</ColumnTitle>

        {this.drawGrid('Reversal', 'reversal', Patterns.reversal)}
        {this.drawGrid('Continuation', 'continuation', Patterns.continuation)}
      </ChartPattern>
    );
  }
}
