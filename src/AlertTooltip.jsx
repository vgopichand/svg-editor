/* eslint-disable max-lines */
import AlertHeader from './AlertHeader'
import AlertDetails from './AlertDetails'
import styled from 'styled-components'


const alert = {
  code: 'CL2.161.03',
  description: 'Return Air Pressure Sensor Error',
  deviceId: '2150K5000X',
  id: '1662886521.000',
  lastUpdatedAt: 1662893188,
  occurredAt: 1662886521,
  unitType: 'System Controller',
  problems: [
    {
      description: 'Indoor return air static pressure sensor reading is out of range',
      details: []
    }
  ],
  possibleCauses: [
    {
      description: 'Follow Service Facts literature for troubleshooting',
      details: []
    }
  ],
  additionalInfo: null,
  serialId: '2150K5000X',
  severity: 'normal',
  shortDescription: null,
  status: 'new',
  zoneId: null,
  zoneName: null,
  timeZone: 'America/Chicago'
}

const AlertTooltip = () => {
  return (
    <S.Wrapper>
      <AlertHeader {...{ alert }} />
      <AlertDetails problems={alert.problems} possibleCauses={alert.possibleCauses} />
    </S.Wrapper>
  )
}

export default AlertTooltip

const S = {
  Wrapper: styled.div`
    display: block;
  `
}
