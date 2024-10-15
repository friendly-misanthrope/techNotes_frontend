import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { selectUserById, useUpdateUserMutation } from "./usersSlice";

const EditUserView = () => {


  return (
    <div className="data-container">
      <h2 className="data-title">Edit [ username goes here ]</h2>
      <section className="full-card">
        <article className="full-data__card">

          <form>

            <div className="form-group full-card__section">
              <label htmlFor="username"
              className="card-section__header">Username</label>
              <input type="text"
              className="form-control"
              name="username" />
            </div>
            
          </form>
        </article>
      </section>
    </div>
  )
}
export default EditUserView;