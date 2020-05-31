const deleteProduct = () => {
    const main = document.getElementById('main');
    console.log('hi')
    fetch('/student', {
        method: 'GET',
    })
    .then(result => {
        return result.json();
    })
    .then(students => {
        console.log(main);
        let studentListElement;
        for (let index in students){
            console.log(students);
            studentListElement += `<div class="studentBox">
            <p>Name: ${ students[index].name } </p>
            <p>Age: ${ students[index].age } </p>
            <p>Description: ${ students[index].description }</p>
        </div>`;
        }
        main.innerHTML = studentListElement;
        //console.log(students);
    })
    .catch(e => console.log(e))
}

const deleteStudent = () => {
    const main = document.getElementById('main')
    fetch('/student', {
        method:'DELETE'
    })
    .then(result => {
        return result.json()
    })
    .then (students => {
        let studentListElement ='';
        students.$isDeleted('/delete-student.name'=='studentBox(student.name)')
        students.remove()
        students.$isDeleted(false)
        students.$isDeleted()
        students.remove()
    })
}

// const updateStudent = () => {
//     const main = document.getElementById('main')
//     fetch('/student', {
//         method:'PATCH'
//     })
//     .then(result => {
//         return result.json()
//     })
//     .then (students => {
//         let studentListElement ='';
        
//     })
// }
const URL_ROOT = 'http://localhost:8888/';

const onsubmitHandler = (event, form) => {
    event.preventDefault();
    const name = form.parentNode.querySelector('[name=name]').value;
    const age = parseInt(form.parentNode.querySelector('[name=age]').value);
    const description = form.parentNode.querySelector('[name=description]').value;
    const studentId =  form.parentNode.querySelector('[name=studentId]').value;
    fetch('/update-student', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:  name,
            age: age,
            description: description,
            studentId: studentId
        })
    }).then(result => {
            return result.json();
        })
        .then(result => {
            console.log(result);
            location.reload();
        }).catch(e => {
            console.log(e);
        })

}