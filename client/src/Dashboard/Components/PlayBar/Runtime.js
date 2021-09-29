import React, {useState, useEffect, useRef} from 'react'  
    
export const RuntimeCounter = ({ totalDurationMs }) => {
    // const [totalDurationMs, setTotalDurationMs] = useState()
    const [timerMinutes, setTimerMinutes] = useState("00")
    const [timerSeconds, setTimerSeconds] = useState("00")
    let timeRef = useRef()
    
    const StartTimer = () => {
        const trackEnding = new Date().getTime() + totalDurationMs
        
        timeRef = setInterval(()  => {
            const now = new Date().getTime()
            const trackLength = trackEnding - now
            const minutes = Math.floor((trackLength % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((trackLength % (1000 * 60)) / 1000)
            
            if (trackLength < 0) {
                clearInterval(timeRef.current)
            } else {
                setTimerMinutes(minutes)
                setTimerSeconds(seconds)
            }
        }, 1000)    
    }
    useEffect(() => {
        StartTimer();
        return () => {
            clearInterval(timeRef.current)
        }
    })

    return (
        <>
        {timerMinutes + ":" + timerSeconds}
        </>
    )
}
