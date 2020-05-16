const Student = require ('../models/student')
exports.getIndext = (req, res, next) => {
    Student.find()
    .then(students => {
        res.render('student',{
            pageTitle: 'Students',
            students: students 
        });
    })
    .catch(e => console.log(e));
   
}
 
exports.getCreateStudent = (req, res, next) => {
    
    res.render('create-student',{
       pageTitle: 'Create student'
    });
}

exports.getdeletestudent = (req, res, next) => {
    Student.find()
    .then(students => {
        res.render('delete-student',{
            pageTitle: 'Delete Student',
            students: students 
        });
    })
    .catch(e => console.log(e));
}

exports.getupdatestudent = (req, res, next) => {
    Student.find()
    .then(students => {
        res.render('update-student',{
            pageTitle: 'Update Student',
            students: students
        });
    })
    .catch(e => console.log(e));
}

exports.postCreateStudent = (req, res, next) => {
    const age = req.body.age;
    const name = req.body.name;
    const description = req.body.description;
    console.log(name, age, description);
    const student = Student({name: name, age: age, description: description});
    student
    .save()
    .then(result => {
        console.log(result);
        res.redirect('/create-student');
    })
    .catch(e => console.log(e));
}

exports.getStudent = (req, res, next) => {
    Student.find()
    .then(students => {
        res.status(200).json(students);
    })
    .catch(e => console.log(e))
}

exports.deleteStudent = (req, res, next) => {
    console.log(req.body.studentId);
    Student.findByIdAndDelete(req.body.studentId)
    .then(() => {
        res.redirect('/delete-student');
    })
    .catch(e => {console.log(e)})
}

exports.updateStudent = (req, res, next) => {
    console.log(req.body.studentId);
    Student.findByIdAndUpdate(req.body.studentId)
    const age1 = req.body.age1;
    const name1 = req.body.name1;
    const description1 = req.body.description1;
    const student = Student({name: name1, age: age1, description: description1});
    student
    .save()
    .then((result) => {
        console.log(students)
        res.redirect('/update-student');
    })
    .catch(e => {console.log(e)})
}
/*const deleteProduct = () => {
    const update = document.getElementById('main');
    fetch('/student', {
        method: 'GET',
    }).then(result => {
        return result.json();
    })
    .then(students => {
        let student = ''
        students.forEach(s => {
            student += `<div class="studentBox">
                <p>Name: ${s.name} </p>
                <p>Description: ${s.description} </p>
            </div>`
        })
        update.innerHTML = student;
    })
    .catch(e => console.log(e));
}*/
