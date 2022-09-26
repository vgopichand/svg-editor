import moment from "moment";
import 'moment-timezone'

import { Parameters, Stages, Zone } from "./ParametersMap"

export const getPlotlyDataAndLayout = (rawData) => {
  const parametersData = getParametersData(rawData)
  // const parametersData = []
  const zonesData = getZonesData(rawData, parametersData.length)
  const stagesData = getStagesData(rawData, parametersData.length + zonesData.length)
  const alerts = getAlertsData(rawData)
  const layout = {
    ...baseLayout,
    xaxis: {
      ...baseLayout.xaxis,
      range: [
        moment.tz(rawData.fromTime, rawData.timeZone).format('YYYY-MM-DDTHH:mm:ss.SSS'),
        moment.tz(rawData.toTime, rawData.timeZone).format('YYYY-MM-DDTHH:mm:ss.SSS')
      ]
    }
  }

  return { data: [ ...parametersData, ...zonesData, ...stagesData], alerts, layout }
}

const getParametersData = (rawData) => {
  return Parameters.map(r => {
    const dispName = r.dispName
    const parameterName = r.parameterName
    const yaxis = r.yaxis
    const lineNumber = Parameters.indexOf(r)
    const x = []
    const y = []
    rawData[r.name].forEach(s => {
      if(s[parameterName] !== null) {
        x.push(parseTimeZone(s.occurredAt, rawData.timeZone))
        y.push(s[parameterName])
      }
    })

    const data =  plotlyData(dispName, x, y, yaxis, lineNumber)
    if (r.line){
      return { ...data, line: r.line}
    } else {
      return data
    }
  })
}

const getZonesData = (rawData, linesCount) => {
  const zonesData = rawData.zones.map(z => {
    return Zone.map(r => {
      const dispName = r.dispName
      const parameterName = r.parameterName
      const yaxis = r.yaxis
      linesCount =  linesCount + 1
      const x = []
      const y = []
      z[r.name].forEach(s => {
        if(s[parameterName] !== null) {
          x.push(parseTimeZone(s.occurredAt, rawData.timeZone))
          y.push(s[parameterName])
        }
      })

      const data = plotlyData(dispName, x, y, yaxis, linesCount)
      if (r.line) {
        return { ...data, line: r.line, fill: (r.fill || 'none')}
      } else {
        return data
      }
    })
  })

  const allData = []
  zonesData.forEach( z => z.forEach(i => allData.push(i)))
  return allData
}

const getStagesData = (rawData, linesCount) => {
  const plotlyStagesData = []

  Stages.forEach(s => {
    const stage = rawData.stages.find(r => r.stage === s.name)
    if (stage) {
      const dispName = s.dispName
      const parameterName = s.parameterName
      const yaxis = s.yaxis
      linesCount =  linesCount + 1
      const x = []
      const y = []
      stage.runOccurrences.forEach(o => {
        if(o[parameterName] !== null) {
          x.push(parseTimeZone(o.occurredAt, rawData.timeZone))
          y.push(o[parameterName])
        }
      })

      const data = plotlyData(dispName, x, y, yaxis, linesCount)
      plotlyStagesData.push({
        ...data,
        line: s.line,
        fill: s.fill
      })
    }
  })

  return plotlyStagesData
}

const getAlertsData = (rawData) => {
 return convertToLocalTime(rawData.alarmOccurrences || [])
}

const plotlyData = (displayName, x, y, yaxis, lineNumber) => {
  return {
    name: displayName,
    offsetgroup: lineNumber,
    visible: true,
    type: "scatter",
    mode: "lines",
    line: {},
    fill: "",
    marker: {},
    hoverinfo: 'none',
    x: x,
    y: y,
    yaxis: yaxis,
    xaxis: "x"
  }
}


const parseTimeZone = (timestamp, timeZone) => {
  const t = moment.unix(timestamp).tz(timeZone)
  return t.format('YYYY-MM-DDTHH:mm:ss.SSS')
}

const convertToLocalTime = (alerts) => {
  alerts.forEach(r => r.occurredAtLocal = parseTimeZone(r.occurredAt, r.timeZone))

  return alerts
}

const baseLayout = {
  barmode: 'group',
  font: {
    family: 'Lato',
  },
  showlegend: false,
  hovermode: 'x',
  margin: {
    t: 0,
  },
  yaxis: {
    side: 'left',
    title: '%',
    anchor: 'x1',
    range: [0, 100],
    domain: [0, 0.2],
    fixedrange: true,
  },
  yaxis2: {
    side: 'left',
    title: '°F | %',
    domain: [0.3, 1],
    anchor: 'x1',
    range: [0, 150],
    dtick: 30,
    fixedrange: true,
    rangemode: 'nonnegative',
    zeroline: false,
    constrain: 'range',
  },
  yaxis3: {
    side: 'right',
    title: 'ft³/min | psig | Steps',
    domain: [0.3, 1],
    overlaying: 'y2',
    anchor: 'x1',
    range: [0, 1500],
    dtick: 300,
    fixedrange: true,
    rangemode: 'nonnegative',
    constrain: 'range',
    scaleratio: 0.1,
    zeroline: false,
    scaleanchor: 'y2',
  },
  xaxis: {
    side: 'left',
    title: {
      text: '',
    },
    range: ['2022-09-13T00:00:00', '2022-09-13T23:59:59'],
    type: 'date',
  },
  grid: {
    rows: 3,
    columns: 1,
    pattern: 'independent',
    roworder: 'bottom to top',
  },
  width: 1200,
  height: 600,
  'xaxis.autorange': false,
  'yaxis.autorange': false,
};