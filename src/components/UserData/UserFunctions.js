import axios from "axios";
import apiURL from "../../utils/Urls";

export function fetchUserListData() {
    axios.get(apiURL.fetchUserDataApi).then((res) => {
        if ((res.status = 200)) {
            this.setState({
                userListData: res.data,
            });
        }
    });
};

export function onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
};

export function titleTextChange(event) {
    var searchText = event.target.value;
    this.setState({
        searchTitle: searchText,
    });
};

export function SearchTitle() {
    let itemsToDisplay = [];
    itemsToDisplay = this.state.userListData.filter((item) => item["title"].toLowerCase().includes(this.state.searchTitle.toLowerCase()));
    this.setState({ userListData: itemsToDisplay });
};

export function setDeleteData(id) {
    this.setState({
        recordData: {
            id: id,
        },
    });
};

export function deleteId() {
    let itemsToDisplay = [];
    itemsToDisplay = this.state.userListData.filter((item) => item["id"] !== this.state.recordData.id);
    this.setState({ userListData: itemsToDisplay });
};

export function setRecordToEdit(id) {
    this.setState({
        recordData: {
            id: id,
        },
    });
};

export function editData() {
    var pageData = this.state.pageOfItems;
    var indexOfUpdatedRow = this.state.pageOfItems.findIndex((item) => item.id === this.state.recordData.id);
    var ItemData = this.state.pageOfItems.find((item) => item.id === this.state.recordData.id);
    ItemData["title"] = this.state.recordData.title;
    pageData[indexOfUpdatedRow] = ItemData;
    this.setState({
        pageOfItems: pageData,
    });
};

export function updateTitle(event) {
    var editValue = event.target.value;
    this.setState((prevState) => ({
        recordData: {
            ...prevState.recordData,
            title: editValue,
        },
    }));
};