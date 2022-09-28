import _ from 'underscore'

export const getUpdatedLayoutWithRange = (allData, layout) => {
  const GRIDLINES = 4;
  const y2_AXIS = [];
  const y3_AXIS = [];

  _.filter(allData, d => d.yaxis === 'y2').forEach(r => y2_AXIS.push(...r.y))
  _.filter(allData, d => d.yaxis === 'y3').forEach(r => y3_AXIS.push(...r.y))



  // ************************************************************************
  // y2 Calculations

  const y2_min = Math.min(...y2_AXIS)
  const y2_max = Math.max(...y2_AXIS)
  let y2_range = y2_max

  if (y2_min < 0) {
      y2_range = y2_max - y2_min
  } else {
      y2_range = y2_max
  }

  y2_range = y2_range * 1000  // mult by 1000 to account for ranges < 1
  const y2_len = Math.floor(y2_range).toString().length

  const y2_pow10_divisor = Math.pow(10, y2_len - 1)
  const y2_firstdigit = Math.floor(y2_range / y2_pow10_divisor)
  const y2_max_base = y2_pow10_divisor * y2_firstdigit / 1000  // div by 1000 to account for ranges < 1

  const y2_dtick = y2_max_base / GRIDLINES

  // y2_pow10_divisor = Math.pow(10, y2_len - 1) / 1000  // reset for logging purposes
  // y2_range = y2_range / 1000  // range reset


  // ************************************************************************
  // y3 Calculations

  // const y3_AXIS = [-241.21, 365.24, 265.21, 204.34, 1129]
  const y3_min = Math.min(...y3_AXIS)
  const y3_max = Math.max(...y3_AXIS)
  let y3_range = y3_max

  if (y3_min < 0) {
      y3_range = y3_max - y3_min
  } else {
      y3_range = y3_max
  }

  y3_range = y3_range * 1000  // mult by 1000 to account for ranges < 1
  const y3_len = Math.floor(y3_range).toString().length

  const y3_pow10_divisor = Math.pow(10, y3_len - 1)
  const y3_firstdigit = Math.floor(y3_range / y3_pow10_divisor)
  const y3_max_base = y3_pow10_divisor * y3_firstdigit / 1000  // div by 1000 to account for ranges < 1

  const y3_dtick = y3_max_base / GRIDLINES

  // y3_pow10_divisor = Math.pow(10, y3_len - 1) / 1000  // reset for logging purposes
  // y3_range = y3_range / 1000  // range reset


  /**************************************************************************/
  // Capture the highest dtick ratio as your global dtick ratio.
  //
  // All other axes will have their positive and negative ranges scaled to
  // make their dtick_ratios match the global ratio. When the ratios match,
  // the gridlines match!
  /**************************************************************************/

  const y2_dtick_ratio = y2_range / y2_dtick
  const y3_dtick_ratio = y3_range / y3_dtick

  const global_dtick_ratio = Math.max(y2_dtick_ratio, y3_dtick_ratio)


  /**************************************************************************/
  // Calculate Range Minimums
  //
  // 1. This is done by first finding the negative ratio for all axes:
  //     1. what percentage of the range is coming from negative values
  //     2. multiply percentage by global ratio to get the percentage of the
  //        global ratio (percentage of total gridlines) that should be shown
  //        under the zero baseline.
  //
  //     NEGATIVE RATIO == NUMBER OF GRIDLINES NEEDED FOR NEGATIVE VALUES
  //
  // 2. Capturing the highest negative ratio as the global negative ratio
  //
  // 3. Then applying the negative ratio to all of your axis minimumsto get
  //    their new proportionally scaled range minimums
  /**************************************************************************/

  let negative = false  // Are there any negative values present
  let y2_negative_ratio = 0
  let y3_negative_ratio = 0
  let y2_range_min = 0
  let y3_range_min = 0


  if (y2_min < 0) {
      negative = true
      y2_negative_ratio = Math.abs(y2_min / y2_range) * global_dtick_ratio
  }

  if (y3_min < 0) {
      negative = true
      y3_negative_ratio = Math.abs(y3_min / y3_range) * global_dtick_ratio
  }

  // Increase the ratio by 0.1 so that your range minimums are extended just
  // far enough to not cut off any part of your lowest value
  const global_negative_ratio = Math.max(y2_negative_ratio, y3_negative_ratio) + 0.1

  // If any negative value is present, you must proportionally extend the
  // range minimum of all axes
  if (negative) {
      y2_range_min = (global_negative_ratio) * y2_dtick * -1
      y3_range_min = (global_negative_ratio) * y3_dtick * -1
  }


  // ************************************************************************
  // Calculate Range Maximums
  //
  // 1. This is done by first finding the positive ratio for all axes:
  //     1. what percentage of the range is coming from positive values
  //     2. multiply percentage by global ratio to get the percentage of the
  //        global ratio (percentage of total gridlines) that should be shown
  //        above the zero baseline.
  //
  //     POSITIVE RATIO == NUMBER OF GRIDLINES NEEDED FOR POSITIVE VALUES
  //
  // 2. Capturing the highest positive ratio as the global positive ratio
  //
  // 3. Then applying the positive ratio to all of your axis maximums to get
  //    their new proportionally scaled range maximums
  /**************************************************************************/

  const y2_positive_ratio = Math.abs(y2_max / y2_range) * global_dtick_ratio
  const y3_positive_ratio = Math.abs(y3_max / y3_range) * global_dtick_ratio

  // Increase the ratio by 0.1 so that your range maximums are extended just
  // far enough to not cut off any part of your highest value
  const global_positive_ratio = Math.max(y2_positive_ratio, y3_positive_ratio) + 0.1

  const y2_range_max = (global_positive_ratio) * y2_dtick
  const y3_range_max = (global_positive_ratio) * y3_dtick

  layout.yaxis2 = { ...layout.yaxis2, range: [y2_range_min, y2_range_max], dtick: y2_dtick}
  layout.yaxis3 = { ...layout.yaxis3, range: [y3_range_min, y3_range_max], dtick: y3_dtick,  scaleratio: y2_dtick / y3_dtick  }

  return layout
}

