import React, { useState } from 'react'
import { DashboardFilled ,AccountBookFilled,MoneyCollectFilled,ReadFilled,UserOutlined,ContactsFilled} from '@ant-design/icons';
import { Menu } from 'antd';


function MenuLayout() {
    const [menus] = useState([
        {key:'dashboard',icon:<DashboardFilled />,label:'Dashboard'},
        {key:'accounts',icon:<AccountBookFilled />,label:'Accounts'},
        {key:'payroll',icon:<MoneyCollectFilled />,label:'Payroll'},
        {key:'report',icon:<ReadFilled />,label:'Reports'},
        {key:'advisor',icon:<UserOutlined />,label:'Advisor'},
        {key:'contact',icon:<ContactsFilled />,label:'Contacts'},
    ])

    const [openKeys, setOpenKeys] = useState(['dashboard']);


    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        // if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        //   setOpenKeys(keys);
        // } else {
          setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        // }
      };


  return (
    <div >
         <Menu className='navigationmenu'
      mode="inline"
      openKeys={openKeys}
      defaultSelectedKeys={['dashboard']}
      onOpenChange={onOpenChange}
      items={menus}
    />
    </div>
  )
}

export default MenuLayout