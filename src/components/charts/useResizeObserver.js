import React, { useEffect, useState } from 'react'

function useResizeObserver(ref) {
  const [dimentions, setdimentions] = useState(null)


    useEffect(() => {
      const observerTarget = ref.current;
      const resizeObserver = new ResizeObserver(entries=>{
        entries.forEach(e=>{
            setdimentions(e.contentRect)
        })
      })

      resizeObserver.observe(observerTarget)
    
      return () => {
        resizeObserver.unobserve(observerTarget)
      }
    }, [ref])
    


  return dimentions
}

export { useResizeObserver}