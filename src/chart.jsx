import React,{ createRef } from 'react'

import Plot from 'react-plotly.js'

import { layout, data } from './chartData'
import { ChartHelper } from './chartHelper'
import Red from './red'

const Chart = () => {
  const redRef = createRef()
  const chartHelper = new ChartHelper()

  const renderPlotly = (figure, graphDiv) => {
    if (redRef.current) {
      const mainSvg = graphDiv.getElementsByClassName('glimages')[0]
      mainSvg.appendChild(redRef.current)
      chartHelper.transformAlerts(redRef.current, '2022-09-05T08:00:00+05:30', layout.xaxis.range[0], layout.xaxis.range[1])
    }
  }

  const onRelayout = (event) => {
    chartHelper.transformAlerts(redRef.current, '2022-09-05T08:00:00+05:30', layout.xaxis.range[0], layout.xaxis.range[1])
  }

  return (<>
    <Red ref={redRef} height={20} width={20}/>
    <Plot data={data} layout={layout} onInitialized={(a, b) => renderPlotly(a, b)} onRelayout={onRelayout} />
  </>)
}

export default Chart