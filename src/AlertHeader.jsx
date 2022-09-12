/* eslint-disable max-lines */
import moment from 'moment'
import styled from 'styled-components'

import AlertIcon from './AlertIcon'

const alertDateTime = (dateTime) => moment(dateTime).format('ddd, MMM D, YYYY h:mm:ss A')

const AlertHeader = ({ alert }) => {
  const { severity, description = '--', code, status, unitType, serialId, zoneId, zoneName, occurredAt } = alert

  return (
    <>
      <S.Header>
        <AlertIcon {...{ severity }} size={'large'} />
        <S.Wrapper>
          <S.Description>{description}</S.Description>
          <S.Code>{code}</S.Code>
          <S.Status>{status === 'new' ? 'occurred' : status}
            <span>{alertDateTime(occurredAt)}</span>
          </S.Status>
          <S.UnitSpecification>
            {unitType && <div>{unitType}</div>}
            {serialId && <div><span>S/N: </span>{serialId}</div>}
            {zoneId && <div><span>Zone ID: </span>`${zoneId} - ${zoneName}`</div>}
          </S.UnitSpecification>
        </S.Wrapper>
      </S.Header>
    </>
  )
}

export default AlertHeader

const S = {
  Header: styled.div`
    display: grid;
    grid-column-gap: 2px;
    grid-template-columns: 30% 70%;
  `,
  Wrapper: styled.div`
    display: inline-block;
    margin-left: 5px;
`,
  Description: styled.span`
    display: inline-block;
    color:'#4D4D4D';
    font-size: 20px;
    line-height: 1em;
    font-weight: 600;
    padding-right: 20px;
    word-wrap: break-word;
  `,
  Code: styled.span`
    color: '#939598';
    font-size: 18px;
  `,
  AlertInfo: styled.div`
    width: max-content;
    display: inline-block;
    margin-left:-30px;
    padding-right: 10px;
  `,
  Status: styled.div`
    font-size: 16px;
    color: '#939598';
    font-weight: 600;
    text-transform:uppercase;
    text-align: left;

    & >span {
      color:'#4D4D4D';
      display: block;
      font-size: 12px;
      font-weight: 600;
    }
  `,
  OccurredAt: styled.div`
    text-align: left;
  `,
  UnitSpecification: styled.div`
    margin-top: 5px;
    color:'#4D4D4D';
    font-size: 14px;
    font-weight: 600;
    text-align: left;

    & >div span {
      color: '#939598';
    }
  `
}
