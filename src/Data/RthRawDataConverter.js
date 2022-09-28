import moment from "moment";
import 'moment-timezone';
import _ from 'underscore';
import { getUpdatedLayoutWithRange } from './y2AndY3Scale'

import { Parameters, Stages, Zone } from "./ParametersMap"
import SuperheatInterpolator from "./superheatInterpolator";

export const getPlotlyDataAndLayout = (rawData) => {
  const parametersData = getParametersData(rawData)
  // const parametersData = []
  const zonesData = getZonesData(rawData, parametersData.length)
  const stagesData = getStagesData(rawData, parametersData.length + zonesData.length)
  const alerts = getAlertsData(rawData)

  const updatedBaseLayout = getUpdatedLayoutWithRange(parametersData.concat(zonesData), baseLayout)
  const layout = {
    ...updatedBaseLayout,
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
    if (r.name === 'gasSuperheatOccurrences') {
      parseGasSuperheatOccurrences(rawData[r.name], rawData.stages, rawData.fromTime, rawData.toTime, rawData.timeZone, x, y)
    } else {
      rawData[r.name].forEach(s => {
        if(s[parameterName] !== null) {
          x.push(parseTimeZone(s.occurredAt, rawData.timeZone))
          y.push(s[parameterName])
        }
      })
    }
    const data =  plotlyData(dispName, x, y, yaxis, lineNumber, r.legendgroup, r.mode, r.connectgaps)
    if (r.line){
      return { ...data, line: r.line}
    } else {
      return data
    }
  })
}

const getZonesData = (rawData, linesCount) => {
  const zonesData = rawData.zones.map((z, index) => {
    return Zone.map(r => {
      const dispName = r.dispName
      const parameterName = r.parameterName
      const yaxis = r.yaxis
      linesCount =  linesCount + 1
      const x = []
      const y = []
      z[r.name].forEach(s => {
        if (r.name === 'relievingOccurrences') {
          processRelievingOccurrences(s, z, rawData.timeZone, x, y)
        } else if(s[parameterName] !== null) {
          x.push(parseTimeZone(s.occurredAt, rawData.timeZone))
          y.push(s[parameterName])
        }
      })

      const data = plotlyData(dispName, x, y, yaxis, linesCount, z.name, r.mode)
      if (r.line) {
        return { ...data, line: { ...r.line, color: ZoneColors[index] }, fill: (r.fill || 'none')}
      } else {
        return data
      }
    })
  })

  const allData = []
  zonesData.forEach( z => z.forEach(i => allData.push(i)))
  return allData
}

const parseGasSuperheatOccurrences = (superheatOccurrences, stages, fromTime, toTime, timeZone, x, y) => {
  const start = moment.tz(fromTime, timeZone).unix()
  const end = moment.tz(toTime, timeZone).unix()
  const occurrences = SuperheatInterpolator.interpolate(superheatOccurrences, stages, start, end)
  occurrences.forEach(r => {
    x.push(parseTimeZone(r.occurredAt, timeZone))
    y.push(r.temperature)
  })
}

const processRelievingOccurrences = (relievingOccurrence, zone, timeZone, x, y) => {
  const point = interpolateTempPoint(relievingOccurrence.occurredAt, zone.tempOccurrences)
  x.push(parseTimeZone(point.occurredAt, timeZone))
  y.push(point.temperature)
}

const interpolateTempPoint = (target, set) => {
  const reversedSet = set.slice(0).reverse()
  let leftPoint = _.find(reversedSet, occurrence => target >= occurrence.occurredAt)
  if (!leftPoint) { leftPoint = _.extend(_.first(set), { occurredAt: target }) }
  let rightPoint = _.find(set, occurrence => target <= occurrence.occurredAt)
  if (!rightPoint) { rightPoint = _.extend(_.last(set), { occurredAt: target }) }
  return interpolatePoints([leftPoint, rightPoint], target)
}

const interpolatePoints = (pair, time) => {
  if (!pair[0]) { return pair[1] }

  const tempDelta = pair[1].temperature - pair[0].temperature
  const timeDelta = (time - pair[0].occurredAt)
  const timeSpan = (pair[1].occurredAt - pair[0].occurredAt)

  const scaledTemp =
    tempDelta === 0
      ? pair[0].temperature
      : pair[0].temperature + (tempDelta * (timeDelta / timeSpan))

  return { occurredAt: time, temperature: scaledTemp }
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

      const data = plotlyData(dispName, x, y, yaxis, linesCount, s.legendgroup)
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

const plotlyData = (displayName, x, y, yaxis, lineNumber, legendgroup = null, mode = 'lines', connectedGaps = true) => {
  return {
    name: `<b>${displayName}</b>`,
    offsetgroup: lineNumber,
    legendgroup: legendgroup,
    legendgrouptitle: {
      text: `<b>${legendgroup}</b>`,
      font: {
        size: 14,
        color: 'black',
      }
    },
    visible: true,
    type: "scatter",
    connectgaps: connectedGaps,
    mode: mode ? mode : 'lines',
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


const parseTimeZone = (timestamp, timeZone, addMilliseconds = 0) => {
  const t = moment.unix(timestamp).tz(timeZone)
  return t.add(addMilliseconds, 'milliseconds').format('YYYY-MM-DDTHH:mm:ss.SSS')
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
  showlegend: true,
  legend: {
    orientation: 'h',
  },
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
    // range: [-20, 130],
    // dtick: 30,
    fixedrange: true,
    zeroline: false,
  },
  yaxis3: {
    side: 'right',
    title: 'ft³/min | psig | Steps',
    domain: [0.3, 1],
    overlaying: 'y2',
    anchor: 'x1',
    fixedrange: true,
    // range: [0, 1500],
    // dtick: 300,
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

const ZoneColors = [
  'rgba(31, 114, 157, 1.0)', // dark blue (NOTE: must be the first color in the list)
  'rgba(146, 192, 79, 1.0)', // light green
  'rgba(252, 54, 180, 1.0)', // pink
  'rgba(246, 162, 0, 1.0)', // orange
  'rgba(0, 206, 155, 1.0)', // green
  'rgba(205, 53, 41, 1.0)', // red
  'rgba(165, 199, 216, 1.0)', // light blue
  'rgba(159, 68, 155, 1.0)', // purple
  'rgba(20, 115, 21, 1.0)' // dark green
]