import React, { Component } from 'react';
import Styled from 'styled-components';
import Lodash from 'lodash';

import Tile from './Tile';

import config from '/imports/client/config';

// Styled components

const Grid = Styled.section`
  display: grid;
  grid-template-columns: calc(50% - 17px) calc(50% - 17px);
  grid-auto-rows: min-content;
  grid-column-gap: 30px;
  grid-row-gap: 55px;
  box-sizing: border-box;
  margin-top: 24px;
`;


export default class GridComponent extends Component {
  render() {
    const { matches } = this.props;

    return (
      <Grid>
        {Lodash.map(matches, (match, key) =>
          <Tile key={key} match={match} />
        )}
      </Grid>
    );
  }
}
