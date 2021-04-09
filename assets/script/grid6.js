const months = [...document.getElementsByClassName('month-grid')];
const container = document.getElementById('calendar');
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
    var monthName = monthElement.getAttribute('data-month');
    var monthParent = monthElement.parentNode;
    var index = Array.from(monthParent.children).indexOf(monthElement);
    console.log(monthName + ', ' + index);
    var monthLabel = document.getElementById('month-label');
    monthLabel.innerText = monthName;
}