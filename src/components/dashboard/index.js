import { Button, Checkbox, Col, Row, Select,Modal, Upload } from 'antd'
import React, { useState } from 'react'
import  "../../styles/dashboard.css"
import CheckingAccount from "../charts/checking_account"
import InvoiceOwn from '../charts/invoice_own'
import AmountInOut from "../charts/amount_in_out"
import AccountWishlist from '../charts/account_wishlist'
import { UploadOutlined } from '@ant-design/icons';


function Index() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      defaultValue="jan"
      options={[
        {
          value: 'jan',
          label: 'January',
        },
      ]}
    />
       </Row>
      </div>
      <CheckingAccount />
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