
const TimeOfDayGreeting = () => {
    const today = new Date();
    
    if (today.getMinutes() < "10") {
        return (
            today.getMinutes() === "0" + today.getMinutes()
        )
    }
    const time = today.getHours() + ":" + today.getMinutes() +  ":"  + today.getSeconds();

    if (time > "5:00:00" && time <= "11:59:59") {
        return (
            "Good Morning"
        )
    }
    if (time > "12:00:00" && time <= "17:59:59") {
        return (
            "Good Afternoon"
        )
    } 
    if (time > "18:00:00" && time <= "19:59:59") {
        return (
            "Good Evening"
        )
    } 
    if (time > "20:00:00" && time <= "4:59:59") {
        return (
            "Good Evening"
        )
    }  
}


export default TimeOfDayGreeting
