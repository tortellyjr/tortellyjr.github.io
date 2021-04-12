const months = [...document.getElementsByClassName('month-grid')];
const container = document.getElementById('calendar');
const monthNamesPT = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
var currentVisibleMonth = '';

const appointments = {
    "2021-04-02":[
        { "start":"09:00",
            "end":"10:00",
            "subject":"Academia" },
        { "start":"12:15",
            "end":"18:00",
            "subject":"Reunião" }
    ],
    "2021-07-02":[
        { "start":"09:00",
            "end":"11:24",
            "subject":"Academia" }
    ],
    "2021-07-08":[
        { "start":"15:00",
            "end":"16:30",
            "subject":"Teste" }
    ],
    "2021-08-04":[
        { "start":"10:00",
            "end":"12:00",
            "subject":"Aula" },
        { "start":"14:00",
            "end":"16:00",
            "subject":"Aula" },
        { "start":"16:00",
            "end":"18:00",
            "subject":"Dentista" }
    ]
}

const options = {
    root: container,
    threshold: 0.51
}

const callback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.51) {
            updateMonthName(entry.target);
            currentVisibleMonth = entry.target.id;
        } else {
        }
    })
}

const observer = new IntersectionObserver(callback, options);

months.forEach((month, index) => {
    observer.observe(month);
});

function updateMonthName(monthElement){
    var monthName = monthElement.getAttribute('data-month-name');
    var monthParent = monthElement.parentNode;
    //var index = Array.from(monthParent.children).indexOf(monthElement);
    var monthLabel = document.getElementById('month-label');
    monthLabel.innerText = monthName;
}


// FUNÇÔES PARA UM ARQUIVO .js DE UTILITÁRIOS
function decDate(date, days){ // subtrai da data a quantidade de dias fornecida
    dateAux = new Date(date);
    dateAux.setDate(date.getDate()-days);
    return dateAux;
}
function incDate(date, days){ // adiciona à data a quantidade de dias fornecida
    dateAux = new Date(date);
    dateAux.setDate(date.getDate()+days);
    return dateAux;
}
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
function calcTimePercent(time){
    var totalMinutesDay = 24*60;
    timeArray = time.split(':');
    if (timeArray.length > 1){
        var hours = parseInt(timeArray[0]);
        var minutes = parseInt(timeArray[1]);
        var totalMinutesToTime = hours*60 + minutes;
    }
    return totalMinutesToTime/totalMinutesDay*100;
}
function timeDiff(time1, time2){
    var totalMinutes1 = 0;
    var totalMinutes2 = 0;
    timeArray = time1.split(':');
    if (timeArray.length > 1){
        var hours = parseInt(timeArray[0]);
        var minutes = parseInt(timeArray[1]);
        totalMinutes1 = hours*60 + minutes;
    }
    timeArray = time2.split(':');
    if (timeArray.length > 1){
        var hours = parseInt(timeArray[0]);
        var minutes = parseInt(timeArray[1]);
        totalMinutes2 = hours*60 + minutes;
    }
    var diffMinutes = totalMinutes2 - totalMinutes1;
    var hours = Math.trunc(diffMinutes/60);
    var minutes = diffMinutes - (hours*60);
    var diffTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
    return diffTime;
}

// Creates new calendar grid elements
calendar = document.getElementById('calendar');

function newDayElement(date, currentMonth){
    today = new Date();
    // <div class="month-grid-day"><span class="month-grid-day-label">01</span></div>
    var dayElement = document.createElement('div');
    dayElement.classList.add('month-grid-day');
    if (!currentMonth) // If it is not a current month day, include the other-month class
        dayElement.classList.add('other-month');
    if (date.getDay() == 0) // If is sunday, includ the data-week-day attribute
        dayElement.setAttribute('data-week-day', 'dom');
    
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    if (date.toString() === today.toString()){
        dayElement.setAttribute('data-today', 'true');
    }
    id = date.getFullYear();
    id += '-' + (date.getMonth()+1).toString().padStart(2, '0');
    id += '-' + date.getDate().toString().padStart(2, '0');
    dayElement.id = id;

    // Label
    var dayLabelElement = document.createElement('span');
    dayLabelElement.setAttribute('class', 'month-grid-day-label');
    dayLabelElement.innerText = date.getDate();
    dayElement.appendChild(dayLabelElement);
    // Label

    // Appointments
    if (!isEmpty(appointments[[id]])){ // The day data from the appointments object
        //console.log('ok: ' + JSON.stringify(appointments[dateYMD]));
        dayAppointments = appointments[id];
        dayAppointments.forEach(function(app) { // Each appointments of the day
            // <div class="appointment" style="top:45.65%; height:6.52%;"></div>
            var appDiv = document.createElement('div');
            appDiv.classList.add('appointment');
            var startTimePercent = calcTimePercent(app['start']); // the percentage of the start time from the total minutes of the day - 12:00 is 50%
            appDiv.style.top = startTimePercent + '%';
            var duration = timeDiff(app['start'], app['end']);
            durationPercent = calcTimePercent(duration); // the percentage of the appointment interval from the total minutes of the day
            appDiv.style.height = durationPercent + '%';
            dayElement.appendChild(appDiv);
        });
    }
    // Appointments

    return dayElement;
}

function newMonthElement(date){
    var monthElement = document.createElement('div');
    monthElement.setAttribute('class', 'month-grid');
    monthName = monthNamesPT[date.getMonth()];
    monthElement.setAttribute('data-month-name', monthName);
    id = parseInt(date.getFullYear());
    id += '-' + date.getMonth().toString().padStart(2, '0');
    monthElement.setAttribute('id', id);
    return monthElement;
    // <div class="month-grid" data-month-name="Março">
}

makeMonthGrid(new Date('2021-1-1'));
makeMonthGrid(new Date('2021-2-1'));
makeMonthGrid(new Date('2021-3-1'));
makeMonthGrid(new Date('2021-4-1'));
makeMonthGrid(new Date('2021-5-1'));
makeMonthGrid(new Date('2021-6-1'));
makeMonthGrid(new Date('2021-7-1'));
makeMonthGrid(new Date('2021-8-1'));
makeMonthGrid(new Date('2021-9-1'));
makeMonthGrid(new Date('2021-10-1'));
makeMonthGrid(new Date('2021-11-1'));
makeMonthGrid(new Date('2021-12-1'));

today = new Date();
currentMonthId = today.getFullYear().toString() + '-' + today.getMonth().toString().padStart(2, '0');
currentVisibleMonth = document.getElementById(currentMonthId);
if (currentVisibleMonth != undefined){
    console.log(currentMonthId);
    currentVisibleMonth.scrollIntoView();
}

function makeMonthGrid(date){
    monthElement = newMonthElement(date);

    // First day of the grid: the first monday before the first month day (if the first month day is not monday)
    firstDay = new Date(date.getYear(), date.getMonth(), 1);
    if (date.getDay() == 0)
        firstDay = decDate(date, 6);
    else
        firstDay = decDate(date, date.getDay()-1);
    
    // The drid has 42 elements: 7 week days and 6 lines - 7 x 6 = 42
    i = 0;
    dateAux = new Date(firstDay);
    while (i < 42){
        currentMonth = (date.getMonth() == dateAux.getMonth());
        dayElement = newDayElement(dateAux, currentMonth);
        monthElement.appendChild(dayElement);
        dateAux = incDate(dateAux, 1);
        i++;
    }
    calendar.appendChild(monthElement);
    observer.observe(monthElement);
}