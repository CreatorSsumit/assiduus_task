import { Button, Checkbox, Col, Row, Select,Modal, Upload } from 'antd'
import React, { useState } from 'react'
import  "../../styles/dashboard.css"
import CheckingAccount from "../charts/checking_account"
import InvoiceOwn from '../charts/invoice_own'
import AmountInOut from "../charts/amount_in_out"
import AccountWishlist from '../charts/account_wishlist'
import { UploadOutlined } from '@ant-design/icons';
import { dataSet } from "./dataset"


function Index() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(dataSet)
  const [selectedMonth,setSelectedMonth] = useState(new Date().toLocaleDateString('en-US', { month: 'short' }))

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  function removeDuplicates(array) {
    const seen = new Set();
    return array.filter((obj) => {
      const objString = JSON.stringify(obj);
      if (!seen.has(objString)) {
        seen.add(objString);
        return true;
      }
      return false;
    });
  }


  const getMonthInOption = ()=>{

   let temp =  data.map(e=>{
       let MonthinStringLong =  new Date(e.date).toLocaleDateString('en-US', { month: 'long' });
       let MonthinStringShort =  new Date(e.date).toLocaleDateString('en-US', { month: 'short' })
       return {
        value: MonthinStringShort,
        label: MonthinStringLong,
       }  
   })

   return removeDuplicates(temp)
  }


  const onChangeMonth=(e)=>{
  setSelectedMonth(e)
  }

  
  return (
   <Row className='dashboard' justify={'space-evenly'} >
    <Col  className='card_section' md={11} span={23}>
      <div className='cards_top_section'>
        Checking Account
       <Row justify={'end'}>
       <Select
      defaultValue="manage"
      options={[
        {
          value: 'manage',
          label: 'Manage',
        },
      ]}
    />
    &nbsp;
     <Select
      defaultValue={selectedMonth}
      value={selectedMonth}
      style={{width:120}}
      options={getMonthInOption()}
      onChange={onChangeMonth}
    />
       </Row>
      </div>
      <CheckingAccount data={data} selectedMonth={selectedMonth}  />
    </Col>
    <Col  className='card_section' md={11} span={23}>
    <div className='cards_top_section'>
        Invoices Owner to you
       <Button onClick={showModal} style={{background:'#E8EEFD',color:'#90C2BC',fontWeight:600}}>
           New Sales Invoice
       </Button>

       <Modal  title="Upload File" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <Upload >
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
      </Modal>


    </div>
   <InvoiceOwn /> 
    </Col>
    <Col  className='card_section' md={11} span={23}>
    <div className='cards_top_section'>
        Total cash flow
       <Row>
       <Checkbox className='checkbox_item_1'>In</Checkbox>
       <Checkbox className='checkbox_item_2'>Out</Checkbox>
       </Row>
    </div>
    <AmountInOut/>
    </Col>
    <Col  className='card_section' md={11} span={23}>
    <div className='cards_top_section' style={{padding:11.7}}>
      Account watchlist
    </div>
    <AccountWishlist />
    </Col>
   
   </Row>
  )
}

export default Index 