import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUser, editUser } from "../../store/actions";

class DanhSachSinhVien extends Component {
  state = {
    mangSinhVien: [],
  };
  static getDerivedStateFromProps = (nextProps, currentState) => {
    if (nextProps.svSearch.length !== 0) {
      return (currentState.mangSinhVien = nextProps.svSearch);
    }
    return (currentState.mangSinhVien = nextProps.mangSinhVien);
  };
  render() {
    const { mangSinhVien } = this.state;
    const { flag } = this.props;
    // console.log(mangSinhVien);
    return (
      <div className="mt-10">
        <div>
          <table className="w-full p-6 text-xs text-left whitespace-nowrap mt-10">
            <thead className=" p-5 text-black text-lg">
              <tr className="">
                <th className="p-3"></th>
                <th className="p-3">Mã SV</th>
                <th className="p-3">Họ tên</th>
                <th className="p-3">Số điện thoại</th>
                <th className="p-3">Email</th>
                <th className="p-3"></th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody className="border-b text-lg">
              {!flag ? (
              <tr className="border-2">
                <td className="text-center text-3xl" colSpan={5}>
                  Không tìm thấy kết quả này
                </td>
              </tr>
            ) :(mangSinhVien.map((item, index) => (
                <tr key={item.id}>
                  <td></td>
                  <td>{item.maSV}</td>
                  <td>{item.fullName}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.email}</td>
                  <td></td>
                  <td>
                    <button
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 mb-2"
                      onClick={() => {
                        this.props.dispatch(deleteUser(item.id));
                      }}
                    >
                      Xoá
                    </button>
                    <button
                      className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      onClick={() => {
                        this.props.dispatch(editUser(item.id));
                      }}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.baiTapQuanLySinhVien,
  };
};

export default connect(mapStateToProps)(DanhSachSinhVien);
