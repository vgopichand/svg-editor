import React from 'react'

function DescriptionNdDetails ({ info }) {
  return (
    <>
      {info.map(({ description, details }) => {
        return (
          <>
            <li key={description}>{description}</li>
            {details && <ul> {details.map(detail => <li key={detail}>{detail}</li>)}</ul>}
          </>
        )
      })
      }
    </>
  )
}

export default DescriptionNdDetails
