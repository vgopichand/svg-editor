import styled, { css } from 'styled-components'

import DescriptionNdDetails from './DescriptionNdDetails'

const pluralize = (count, noun) => count <= 1 ? noun : noun + 's'

function AlertDetails ({ possibleCauses, problems, additionalInfo }) {
  const problemCount = problems ? problems.length : 0
  const possibleCausesCount = possibleCauses ? possibleCauses.length : 0
  const additionalInfoCount = additionalInfo ? additionalInfo.length : 0

  return (
    <>
      <S.Heading>{pluralize(problemCount, 'Problem')}:</S.Heading>
      <S.UnorderedList isSingleList={problemCount === 1}> {problems ? <DescriptionNdDetails info={problems} /> : '--'} </S.UnorderedList>
      <S.Heading>{pluralize(possibleCausesCount, 'Possible Cause')}:</S.Heading>
      <S.UnorderedList isSingleList={possibleCausesCount === 1}>{possibleCauses ? <DescriptionNdDetails info={possibleCauses} /> : '--'}</S.UnorderedList>
      {additionalInfo &&
        <>
          <h5 margin='0px'>{pluralize(additionalInfoCount, 'additionalInfo')}:</h5>
          <S.UnorderedList isSingleList={additionalInfoCount === 1}><DescriptionNdDetails info={additionalInfo} /></S.UnorderedList>
        </>
        }
    </>
  )
}

export default AlertDetails

const S = {
  UnorderedList: styled.ul`
    ${({ isSingleList }) => {
        return isSingleList && css`
        margin: 0px;
        list-style-type: none;
      `
      }
    }
  `,
  Heading: styled.h4`
    margin: 0px
  `
}
