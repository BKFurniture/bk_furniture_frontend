import React from 'react'

import Address from './Address'
import Option from './Option'
import Payment from './Payment'
import Review from './Review'

const steps = [<Review />, <Address />, <Payment />]
const StepContent = ({step}) => {
  return steps[step]
}

export default StepContent
