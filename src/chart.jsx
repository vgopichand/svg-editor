import React, { useEffect } from 'react'
import critical from './critical.svg'
import normal from './normal.png'
import normal_clear from './normal_clear.png'
import _ from 'underscore'


import Plot from 'react-plotly.js'

import { layout, data, rawAlerts, convertToLocalTime } from './chartData'
import { addOrUpdateAlerts } from './chartHelper'
import DataTooltip from './Tooltip'
import ReactTooltip from 'react-tooltip'

const CHART_DIV_ID = 'rth-chart'
const AlertsImagePaths = {
  critical: critical,
  normal: normal,
  normal_clear: normal_clear
}

const alerts = convertToLocalTime(rawAlerts)

// console.log(_.map(alerts, r => r.occurredAt));

const plotly_alerts = _.map(alerts, alert => {
  return {
     id: (alert.id + '_' + alert.status),
     imagePath: AlertsImagePaths[alert.status === 'cleared'? (alert.severity + '_clear') : alert.severity],
     occurredAt: alert.occurredAt,
     timeZone: alert.timeZone
    }
  })

const Chart = () => {
  useEffect(() => {
    ReactTooltip.rebuild()
  }, [])

  const renderPlotly = (figure, graphDiv) => {
    addOrUpdateAlerts(CHART_DIV_ID, plotly_alerts)
    ReactTooltip.rebuild()
  }

  const onRelayout = (event) => {
    addOrUpdateAlerts(CHART_DIV_ID, plotly_alerts)
    ReactTooltip.rebuild()
  }

  return (<>
    <Plot divId={CHART_DIV_ID} data={data} layout={layout} config={{ displaylogo: false, autosizable: false, modeBarButtonsToRemove: ['autoScale2d', 'pan2d', 'zoom3d', 'zoomIn2d', 'zoomOut2d'] }} onInitialized={(a, b) => renderPlotly(a, b)} onRelayout={onRelayout} />
    {
      alerts.map( r => <DataTooltip key={r.id + '_' + r.status} alert={r} />)
    }
  </>)
}

export default Chart