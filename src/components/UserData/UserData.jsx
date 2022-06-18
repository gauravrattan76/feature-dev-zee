import React from "react";
import { Component } from "react";
import Pagination from "../../common/pagination/Pagination";
import {
  fetchUserListData,
  onChangePage,
  titleTextChange,
  SearchTitle,
  setDeleteData,
  deleteId,
  setRecordToEdit,
  editData,
  updateTitle,
} from "./UserFunctions";
import UserConstants from "../../utils/UserConstants";
import "./UserData.css";

class UserData extends Component {
  initialState = {
    userListData: [],
    pageOfItems: [],
    searchTitle: "",
    recordData: {
      id: "",
      title: "",
    },
  };

  constructor(props) {
    super(props);
    this.state = { ...this.initialState };
    this.fetchUserListData = fetchUserListData.bind(this);
    this.onChangePage = onChangePage.bind(this);
    this.titleTextChange = titleTextChange.bind(this);
    this.SearchTitle = SearchTitle.bind(this);
    this.setDeleteData = setDeleteData.bind(this);
    this.deleteId = deleteId.bind(this);
    this.setRecordToEdit = setRecordToEdit.bind(this);
    this.editData = editData.bind(this);
    this.updateTitle = updateTitle.bind(this);
  }

  componentDidMount() {
    try {
      this.fetchUserListData();
    } catch (ex) {
      //code for exception handling
      console.log("Exception", ex);
    }
  }

  render() {
    return (
      <div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Title"
            onChange={this.titleTextChange}
            value={this.state.searchTitle}
          />
          <button
            className="btn btn-primary"
            onClick={this.SearchTitle}
            disabled={!this.state.searchTitle.length}
            type="button"
            id="button-addon2"
          >
            {UserConstants.buttons.searchBtn}
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.pageOfItems.length > 0 &&
              this.state.pageOfItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <div>
                      <button
                        type="button"
                        className="btn btn-secondary mr-3"
                        onClick={() => this.setRecordToEdit(item.id)}
                        data-toggle="modal"
                        data-target="#editModal"
                      >
                        Edit Record
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => this.setDeleteData(item.id)}
                        data-toggle="modal"
                        data-target="#deleteModal"
                      >
                        Delete Record
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {this.state.userListData && (
          <div className="PaginationWrapper">
            <Pagination items={this.state.userListData} onChangePage={this.onChangePage} />
          </div>
        )}
        <div className="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {UserConstants.messages.deleteMessage}
                  {this.state.recordData.id}
                </h5>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  {UserConstants.buttons.closeBtn}
                </button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.deleteId}>
                  {UserConstants.buttons.deleteBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {UserConstants.messages.editMessage}
                  {this.state.recordData.id}
                </h5>
              </div>
              <div className="modal-body">
                <label className="mr-3">{UserConstants.messages.updateTitle}</label>
                <input type="text" onChange={this.updateTitle} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  {UserConstants.buttons.closeBtn}
                </button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editData}>
                  {UserConstants.buttons.editBtn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserData;
