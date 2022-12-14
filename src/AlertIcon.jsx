import React from 'react'
import styled from 'styled-components'

function AlertIcon ({ imagePath, size }) {
  return (
    <S.AlertIcon src={imagePath} alt='alert-icon' { ...size } />
  )
}

export default AlertIcon

const S = {
  AlertIcon: styled.img`
    &.small {
      font-size: 18px;
      padding-left: 10px;
    }

    &.medium {
      font-size: 27px;
      padding-left: 10px;
    }

    &.large {
       font-size: 40px;
       padding-right: 10px;
    }
`
}
