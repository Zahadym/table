
// начальные предметы

let users = [
    {id: 1, date: "12-01-2020", date2: "2020-01-12", subject: "Математика", grade: 1},
    {id: 2, date: "11-01-2020", date2: "2020-01-11", subject: "Физика", grade: 2},
    {id: 3, date: "10-01-2020", date2: "2020-01-10", subject: "Русский язык", grade: 3},
    {id: 4, date: "09-01-2020", date2: "2020-01-09", subject: "Литература", grade: 4},
    {id: 5, date: "08-02-2020", date2: "2020-02-08", subject: "Химия", grade: 5},
    {id: 6, date: "10-02-2020", date2: "2020-02-10", subject: "Электротехника", grade: 'Зачет'}
  ];
see();


// отрисовка данных

function see() {
    document.querySelector("#table").innerHTML = "";
    for (i = 0; i < users.length; i++) {
      document.querySelector("#table").innerHTML += "<tr class=\"id\" id=a" + users[i].id + "><td>" + users[i].id + "</td><td>" + users[i].date + "</td><td>" + users[i].subject + "</td><td value=\"" + users[i].id + "\"  id=\"td-grade\"><input data-id=\"" + users[i].id + "\" placeholder=\"" + users[i].grade + "\" id=\"b" + users[i].id + "\" class=\"input-grade-corr\" type=\"text\"></td><td class=\"table-row-close\"><button value=\"" + users[i].id +"\" id=\"btn-row-close\" data-btn=" + users[i].id + " type=\"button\" class=\"btn btn-outline-danger btn-width\">Удалить</button></td></tr>";
    }
}

// нумерация

function numberNew() {
  for (i = 0; i < users.length; i++) {
    users[i].id = i + 1;
  }
  see();
}

// сортировка по №

document.querySelector("#id").onclick = sortId;

function sortId() {
    users.sort(function (a, b) {
        if (a.id > b.id) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        return 0;
      });
      numberNew();
}


// сортировка по оценке

document.querySelector("#grade").onclick = sortGrade;

function sortGrade() {
    users.sort(function (a, b) {
        if (a.grade > b.grade) {
          return 1;
        }
        if (a.grade < b.grade) {
          return -1;
        }
        return 0;
      });
      numberNew();
}

// сортировка по дате

document.querySelector("#btn-date").onclick = sortDate;

function sortDate() {
    users.sort(function (a, b) {
        if (a.date2 > b.date2) {
          return 1;
        }
        if (a.date2 < b.date2) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
      numberNew();
}


// сортировка по предмету

document.querySelector("#subject").onclick = sortSubject;

function sortSubject() {
    users.sort(function (a, b) {
        if (a.subject > b.subject) {
          return 1;
        }
        if (a.subject < b.subject) {
          return -1;
        }
        // a должно быть равным b
        return 0;
      });
      numberNew();
}



// добавление предмета

document.querySelector("#btn-add").onclick = addItem;

function addItem() {
    event.preventDefault();
    let date2 = document.querySelector("#date").value;
    let date = document.querySelector("#input-date").value;
    let subject = document.querySelector("#input-subject").value;
    let grade = document.querySelector("#input-grade").value;
    let sumItem = users.length + 1;
    if (grade > 0 && grade < 6 || grade == "Зачет"){
      if (date !== "" && subject !== "") {
        users.push({id: sumItem, date: date, date2: date2, subject: subject, grade: grade})
    }
    }
    
    see();
    document.querySelector("#date").value = "";
    document.querySelector("#input-date").value = "";
    document.querySelector("#input-subject").value = "";
    document.querySelector("#input-grade").value = "";
}

// привести дату к формату дд-мм-гггг

$('input[type="date"]').on('input change',function() {
  $(this).next().val(this.value.replace(/(\d*)-(\d*)-(\d*)/, '$3-$2-$1'));
})


// удаление строки

$('#table').delegate('.btn-width', 'click',  function (){
  let index = $(this).val();
  users.splice(index - 1, 1);
  see();
  numberNew();
});

// редактирование оценки


$('#table').delegate('.input-grade-corr', 'keypress',  function (e){
  
  if(e.which == 13) {
    let indexGrade = $(this).attr('data-id') - 1;
    let indexGrade2 = $(this).val();
    if(indexGrade2 > 0 && indexGrade2 < 6 || indexGrade2 == "Зачет"){
      console.log(users[indexGrade].grade);
      users[indexGrade].grade = indexGrade2;
      console.log(users[indexGrade].grade);
      numberNew();
    }
    else {
      $(this).val("");
    }
  }
});


