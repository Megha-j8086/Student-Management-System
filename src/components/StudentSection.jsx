

import React, { useEffect, useState } from 'react'
import StudentCard from "./StudentCard"

const StudentSection = () => {

  const [students, setStudents] = useState([])

  const [formLive, setFormLive] = useState(false)

  const [selectStudent, setSelectStudent] = useState(null)
  const [updateData, setUpdateData] = useState(false)


  const [name, setName] = useState("")
  const [batch, setBatch] = useState("")
  const [course, setCourse] = useState("")
  const [email, setEmail] =useState("")
  const [phoneno , setPhoneno] =useState("")

  useEffect(() => {            //this is used for print data in our page
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data) => {
        const formattedStudent = data.map((user) => ({
          key: user.id,
          id: user.id,
          name: user.name,
          course: "fullstack development",
          batch: "2024",
          email:user.email,
          phoneno:user.phone
        }))
        setStudents(formattedStudent)

      })
      .catch(() => {
        setError("failed to load student") //error handling
        setLoading("False")
      })

  }, [])


  //delete data

  const handleDelete = (id) => {
    const updateStudents = students.filter(
      (student) => student.id != id
    )
    setStudents(updateStudents)
  }
  const handleSubmit = () => {

    if (updateData) {

      const updatedStudents = students.map((student) =>
        student.id === selectStudent.id
          ? { ...student, name, course, batch,email, phoneno  }
          : student
      )

      setStudents(updatedStudents)
      setUpdateData(false)
      setSelectStudent(null)

    } else {

      const newStudents = {
        id: Date.now(),
        name: name,
        batch: batch,
        course: course,
        email:email,
        phoneno:phoneno
      }
      setStudents([...students, newStudents])
    }

    setName("")
    setCourse("")
    setBatch("")
    setEmail("")
    setPhoneno("")
    setFormLive(false)

  }
  //view 
  const handleView = (student) => {
    setSelectStudent(student)
  }
  //update
  const handleUpdate = (students) => {
    setUpdateData(true)
    setFormLive(true)

    setName(students.name)
    setCourse(students.course)
    setBatch(students.batch)
    setEmail(students.email)
    setPhoneno(students.phoneno)
    setSelectStudent(students)
  }

  // fetch('https://jsonplaceholder.typicode.com/users') used for print data in console
  // .then(response=> response.json())
  // .then(json => console.log(json))


  return (
    <div className="container my-5">

      {students.length === 0
        ?
        (<h4 className='text-danger text-center'>Students are not found</h4>)
        :
        <h3>Total students: {students.length}</h3>

      }
      <h2 className="text-center mb-4 fw-bold">Our Students</h2>


      {/* {students.length === 0 && (                      //conditional rendering
        
      )} */}

      <div className="row">
        {students.map((student) => (
          <StudentCard
            key={student.key}
            id={student.id}
            name={student.name}
            course={student.course}
            batch={student.batch}
            email={student.email}
            phoneno={student.phoneno}
            onView={() => handleView(student)}
            onEdit={() => handleUpdate(student)}
            onDelete={() => handleDelete(student.id)}
          />
        ))}

      </div>
      <button className='btn btn-primary' onClick={() => setFormLive(true)}>Add student</button>

      <button className='btn btn-warning ms-3' onClick={() => (
        setStudents([])
      )}>Clear All</button>

      {selectStudent && (
        <div className="view">
          <h4>Student Details</h4>
          <p><b>Name:</b> {selectStudent.name}</p>
          <p><b>Course:</b> {selectStudent.course}</p>
          <p><b>Batch:</b> {selectStudent.batch}</p>
          <p><b>Email:</b> {selectStudent.email}</p>
          <p><b>Phone No:</b> {selectStudent.phoneno}</p>

          <button
            className="btn btn-sm btn-dark mt-2"
            onClick={() => setSelectStudent(null)}
          >
            Close
          </button>
        </div>
      )}


      {
        formLive &&
        (<div className="popup-form">
          <h4>Add New Student</h4>

          {/* value={name} onChange={(e)=>{e.target.value}}-fetch values from the form */}

          <input type="text" placeholder="Name" className="form-control mb-2" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Course" className="form-control mb-2" value={course} onChange={(e) => setCourse(e.target.value)} />
          <input type="text" placeholder="Batch" className="form-control mb-2" value={batch} onChange={(e) => setBatch(e.target.value)} />
          <input type="text" placeholder="Email" className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="text" placeholder="Phone No" className="form-control mb-2" value={phoneno} onChange={(e) => setPhoneno(e.target.value)} />
          <button className="btn btn-success me-2" onClick={handleSubmit} >
            Submit
          </button>

          <button
            className="btn btn-secondary" onClick={() => setFormLive(false)}>
            Cancel
          </button>
        </div>)
      }



    </div>
  )
}

export default StudentSection
