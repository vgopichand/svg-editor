import ReactTooltip from "react-tooltip";
import _ from "underscore";
import AlertTooltipList from "./AlertTooltipList";
import styled from 'styled-components'


const DataTooltip = ({ alerts}) => {
  const sortAlertsBasedOnPriority = (alerts) => {
    alerts.sort((a, b) => {
      if (a.severity < b.severity) {
        return -1
      } else if (a.severity === b.severity) {
        if (a.status === 'new' && b.status === 'cleared') {
          return -1;
        }

       return 1
      }

      return -1
    })

    return alerts
  }

  return (
    <S.ScrollTooltip
     id='fake-Alert-Id'
     place="top"
     effect="solid"
     scrollHide={true}
     delayHide={500}
    //  delayShow={500}
    //  delayUpdate={500}
     border={true}
     type="light"
     getContent={dataTip => {
      const ids = dataTip?.split('-') ?? []
      const matchedData = _.filter(alerts, alert => ids.includes(alert.dataId))
      return (<AlertTooltipList alerts={sortAlertsBasedOnPriority(matchedData)} />)
    }}
    // overridePosition={(
    //   { left, top },
    //   currentEvent,
    //   currentTarget,
    //   node
    // ) => {
    //   const d = document.documentElement;

    //   left = Math.min(d.clientWidth - node.clientWidth, left);
    //   top = Math.min(d.clientHeight - node.clientHeight, top);

    //   left = Math.max(0, left);
    //   top = Math.max(0, top);

    //   return { top, left };
    // }}
    >

    </S.ScrollTooltip>
  )
}

export default DataTooltip

const S = {
  ScrollTooltip: styled(ReactTooltip)`
    pointer-events: auto !important;
    padding: 0px !important;
    &:hover {
      visibility: visible !important;
      opacity: 1 !important;
    }
  `
}
