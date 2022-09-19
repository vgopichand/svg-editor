/* eslint-disable max-lines */
import AlertHeader from './AlertHeader'
import AlertDetails from './AlertDetails'
import styled from 'styled-components'

const AlertTooltip = ({ alert }) => {
  return (
    <S.Wrapper>
      <AlertHeader alert={alert} />
      <AlertDetails problems={alert.problems} possibleCauses={alert.possibleCauses} />
    </S.Wrapper>
  )
}

export default AlertTooltip

const S = {
  Wrapper: styled.div`
    display: block;
    margin-top: 10px;
  `
}
