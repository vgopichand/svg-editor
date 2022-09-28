const workingParameters = [

]

const outDoorUnit = [
  {
    name: 'odLiquidPressureOccurrences',
    legendgroup: 'Outdoor Unit',
    dispName: 'Liquid Pressure',
    yaxis: 'y3',
    parameterName: 'pressure',
    line: {
      color: '#b94ec6',
      shape: 'hv'
    }
  },
  {
    name: 'odLiquidTempOccurrences',
    legendgroup: 'Outdoor Unit',
    dispName: 'Liquid Temp',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#DF661E'
    }
  },
  {
    name: 'odSubcoolOccurrences',
    legendgroup: 'Outdoor Unit',
    dispName: 'OD Subcool',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#388E3C'
    }
  },
  {
    name: 'odSuctionPressureOccurrences',
    legendgroup: 'Outdoor Unit',
    dispName: 'Suction Pressure',
    yaxis: 'y3',
    parameterName: 'pressure',
    line: {
      color: '#00FFFF'
    }
  },
  {
    name: 'odSuctionTemperatureOccurrences',
    legendgroup: 'Outdoor Unit',
    dispName: 'Suction Temp',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#3f51b5'
    }
  },
  {
    name: 'odSuperheatOccurrences',
    legendgroup: 'Outdoor Unit',
    dispName: 'OD Superheat',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#850f11'
    }
  },
  {
    name: 'outdoorTemps',
    legendgroup: 'Outdoor',
    dispName: 'ODT',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#ffe300'
    }
  }
]

const indoorUnit = [
  {
    name: 'actualAirflowOccurrences',
    dispName: 'Actual AirFlow',
    legendgroup: 'Indoor Unit',
    yaxis: 'y3',
    parameterName: 'airflow',
    line: {
      color: '#c3ab1e',
      dash: 'dashdot',
      shape: 'hv'
    }
  },
  {
    name: 'coilTempOccurrences',
    legendgroup: 'Indoor Unit',
    dispName: 'Evap/Liquid Temp',
    yaxis: 'y3',
    parameterName: 'temperature',
    line: {
      color: '#e16600',
      dash: 'dashdot'
    }
  },
  {
    name: 'gasSuperheatOccurrences',
    legendgroup: 'Indoor Unit',
    dispName: 'ID Superheat',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#450000',
      dash: 'longdashdot',
    },
    connectgaps: false,
  },
  {
    name: 'gasTempOccurrences',
    legendgroup: 'Indoor Unit',
    dispName: 'Gas Temp',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#b62e00',
      dash: 'longdashdot'
    }
  },
  {
    name: 'indoorEevStepPositionOccurrences',
    legendgroup: 'Indoor Unit',
    dispName: 'ID EEV Steps',
    yaxis: 'y3',
    parameterName: 'value',
    line: {
      color: '#c5cbff',
      shape: 'hv'
    }
  },
  {
    name: 'indoorReturnAirTempOccurrences',
    legendgroup: 'Indoor Unit',
    dispName: 'ID Return Air Temp',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#a993cd'
    }
  },
  {
    name: 'indoorSupplyAirTempOccurrences',
    legendgroup: 'Indoor Unit',
    dispName: 'ID Supply Air Temp',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#d9b0fd'
    }
  },
]

export const Parameters = [
  // ...workingParameters,
  ...indoorUnit,
  ...outDoorUnit,
  // {
  //   name: 'compressorCapacityOccurrences',
  //   dispName: 'compressor capacity',
  //   yaxis: 'y2',
  //   parameterName: 'capacity'
  // },
  // {
  //   name: 'odCompressorActualSpeedOccurrences',
  //   dispName: 'OD Compressor Capacity',
  //   yaxis: 'y2',
  //   parameterName: 'capacity'
  // },

  // {
  //   name: 'returnStaticPressureOccurrences',
  //   dispName: 'ID return static Pressure',
  //   yaxis: 'y3',
  //   parameterName: 'pressure'
  // },
  // {
  //   name: 'staticPressureOccurrences',
  //   dispName: 'ID static Pressure',
  //   yaxis: 'y3',
  //   parameterName: 'pressure'
  // },
  // {
  //   name: 'supplyStaticPressureOccurrences',
  //   dispName: 'ID supply static Pressure',
  //   yaxis: 'y2',
  //   parameterName: 'pressure'
  // },
  // {
  //   name: 'targetAirflowOccurrences',
  //   dispName: 'ID Target Airflow',
  //   yaxis: 'y3',
  //   parameterName: 'airflow'
  // }
]

export const Stages = [
  {
    name: 'COMPRESSOR_COOLING_STAGE_1',
    legendgroup: 'Stages',
    dispName: 'Cooling Stage1',
    yaxis: 'y',
    parameterName: 'capacity',
    line: {
      color: '#6BBEEA',
      shape: 'hv'
    },
    fill: "tozeroy",
  },
  {
    name: 'COMPRESSOR_COOLING_STAGE_2',
    legendgroup: 'Stages',
    dispName: 'Cooling Stage2',
    yaxis: 'y',
    parameterName: 'capacity', // capacity
    line: {
      color: '#1F729D',
      shape: 'hv'
    },
    fill: "tozeroy",
  }
]

export const Zone = [
  {
    name: 'coolingSetpointOccurrences',
    dispName: 'Cooling Setpoint',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      shape: 'hv',
      dash: 'dot',
      width: 1,
    },
    fill: 'none',
  },
  {
    name: 'heatingSetpointOccurrences',
    dispName: 'Heating Setpoint',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      dash: 'dash',
      shape: 'hv',
      width: 1,
    },
    fill: 'none',
  },
  {
    name: 'tempOccurrences',
    dispName: 'Temperature',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
    },
  },
  {
    name: 'humidityOccurrences',
    dispName: 'Relative Humidity',
    yaxis: 'y2',
    parameterName: 'humidity',
    line: {
      dash: 'dashdot',
    },
  },
  {
    name: 'relievingOccurrences',
    dispName: 'Relieving',
    yaxis: 'y2',
    mode: 'markers',
    line: {
      dash: 'dashdot',
    },
  }
]

export const Alerts = {
  name: 'alarmOccurrences',
}