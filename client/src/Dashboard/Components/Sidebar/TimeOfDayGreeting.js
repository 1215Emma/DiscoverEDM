
const TimeOfDayGreeting = () => {
    const today = new Date();
    const time = today.getHours() 
    if (time < 5 || time >= 18) {
        return (
            "Good Evening"
        )
    } 
    if (time < 18 && time >= 12) {
        return (
            "Good Afternoon"
        )
    } 
    if (time >= 5 && time < 12) {
        return (
            "Good Morning"
        )
    }
}


export default TimeOfDayGreeting
