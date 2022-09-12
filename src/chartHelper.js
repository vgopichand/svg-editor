import _ from 'underscore'

export class ChartHelper {
  // setChartMinAndMax(graphDiv) {
  //   const xAxis = graphDiv.getElementsByClassName('xaxislayer-above')[0]

  //   const {x} = this._getTranslateValues(xAxis.children[0].children[0])
  //   const point = this._getTranslateValues(xAxis.children[xAxis.children.length - 1].children[0])
  //   this._minX = Number(x)
  //   this._maxX = Number(point.x)
  // }

  transformAlerts(alert, time, xaxisTimeMin, xaxisTimeMax) {
    const { min, max } = this._getXAxisMinAndMaxValuesInPixels()
    const { height, width } = this._getAlertElementHeightAndWidth(alert)

    const xValue = this._getTheXTransformValue(time, xaxisTimeMin, xaxisTimeMax, min, max)
    const yValue = this._getTheYTransformValue()

    console.log(xValue, alert)

    if (xValue && yValue) {
      const translate = `translate(${xValue - (width * 0.5)}, ${yValue - (height * 0.5)})`

      alert.style.display = 'inline-block'
      alert.setAttribute('transform', translate)
    } else {
      alert.style.display = 'none'
    }
  }

  // translateAlert (alert, newXMin = this._minX, newXMax = this._maxX ) {
  //   const { height, width } = this._getAlertElementHeightAndWidth(alert)

  //   const translate = `translate(${newXMin - (width * 0.5)}, ${this._getTheYTransformValue() - (height * 0.5)})`

  //   alert.setAttribute('transform', translate)
  // }

  _getTheXTransformValue(time, xaxisTimeMin, xaxisTimeMax, minX, maxX) {
    const minTime = new Date(xaxisTimeMin)
    const maxTime = new Date(xaxisTimeMax)
    const alertTime = new Date(time)

    if (minTime <= alertTime && alertTime <= maxTime) {
      const timeDiff = (maxTime.getTime() - minTime.getTime()) * 10000
      const perOne = (maxX - minX) / timeDiff
      const current = (alertTime.getTime() - minTime.getTime()) * 10000

      const eachValue =  (perOne * current) + minX
      return eachValue
    }

    return null
  }

  _getTheYTransformValue() {
    const subplot2 = document.getElementsByClassName('subplot xy2')[0]
    const yaxisTickGroup = subplot2.getElementsByClassName('yaxislayer-above')[0]
    const yValueArray = []

    _.each(yaxisTickGroup.children, (child) => {
      const y2Point = this._getTranslateValues(child.children[0])

      yValueArray.push(Number(y2Point.y))
    })

    return _.max(yValueArray)
  }

  _getXAxisMinAndMaxValuesInPixels() {
    const subplot = document.getElementsByClassName('subplot xy')[0]
    const zeroLinePath = subplot.getElementsByClassName('zerolinelayer')[0].children[0]
    const pathArray = zeroLinePath.getAttribute('d').split(',')
    const xMin = parseFloat(pathArray[0].trim().replace(/\D/g, ''))
    const xMax = parseFloat(pathArray[1].trim().replace(/\D/g, ''))

    return { min: xMin, max: xMax + xMin}
  }

  _getTranslateValues (element) {
    const style = window.getComputedStyle(element)
    const matrix = style['transform'] || style.webkitTransform || style.mozTransform

    // No transform property. Simply return 0 values.
    if (matrix === 'none' || typeof matrix === 'undefined') {
      return {
        x: 0,
        y: 0,
        z: 0
      }
    }

    // Can either be 2d or 3d transform
    const matrixType = matrix.includes('3d') ? '3d' : '2d'
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

    // 2d matrices have 6 values
    // Last 2 values are X and Y.
    // 2d matrices does not have Z value.
    if (matrixType === '2d') {
      return {
        x: matrixValues[4],
        y: matrixValues[5],
        z: 0
      }
    }

    // 3d matrices have 16 values
    // The 13th, 14th, and 15th values are X, Y, and Z
    if (matrixType === '3d') {
      return {
        x: matrixValues[12],
        y: matrixValues[13],
        z: matrixValues[14]
      }
    }
  }

  _getAlertElementHeightAndWidth (alert) {
    const style = window.getComputedStyle(alert)
    return { height: parseInt(style.height), width: parseInt(style.width) }
  }
}
