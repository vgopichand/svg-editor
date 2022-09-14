import _ from 'underscore'

const ALERT_GROUP_CLASS_NAME = 'alerts-group'
const ALERT_HEIGHT = 20
const ALERT_WIDTH = 20

export function addOrUpdateAlerts (chartDivId = 'rth-chart',alerts, onHovercallBack) {
  const bottomPlot = getBottomPlotDetails(chartDivId)

  const alertGroup = createAndGetAlertGroup(bottomPlot)
  updateAlertGroup(alertGroup, bottomPlot)

  if (alertGroup) {
    _.forEach(alerts, alert => {
      let result = document.getElementsByClassName(alert.id)

      if (!result.length) {
        result = [addAlertToAlertGroup(alert, alertGroup, onHovercallBack)]
      }

      updateAlertImagePostion(result[0], alert.occurredAt, bottomPlot.xaxisTimeMin, bottomPlot.xaxisTimeMax, bottomPlot.x, bottomPlot.x + bottomPlot.width)
    })
  }
}

function addAlertToAlertGroup(alert, alertGroup, onHovercallBack) {
  const svgImg = document.createElementNS('http://www.w3.org/2000/svg','image')
  svgImg.setAttributeNS(null, 'height', ALERT_HEIGHT);
  svgImg.setAttributeNS(null,'width', ALERT_WIDTH);
  svgImg.setAttributeNS(null, 'href', alert.imagePath)
  svgImg.setAttributeNS(null, 'x', '0')
  svgImg.setAttributeNS(null, 'y', '0')
  svgImg.classList.add(alert.id)
  svgImg.setAttribute('data-tip', 'true') // important to add tool tip
  svgImg.setAttribute('data-for', alert.id)
  svgImg.setAttribute('alertId', alert.id)
  svgImg.style.pointerEvents = 'auto'
  svgImg.style.outline = 'none'
  svgImg.addEventListener('mouseover', (event) => onHovercallBack && onHovercallBack(event.target.getAttribute('alertId')))
  alertGroup.appendChild(svgImg)

  return svgImg
}

function updateAlertImagePostion(alertImage, occurredAt, xaxisTimeMin, xaxisTimeMax, plotMinX, plotMaxX) {
  const x = getTheXTransformValue(occurredAt, xaxisTimeMin, xaxisTimeMax, plotMinX, plotMaxX)

  if (!x) {
    alertImage.setAttribute('display', 'none')
  } else {
    alertImage.setAttribute('display', 'inline-block')
    alertImage.setAttribute('x', x)
  }
}

function getTheXTransformValue(time, xaxisTimeMin, xaxisTimeMax, minX, maxX) {
  const minTime = new Date(xaxisTimeMin)
  const maxTime = new Date(xaxisTimeMax)
  const alertTime = new Date(time)

  if (minTime <= alertTime && alertTime <= maxTime) {
    const timeDiff = (maxTime.getTime() - minTime.getTime()) * 10000
    const perOne = (maxX - minX) / timeDiff
    const current = (alertTime.getTime() - minTime.getTime()) * 10000

    const eachValue =  (perOne * current)
    return eachValue
  }

  return null
}

function updateAlertGroup (alertGroup, bottomPlot) {
  alertGroup.setAttribute('transform', `translate(${bottomPlot.x - ALERT_WIDTH * 0.5}, ${bottomPlot.y - ALERT_HEIGHT})`)
}

function createAndGetAlertGroup (bottomPlot) {
  const alertGroup = document.getElementsByClassName(ALERT_GROUP_CLASS_NAME)

  if (!alertGroup.length) {
    const chartSvg = document.getElementsByClassName('hoverlayer')

    if (!chartSvg.length || !bottomPlot) {
      return null
    }

    const g = document.createElementNS("http://www.w3.org/2000/svg", 'g') //create <g>
    g.classList.add(ALERT_GROUP_CLASS_NAME)
    chartSvg[0].parentElement.appendChild(g)

    return g
  }

  return alertGroup[0]
}

function getBottomPlotDetails(chartDivId) {
  const chart = document.getElementById(chartDivId)
  const width = chart._fullLayout.xaxis._length
  const x = chart._fullLayout.xaxis._offset
  const y = chart._fullLayout.yaxis._offset
  const xaxisTimeMin = chart._fullLayout.xaxis.range[0]
  const xaxisTimeMax = chart._fullLayout.xaxis.range[1]

  return { width: width, x: x, y: y, xaxisTimeMin, xaxisTimeMax }
}
