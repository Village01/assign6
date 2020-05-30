const Student = require ('../models/student')
exports.getIndext = (req, res, next) => {
    Student.find()
    .then(students => {
        res.render('student',{
            pageTitle: 'Students',
            students: students ,
            user:req.user
        },
        console.log(req.user)
        );
    })
    .catch(e => console.log(e));
   
}
 
exports.getCreateStudent = (req, res, next) => {
    
    res.render('create-student',{
       pageTitle: 'Create student',
       user:req.user
    });
}

exports.getdeletestudent = (req, res, next) => {
    Student.find()
    .then(students => {
        res.render('delete-student',{
            pageTitle: 'Delete Student',
            students: students ,
            user:req.user
        });
    })
    .catch(e => console.log(e));
}

exports.getupdatestudent = (req, res, next) => {
    Student.find()
    .then(students => {
        if (!students) {
          return res.redirect('/');
        }
        res.render('update-student', {
          pageTitle: 'Upadate Student',
          path: 'update-student',
//          students: student,
          hasError: false,
          errorMessage: null,
          validationErrors: [],
          students:students,
          user:req.user
        });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
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

exports.updatestudent = (req, res, next) => {
    
    Student.findById(req.body.studentId)
    .then(student => {
        if(!student) {
            return res.status(404).json({message: "user no found"});
            
        }
        student.age = req.body.age || student.age;
        student.name = req.body.name || student.name;
        student.description = req.body.description || student.description;
        return student.save();
    })
    .then((result) => {
        console.log(result)
        // res.redirect('/update-student');
        res.status(200).json({message: "ok"})
    })
    .catch(e => {console.log(e)})
}

