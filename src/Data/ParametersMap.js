const workingParameters = [
  {
    name: 'coilTempOccurrences',
    dispName: 'coilTemp',
    yaxis: 'y3',
    parameterName: 'temperature'
  }
]

const outDoorUnit = [
  {
    name: 'odLiquidPressureOccurrences',
    dispName: 'OD Liq pressure',
    yaxis: 'y3',
    parameterName: 'pressure',
    line: {
      color: '#b94ec6'
    }
  },
  {
    name: 'odLiquidTempOccurrences',
    dispName: 'OD Liq Temp',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#DF661E'
    }
  },
  {
    name: 'odSubcoolOccurrences',
    dispName: 'OD Subcool Temp',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#388E3C'
    }
  },
  {
    name: 'odSuctionPressureOccurrences',
    dispName: 'OD Suction pressure',
    yaxis: 'y3',
    parameterName: 'pressure',
    line: {
      color: '#00FFFF'
    }
  },
  {
    name: 'odSuctionTemperatureOccurrences',
    dispName: 'OD Suction Temp',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#3f51b5'
    }
  },
  {
    name: 'odSuperheatOccurrences',
    dispName: 'OD Superheat Temp',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#850f11'
    }
  },
  {
    name: 'outdoorTemps',
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
    dispName: 'airFlow',
    yaxis: 'y3',
    parameterName: 'airflow',
    line: {
      color: '#c3ab1e',
      dash: 'dot',
      shape: 'hv'
    }
  },
  {
    name: 'indoorEevStepPositionOccurrences',
    dispName: 'gas temp',
    yaxis: 'y3',
    parameterName: 'value',
    line: {
      color: '#c5cbff',
      shape: 'hv'
    }
  },
  {
    name: 'indoorReturnAirTempOccurrences',
    dispName: 'ID return air temp',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#a993cd'
    }
  },
  {
    name: 'indoorSupplyAirTempOccurrences',
    dispName: 'ID supply air temp',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: '#d9b0fd'
    }
  },
]

export const Parameters = [
  ...workingParameters,
  ...indoorUnit,
  ...outDoorUnit,
  // {
  //   name: 'compressorCapacityOccurrences',
  //   dispName: 'compressor capacity',
  //   yaxis: 'y2',
  //   parameterName: 'capacity'
  // },
  // {
  //   name: 'gasSuperheatOccurrences',
  //   dispName: 'gas superheat',
  //   yaxis: 'y3',
  //   parameterName: 'temperature'
  // },
  // {
  //   name: 'gasTempOccurrences',
  //   dispName: 'gas temp',
  //   yaxis: 'y2',
  //   parameterName: 'temperature'
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
    dispName: 'stage 1',
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
    dispName: 'stage 2',
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
    dispName: 'ICST',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: 'rgba(31, 114, 157, 1.0)',
      shape: 'hv',
      dash: 'dot',
      width: 1,
    },
    fill: 'none',
  },
  {
    name: 'heatingSetpointOccurrences',
    dispName: 'IHST',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: 'rgba(31, 114, 157, 1.0)',
      dash: 'dash',
      shape: 'hv',
      width: 1,
    },
    fill: 'none',
  },
  {
    name: 'tempOccurrences',
    dispName: 'IT',
    yaxis: 'y2',
    parameterName: 'temperature',
    line: {
      color: 'rgba(31, 114, 157, 1.0)',
    },
  },
  {
    name: 'humidityOccurrences',
    dispName: 'IHT',
    yaxis: 'y2',
    parameterName: 'humidity'
  }
]

export const Alerts = {
  name: 'alarmOccurrences',
}