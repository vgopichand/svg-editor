import React, { useState } from 'react'
// import _ from 'underscore'

import Plot from 'react-plotly.js'

// import { RthRawData1 } from './Data/RthData.js'
import { ZoneRthRawData } from './Data/ZoneRthRawData.js'
import { getPlotlyDataAndLayoutMaps } from './Data/RthRawDataConverter'

const { plots } = getPlotlyDataAndLayoutMaps(ZoneRthRawData)

const DashboardPlots = () => {
  const [range, setRange] = useState(plots[0].layout.xaxis.range)
  const onRelayout = (event) => {
    setRange([event['xaxis.range[0]'], event['xaxis.range[1]']])
  }

  return (<>
    {
      plots.map(r =>
        <div key={r.name}>
          <Plot
            data={r.data} layout={{ ...r.layout, xaxis: { ...r.layout.xaxis, range: range}}}
            config={{ scrollZoom: true, displaylogo: false, autosizable: false, modeBarButtonsToRemove: ['autoScale2d', 'pan2d', 'zoom3d', 'zoomIn2d', 'zoomOut2d'] }}
            onRelayout={onRelayout}
          />
        </div>
      )
    }
  </>)
}

export default DashboardPlots