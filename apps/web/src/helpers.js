const checkHours = (data, setError) => {
  const { storeOpensAt, storeClosesAt } = data
  if (!storeOpensAt || !storeClosesAt) {
    setError('storeClosesAt', null)
    return true
  }
  const [openHrs, openMins] = storeOpensAt.split(':')
  const [closeHrs, closeMins] = storeClosesAt.split(':')
  if (openHrs > closeHrs || (openHrs === closeHrs && openMins >= closeMins)) {
    setError('storeClosesAt', {
      message: 'Closing time should be after opening time'
    })
    return false
  }
  setError('storeClosesAt', null)
  return true
}

export { checkHours }
