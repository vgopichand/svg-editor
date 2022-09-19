import _ from 'underscore'

const ALERT_GROUP_CLASS_NAME = 'alerts-group'
const ALERT_HEIGHT = 20
const ALERT_WIDTH = 20

export function addOrUpdateAlerts (chartDivId = 'rth-chart',alerts, onHovercallBack) {
  const bottomPlot = getBottomPlotDetails(chartDivId)

  const alertsPlaceHolder = createAndGetAlertsPlaceHolder(bottomPlot)
  updateAlertsPlaceHolder(alertsPlaceHolder, bottomPlot)

  if (alertsPlaceHolder) {
    const alertsPositionMap = []
    _.forEach(alerts, alert => {
      const xPosition = getTheXTransformValue(alert.occurredAt, bottomPlot.xaxisTimeMin, bottomPlot.xaxisTimeMax, bottomPlot.x, bottomPlot.x + bottomPlot.width)
      if (xPosition) {
        alertsPositionMap.push({ ...alert, x: xPosition})
      }
    })

    const alertGroups = getAlertGroups(alertsPositionMap)
    const childNodes = [...alertsPlaceHolder.children]

    _.each(childNodes, (child) => {
      if (child) {
        alertsPlaceHolder.removeChild(child)
        removeChildren(child)
      }
    })

    createAlertsGroup(alertGroups, alertsPlaceHolder, onHovercallBack)
  }
}

function removeChildren(element) {
  _.each([...(element?.children ?? [])], child => {
    element.removeChild(child)
    removeChildren(child)
  })

  element?.remove()
}

function addAlertToAlertGroup(alert, alertsPlaceHolder) {
  const svgImg = document.createElementNS('http://www.w3.org/2000/svg','image')
  svgImg.setAttributeNS(null, 'height', ALERT_HEIGHT);
  svgImg.setAttributeNS(null,'width', ALERT_WIDTH);
  svgImg.setAttributeNS(null, 'href', alert.imagePath)
  svgImg.setAttributeNS(null, 'x', '0')
  svgImg.setAttributeNS(null, 'y', '0')
  alertsPlaceHolder.appendChild(svgImg)

  return svgImg
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

function updateAlertsPlaceHolder (alertsPlaceHolder, bottomPlot) {
  alertsPlaceHolder.setAttribute('transform', `translate(${bottomPlot.x - ALERT_WIDTH * 0.5}, ${bottomPlot.y - ALERT_HEIGHT})`)
}

function createAndGetAlertsPlaceHolder (bottomPlot) {
  const alertsPlaceHolder = document.getElementsByClassName(ALERT_GROUP_CLASS_NAME)

  if (!alertsPlaceHolder.length) {
    const chartSvg = document.getElementsByClassName('hoverlayer')

    if (!chartSvg.length || !bottomPlot) {
      return null
    }

    const g = document.createElementNS("http://www.w3.org/2000/svg", 'g') //create <g>
    g.classList.add(ALERT_GROUP_CLASS_NAME)
    chartSvg[0].parentElement.appendChild(g)

    return g
  }

  return alertsPlaceHolder[0]
}

function getBottomPlotDetails(chartDivId) {
  const chart = document.getElementById(chartDivId)
  const width = chart._fullLayout.xaxis._length
  const x = chart._fullLayout.xaxis._offset
  const y = chart._fullLayout.yaxis._offset
  const initialRange = chart._fullLayout.xaxis._rangeInitial
  const xaxisTimeMin = initialRange[0].includes(chart._fullLayout.xaxis.range[0]) ? initialRange[0] : chart._fullLayout.xaxis.range[0]
  const xaxisTimeMax = chart._fullLayout.xaxis.range[1]

  return { width: width, x: x, y: y, xaxisTimeMin, xaxisTimeMax }
}

function getAlertGroups(alertsPositionMap) {
 const alertGroups = []

 alertsPositionMap.forEach ( alertMap => {
    if (!alertGroups.length) {
      alertGroups.push([alertMap])
    } else {
      const lastGroup = _.last(alertGroups)
      const previousAlertPosition = getAlertBasedOnPriority(lastGroup).x
      if ((alertMap.x - previousAlertPosition) >= ALERT_WIDTH) {
        alertGroups.push([alertMap])
      } else {
        lastGroup.push(alertMap)
      }
    }
 })

 return alertGroups
}

function createAlertsGroup(alertGroups, alertsPlaceHolder, onHovercallBack) {
  alertGroups.forEach(alertGroup => {
    createAlertGroupElement(alertGroup, alertsPlaceHolder, onHovercallBack)
  })
}

function createAlertGroupElement(alertGroup, alertsPlaceHolder, onHovercallBack) {
  const alert = getAlertBasedOnPriority(alertGroup)
  const gElement = document.createElementNS('http://www.w3.org/2000/svg','g')
  const alertIds = _.map(sortBasedOnPriority(alertGroup), r => r.id).join('-')
  gElement.setAttribute('data-tip', alertIds) // important to add tool tip
  gElement.setAttribute('data-for', 'fake-Alert-Id')
  gElement.setAttribute('alertId', alertIds)
  gElement.style.pointerEvents = 'all'
  gElement.style.outline = 'none'
  gElement.style.userSelect = 'none'

  gElement.addEventListener('click', (event) => {
    onHovercallBack && onHovercallBack(event.target.parentElement.getAttribute('alertId'))
  })
  // svgImg.addEventListener('click', (event) => event.target.blur())
  const image = addAlertToAlertGroup(alert, gElement)
  image.setAttribute('x', alert.x)

  gElement.appendChild(image)

  if (alertGroup.length > 1) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg','circle')
    circle.setAttributeNS(null, 'cx', alert.x + (ALERT_WIDTH * 0.5))
    circle.setAttributeNS(null, 'cy', 0)
    circle.setAttributeNS(null, 'r', 7)
    circle.setAttribute('fill', '#444444')
    circle.style.pointerEvents = 'all'

    gElement.appendChild(circle)

    const textNode = document.createTextNode(alertGroup.length);

    const text = document.createElementNS('http://www.w3.org/2000/svg','text')
    text.setAttribute('fill', 'white')
    text.setAttributeNS('null', 'x', alert.x + (ALERT_WIDTH * 0.5))
    text.setAttribute('transform', `translate(${alert.x + (ALERT_WIDTH * 0.5) - textNode.length * 3}, 2)`)
    text.style.fontSize = '9px'
    text.style.fontWeight = 'bold'
    text.style.pointerEvents = 'all'

    text.appendChild(textNode);

    gElement.appendChild(text)
  }

  alertsPlaceHolder.appendChild(gElement)
}

function getAlertBasedOnPriority (alertGroup) {
  let highPriority = alertGroup[0]

  _.forEach(alertGroup, (alert) => {
    if (alert.severity < highPriority.severity) {
      highPriority = alert
    } else if (alert.severity === highPriority.severity && highPriority.id.includes('clear') && !alert.id.includes('clear')) {
      highPriority = alert
    }
  })

  return highPriority
}

function sortBasedOnPriority(alertGroup) {
  return alertGroup.sort((a, b) => {
    if (a.severity < b.severity) {
      return -1
    } else if (a.severity === b.severity && b.id.includes('clear') && !a.id.includes('clear')) {
      return -1
    }

    return 1
  })
}
