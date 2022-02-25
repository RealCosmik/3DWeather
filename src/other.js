
export function outsideMethod() {
    //Creating a date variable
    var date = new Date();

    //formatting time to be seen in the console
    var time1 = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    //logging the time in the console
    console.log(time1);
    
}
