import React, { Component } from 'react'
import DanhSachSinhVien from './DanhSachSinhVien'
import FormDangKy from './FormDangKy'

export default class BTQuanLySinhVien extends Component {
  render() {
    return (
      <div className='mx-20'>
        <FormDangKy />
        <DanhSachSinhVien />
      </div>
    )
  }
}
