import { useState, useEffect } from 'react'

const PREFIX = 'Productify: '

const useLocalStorage = (key, initialValue) => {
  const prefixedKey = PREFIX + key
  
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) {
      return JSON.parse(jsonValue)
    } else if (typeof initialValue === 'function') {
      return initialValue()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}

export default useLocalStorage