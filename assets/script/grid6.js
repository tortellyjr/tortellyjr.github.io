const months = [...document.getElementsByClassName('month-grid')];
const container = document.getElementById('calendar');
const monthNamesPT = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
console.log("Months: " + months.length);

const options = {
    root: container,
    threshold: 0.51
}

const callback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.51) {
        //target.classList.add("is-visible");
            updateMonthName(entry.target);
            //console.log("is visible");
        } else {
        //target.classList.remove("is-visible");
            //console.log("is not visible");
        }
    })
}

const observer = new IntersectionObserver(callback, options);

months.forEach((month, index) => {
    console.log("ok: " + index);
    observer.observe(month);
});

function updateMonthName(monthElement){
    var monthName = monthElement.getAttribute('data-month-name');
    var monthParent = monthElement.parentNode;
    var index = Array.from(monthParent.children).indexOf(monthElement);
    //console.log(monthName + ', ' + index);
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
// Creates new calendar grid elements
calendar = document.getElementById('calendar');

function newDayElement(date, currentMonth){
    //date = new Date();
    // <div class="month-grid-day"><span class="month-grid-day-label">01</span></div>
    var dayElement = document.createElement('div');
    dayElement.classList.add('month-grid-day');
    if (!currentMonth)
        dayElement.classList.add('other-month');
        if (date.getDay() == 0)
        dayElement.setAttribute('data-week-day', 'dom');

    var dayLabelElement = document.createElement('span');
    dayLabelElement.setAttribute('class', 'month-grid-day-label');
    dayLabelElement.innerText = date.getDate();
    dayElement.appendChild(dayLabelElement);
    return dayElement;
}

function newMonthElement(date){
    var monthElement = document.createElement('div');
    monthElement.setAttribute('class', 'month-grid');
    monthName = monthNamesPT[date.getMonth()];
    monthElement.setAttribute('data-month-name', monthName);
    return monthElement;
    // <div class="month-grid" data-month-name="Março">
}

makeMonthGrid(new Date('2021-6-1'));
makeMonthGrid(new Date('2021-7-1'));
makeMonthGrid(new Date('2021-8-1'));
makeMonthGrid(new Date('2021-9-1'));
makeMonthGrid(new Date('2021-10-1'));
makeMonthGrid(new Date('2021-11-1'));
makeMonthGrid(new Date('2021-12-1'));

function makeMonthGrid(date){
    monthElement = newMonthElement(date);

    // primeiro dia do grid: a primeira segunda-feira antes do primeiro dia do mês
    firstDay = new Date(date.getYear(), date.getMonth(), 1);
    if (date.getDay() == 0)
        firstDay = decDate(date, 6);
    else
        firstDay = decDate(date, date.getDay()-1);
    //console.log('---> ' + date.getDay() + ', ' + firstDay.toString());
    
    // são 42 elementos na grade: 7 dias de semana e 6 linhas - 7 x 6 = 42
    i = 0;
    dateAux = new Date(firstDay);
    while (i < 42){
        currentMonth = (date.getMonth() == dateAux.getMonth());
        dayElement = newDayElement(dateAux, currentMonth);
        monthElement.appendChild(dayElement);
        //console.log('-> ' + dateAux.toString());
        dateAux = incDate(dateAux, 1);
        i++;
    }
    
    calendar.appendChild(monthElement);
    observer.observe(monthElement);
}
/*
Criar elemento do mes
Criar os elementos dos dias começando pela segunda-feira anterior ao dia 1, se esse dia não for segunda
- Verificar o dia da semana do dia 1
*/