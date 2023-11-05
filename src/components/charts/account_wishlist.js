import React, { useState } from 'react'
import { Space, Table, Tag } from 'antd';
const columns = [
    {
        title: 'Account',
        dataIndex: 'account',
        key: 'account'
      },
      {
        title: 'This Month',
        dataIndex: 'this_month',
        key: 'this_month'
      },
      {
        title: 'YTD',
        dataIndex: 'ytd',
        key: 'ytd'
      },
]

function Account_wishlist() {
    const [data, setdata] = useState([
        {
          key: '1',
          account: 'John Brown',
          this_month: 32,
          ytd: 'New York No. 1 Lake Park',
          
        },
        {
          key: '2',
          account: 'Jim Green',
          this_month: 42,
          ytd: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          account: 'Joe Black',
          this_month: 32,
          ytd: 'Sydney No. 1 Lake Park',
         
        },
      ])
  return (
<div className='table_content'>
<Table columns={columns} dataSource={data} pagination={false} scroll={{ x: 400 }} />
</div>
  )
}

export default Account_wishlist