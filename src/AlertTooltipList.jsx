/* eslint-disable max-lines */
import AlertTooltip from "./AlertTooltip";

import styled from 'styled-components'

const AlertTooltipList = ({ alerts }) => {
  return (
    <S.Wrapper>
     {alerts.map(r => <AlertTooltip key={r.dataId} alert={r} />)}
    </S.Wrapper>
  )
}

export default AlertTooltipList

const S = {
  Wrapper: styled.div`
    display: block;
    max-height: 400px;
    max-width: 500px;
    overflow-y: auto;
    overflow-x: auto;
    padding: 5px 4px;
  `
}
