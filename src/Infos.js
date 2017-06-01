import React from 'react'
import PropTypes from 'prop-types'
import { SIZE_PREFIXES } from './utils'

const Infos = ({ max, min, size, total }) => (
  <div className={`pagination-infos pagination-infos-${SIZE_PREFIXES[size]}`}>
    {`${min}-${max} / ${total}`}
  </div>
)

Infos.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
}

export default Infos
