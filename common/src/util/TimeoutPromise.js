const TimeoutPromise = (miliseconds, args = []) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(...args), miliseconds)
  })
}

export default TimeoutPromise
