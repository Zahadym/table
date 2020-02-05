
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
      document.querySelector("#table").innerHTML += "<tr data-id=\"" + users[i].id + "\"><td class=\"id\">" + users[i].id + "</td><td><input data-date=\"" + users[i].id + "\" placeholder=\"" + users[i].date + "\" class=\"input-date-corr\" type=\"text\"><input class=\"hiden\" type=\"text\"></td><td><input data-subject=\"" + users[i].id + "\" placeholder=\"" + users[i].subject + "\" class=\"input-subject-corr\" type=\"text\"></td><td value=\"" + users[i].id + "\"  id=\"td-grade\"><input data-grade=\"" + users[i].id + "\" placeholder=\"" + users[i].grade + "\" class=\"input-grade-corr\" type=\"text\"></td><td class=\"table-row-close\"><button value=\"" + users[i].id +"\" id=\"btn-row-close\" data-btn=" + users[i].id + " type=\"button\" class=\"btn btn-outline-danger btn-width\">Удалить</button></td></tr>";
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



// добавление строки

document.querySelector("#btn-add").onclick = addItem;

function addItem() {
    event.preventDefault();
    let date2 = document.querySelector("#date").value;
    let date = document.querySelector("#input-date").value;
    let subject = document.querySelector("#input-subject").value;
    let grade = document.querySelector("#input-grade").value;
    let sumItem = users.length + 1;
    console.log(sumItem);
    if (grade > 0 && grade < 6 || grade == "Зачет"){
      if (date !== "" && subject !== "") {
        users.push({id: sumItem, date: date, date2: date2, subject: subject, grade: grade})
      }
      else {
        alert("Введены некоректно дата или предмет!");
      }
      
    }
    else {
      alert("Введена некоректная оценка!");
    }
    
    numberNew();
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
    let indexGrade = $(this).attr("data-grade") - 1;
    let indexGrade2 = $(this).val();
    if(indexGrade2 > 0 && indexGrade2 < 6 || indexGrade2 == "Зачет"){
      console.log(users[indexGrade].grade);
      users[indexGrade].grade = indexGrade2;
      console.log(users[indexGrade].grade);
      numberNew();
    } 
    else {
      $(this).val("");
      alert("Введена некоректная оценка!");
    }
  }
});

// редактирование предмета

$('#table').delegate('.input-subject-corr', 'keypress', function (e){
  
  if(e.which == 13) {
    let indexSubject = $(this).attr("data-subject") - 1;
    let indexSubject2 = $(this).val();
    if(indexSubject2 !== ""){
      console.log(users[indexSubject].subject);
      users[indexSubject].subject = indexSubject2;
      console.log(users[indexSubject].subject);
      numberNew();
    } 
    else {
      $(this).val("");
      alert("Введен некоректный предмет!");
    }
  }
});

// редактирование даты

$('#table').delegate('.input-date-corr', 'keypress', function (e){
  
  if(e.which == 13) {
    let indexDate = $(this).attr("data-date") - 1;
    console.log(indexDate);
    let indexDate2 = $(this).val();
    let indexDate3 = $(this).next().val();
    console.log(indexDate2);
    var arrD = indexDate2.split("-");
    arrD[1] -= 1;
    var d = new Date(arrD[2], arrD[1], arrD[0]);
    if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
      arrD[1] += 1;
      if (arrD[1] < 10) {
        arrD[1] = "0" + arrD[1];
        console.log(arrD[1]);
      }
      if (arrD[0] < 10) {
        arrD[0] = "0" + arrD[0];
        console.log(arrD[0]);
      }
      console.log(users[indexDate].date);
      indexDate2 = arrD[0] + "-" + arrD[1] + "-" + arrD[2]
      users[indexDate].date = indexDate2;
      users[indexDate].date2 = indexDate3;
      console.log(users[indexDate].date);
      numberNew();
    } else {
      $(this).val("");
      $(this).next().val("");
      alert("Введена некорректная дата!");
    }
  }
});


// преобразуем дату обратно для сортировки

$('#table').delegate('.input-date-corr', 'input change', function() {
  $(this).next().val(this.value.replace(/(\d*)-(\d*)-(\d*)/, '$3-$2-$1'));
})