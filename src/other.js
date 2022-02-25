
export function outsideMethod() {
    //Creating a date variable
    outsideMethod2();

    var date = localtime;
    //Local time in yyyy-MM-dd HH:mm format

    //formatting time to be seen in the console
    var time1 = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    //logging the time in the console
    console.log(time1);
    
}
