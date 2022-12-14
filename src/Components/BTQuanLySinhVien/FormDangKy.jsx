import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser, updateUser, searchUser } from "../../store/actions";

class FormDangKy extends Component {
  stateDefault = {
    maSV: "",
    fullName: "",
    phoneNumber: "",
    email: "",
  };
  state = {
    key: '',
    values: this.stateDefault,
    errors: {},
  };
  handleState = (event) => {
    // console.log(event.target);
    const { name, value } = event.target;
    this.setState({
      values: {
        ...this.state.values,
        [name]: value,
      },
    });
  };
  handleBlur = (event) => {
    // console.log(event);
    const {
      name,
      title,
      validationMessage,
      validity: { valueMissing, patternMismatch },
    } = event.target;
    // console.log("patternMismatch: ", patternMismatch);

    let mess = "";
    if (valueMissing) {
      mess = `${title} không được bỏ trống`;
    }
    if (patternMismatch) {
      switch (name) {
        case "maSV":
          mess = `${title} phải từ 5 đến 15 ký tự`;
          break;
        case "fullName":
          mess = `${title} phải là ký tự không có dấu`;
          break;
        case "phoneNumber":
          mess = `${title} phải là số và 10 số`;
          break;
        default:
          mess = `${title} không đúng định dạng`;
      }
    }
    this.setState({
      errors: {
        ...this.state.errors,
        [name]: mess,
      },
    });
  };
  handleSubmit = (event) => {
    // console.log(event.target.checkValidity());
    event.preventDefault();
    if (!event.target.checkValidity()) {
      return;
    }
    if (this.props.selectedUser) {
      this.props.dispatch(updateUser(this.state.values));
    } else {
      this.props.dispatch(addUser(this.state.values));
    }

    this.setState({
      values: this.stateDefault,
    });
  };

  handleKey = (event) => {
    this.setState({
      key: event.target.value,
    });
  };

  handleSearch = () => {
    // console.log(this.state.key);
    this.props.dispatch(searchUser(this.state.key));
  };

  // Chuyển props thành state nội bộ của component
  static getDerivedStateFromProps = (nextProps, currentState) => {
    // console.log(nextProps, currentState);
    if (
      nextProps.selectedUser &&
      nextProps.selectedUser.id !== currentState.values.id
    ) {
      currentState.values = nextProps.selectedUser;
    }
    return currentState;
  };

  render() {
    const { selectedUser } = this.props;
    const { maSV, fullName, phoneNumber, email } =
      this.state.values;
    return (
      <div>
        <form
          id="form"
          noValidate
          onSubmit={this.handleSubmit}
        >
          <div className="p-10 bg-black text-white text-2xl text-left">Thông tin sinh viên</div>
          <div className="grid grid-cols-2 gap-5 mt-10 text-left">
            <div>
              <p>Mã Sinh Viên</p>
              <input
                type="text"
                required
                title="Mã sinh viên"
                value={maSV}
                name="maSV"
                pattern="^[a-zA-Z0-9_-]{5,15}$"
                placeholder="Mã sinh viên"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500 text-20">
                {this.state.errors.maSV}
              </span>
            </div>
            <div>
              <p>Họ tên</p>
              <input
                type="text"
                required
                title="Họ tên"
                value={fullName}
                name="fullName"
                pattern="^[A-Za-z]+$"
                placeholder="Họ tên"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                //   onChange={(event) => {
                //     this.setState({
                //       fullName: event.target.value,
                //     });
                //   }}
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500 text-20">
                {this.state.errors.fullName}
              </span>
            </div>
            <div>
              <p>Số điện thoại</p>
              <input
                type="text"
                required
                value={phoneNumber}
                title="Số điện thoại"
                name="phoneNumber"
                pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$"
                placeholder="Số điện thoại"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500 text-20">
                {this.state.errors.phoneNumber}
              </span>
            </div>
            <div>
              <p>Email</p>
              <input
                type="text"
                required
                value={email}
                title="Email"
                name="email"
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                placeholder="Email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={this.handleState}
                onBlur={this.handleBlur}
              />
              <span className="text-red-500 text-20">
                {this.state.errors.email}
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-start">
            <button
              type="submit"
              className={`text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${!this.props.selectedUser ? "" : "hidden"
                }
    `}
            >
              Thêm Sinh Viên
            </button>
            <button
              type="submit"
              className={`text-gray-900 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ${this.props.selectedUser ?? "hidden"
                }`}
            >
              Cập Nhật
            </button>
            <button
              type="reset"
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-5 mb-2"
            >
              Reset
            </button>
          </div>
          <div className="w-[50%] mt-5">
            <p className="text-left">Tìm sinh viên</p>
            <div className="flex justify-start">
              <input
                type="search"
                name="Search"
                value={this.state.key}
                placeholder="Nhập tên SV"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={this.handleKey} />
              <button
                type="button"
                title="search"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-5 mb-2"
                onClick={this.handleSearch}>
                Tìm
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.baiTapQuanLySinhVien,
  };
};

export default connect(mapStateToProps)(FormDangKy);
