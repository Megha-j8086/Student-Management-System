import React from 'react'

const StudentCard = (props) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card student-card shadow-sm">
        <div className="card-body">

          <p className="card-text">ID: {props.id}</p>
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">Course: {props.course}</p>
          <p className="card-text">Batch: {props.batch}</p>
          <p className="card-text">Email: {props.email}</p>
          <p className="card-text">Phone No: {props.phoneno}</p>

          <button
            className="btn btn-primary btn-sm me-2 p-2"
            onClick={props.onView}
          >
            View
          </button>
          <button
            className="btn btn-primary btn-sm me-2 p-2"
            onClick={props.onEdit}
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm p-2"
            onClick={props.onDelete}
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  )
}

export default StudentCard
