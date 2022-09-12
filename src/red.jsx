// import styled from 'styled-components'
import styled from 'styled-components';
import Tooltip from './Tooltip';
import critical from './critical.svg'
import { forwardRef } from 'react';
import AlertTooltip from './AlertTooltip';

const Red = forwardRef((props, ref) => {
  const title = () => <AlertTooltip />
  return (
    <svg>
      <Tooltip title={title()} placement='left' >
        <Icon href={critical} alt='dfjhsdfsdfjk' {...props} ref={ref} />
      </Tooltip>
    </svg>
  )
})

export default Red

const Icon = styled.image`
  pointer-events: all;
  transform-origin: center;
  height: 20px;
  width: 20px;
`