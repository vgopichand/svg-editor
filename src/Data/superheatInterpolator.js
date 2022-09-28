import _ from 'underscore'

class SuperheatInterpolator {
  static interpolate (occurrences, stages, chartStartTime, chartEndTime) {
    if (!(occurrences && occurrences.length)) { return [] }

    // Only stage 1 is relevant since stage 2 is always a subset of stage 1.
    const coolingStage = _.find(stages, stage => { return stage.stage.indexOf('COOLING_STAGE_1') !== -1 })
    if (!coolingStage || !coolingStage.runOccurrences.length) { return [] }

    // A cooling phase is a series of continuous cooling stages.
    const interpolatedCoolingPhases = SuperheatInterpolator._interpolateCoolingPhases(coolingStage, chartStartTime, chartEndTime)

    const superheatOccurrencesWithinCoolingPhases =
      SuperheatInterpolator._findSuperheatOccurrencesWithinCoolingPhases(occurrences, interpolatedCoolingPhases)

    const interpolatedSuperheatOccurrences =
      SuperheatInterpolator._interpolateAgainstCoolingPhases(
        interpolatedCoolingPhases, superheatOccurrencesWithinCoolingPhases)

    return interpolatedSuperheatOccurrences
  }

  static _interpolateCoolingPhases (coolingStage, chartStartTime, chartEndTime) {
    const runOccurrences = _.clone(coolingStage.runOccurrences)

    // If first occurrence started before chart start time, interpolate started occurrence at beginning of timeframe.
    if (runOccurrences && runOccurrences[0].operation === 'stopped') {
      runOccurrences.unshift({ operation: 'started', occurredAt: chartStartTime })
    }

    // If first occurrence stopped after chart end time, interpolate stopped occurrence at end of timeframe.
    if (runOccurrences && runOccurrences[runOccurrences.length - 1].operation === 'started') {
      runOccurrences.push({ operation: 'stopped', occurredAt: chartEndTime })
    }

    const mergedRunOccurrences = SuperheatInterpolator._mergeConsecutiveRunOccurrences(runOccurrences)

    const started = SuperheatInterpolator._findOccurrencesByOperation(mergedRunOccurrences, 'started')
    const stopped = SuperheatInterpolator._findOccurrencesByOperation(mergedRunOccurrences, 'stopped')
    return _.map(_.zip(started, stopped), pair => {
      return {
        startedAt: pair[0],
        stoppedAt: pair[1]
      }
    })
  }

  static _findOccurrencesByOperation (occurrences, operation) {
    return _.chain(occurrences)
      .filter(occurrence => occurrence.operation === operation)
      .map(occurrence => occurrence.occurredAt)
      .value()
  }

  static _mergeConsecutiveRunOccurrences (runOccurrences) {
    const startedOccurrences = _.filter(runOccurrences, occurrence => occurrence.operation === 'started')

    _.each(startedOccurrences, started => {
      const stopped = _.find(runOccurrences, occurrence => {
        occurrence.operation === 'stopped' && occurrence.occurredAt === started.occurredAt // eslint-disable-line no-unused-expressions
      })

      if (stopped) {
        runOccurrences = _.without(runOccurrences, started, stopped)
      }
    })

    return runOccurrences
  }

  static _findSuperheatOccurrencesWithinCoolingPhases (occurrences, interpolateCoolingPhases) {
    return _.filter(occurrences, occurrence => {
      return _.any(interpolateCoolingPhases, phase => {
        return SuperheatInterpolator._doesOccurrenceExistWithinCoolingPhase(occurrence, phase)
      })
    })
  }

  static _interpolateAgainstCoolingPhases (coolingPhases, superheatOccurrences) {
    const additionalInterpolatedOccurrences = []

    _.each(coolingPhases, phase => {
      // Add a point at the start of a cooling phase.
      additionalInterpolatedOccurrences.push({ temperature: 0, occurredAt: phase.startedAt })

      // Adds a point at the end of a cooling phase.
      const lastSuperheatTempWithinStage =
        _.chain(superheatOccurrences)
          .filter(occurrence => occurrence.occurredAt <= phase.stoppedAt && occurrence.occurredAt >= phase.startedAt)
          .last()
          .value()

      if (lastSuperheatTempWithinStage && lastSuperheatTempWithinStage.temperature) {
        additionalInterpolatedOccurrences.push({
          temperature: lastSuperheatTempWithinStage.temperature,
          occurredAt: phase.stoppedAt
        })
      }

      // Stops the chart line at end of the cooling phase.
      additionalInterpolatedOccurrences.push({ temperature: null, occurredAt: phase.stoppedAt + 1 })
    })

    return _.sortBy(superheatOccurrences.concat(additionalInterpolatedOccurrences), occurrence => occurrence.occurredAt)
  }

  static _doesOccurrenceExistWithinCoolingPhase (occurrence, phase) {
    return phase.startedAt < occurrence.occurredAt && occurrence.occurredAt < phase.stoppedAt
  }
}

export default SuperheatInterpolator
