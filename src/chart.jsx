import React, { useEffect } from 'react'
import critical from './critical.svg'

import Plot from 'react-plotly.js'

import { layout, data } from './chartData'
import { addOrUpdateAlerts } from './chartHelper'
import { alertsData } from './test'
import DataTooltip from './Tooltip'
import ReactTooltip from 'react-tooltip'

const allIds = {}
alertsData.alarmOccurrences.forEach((a) => {
  if (allIds[a.id + '_' + a.occurredAt]) {
    console.log(allIds[a.id], a)
  } else {
    allIds[a.id + '_' + a.occurredAt] = a
  }
})

const CHART_DIV_ID = 'rth-chart'
const AlertsImagePaths = {
  critical: critical,
}

const alerts = [{ id: 'alert-id', occurredAt: '2022-09-05T08:00:00+05:30', imagePath: AlertsImagePaths.critical}]

const Chart = () => {
  // const redRef = createRef()

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [])

  const renderPlotly = (figure, graphDiv) => {
    addOrUpdateAlerts(CHART_DIV_ID, alerts)
  }

  const onRelayout = (event) => {
    addOrUpdateAlerts(CHART_DIV_ID, alerts)
  }

  return (<>
    <Plot divId={CHART_DIV_ID} data={data} layout={layout} config={{ displaylogo: false, autosizable: false, modeBarButtonsToRemove: ['autoScale2d', 'pan2d', 'zoom3d', 'zoomIn2d', 'zoomOut2d'] }} onInitialized={(a, b) => renderPlotly(a, b)} onRelayout={onRelayout} />
    <DataTooltip />
  </>)
}

export default Chart