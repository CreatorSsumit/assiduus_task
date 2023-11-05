import { Input, Row } from 'antd'
import React from 'react'
import {BellFilled,SearchOutlined} from "@ant-design/icons"
import "../../styles/header.css"

function header() {
  return (
    <Row className='headerrow'  >
         <div className="demo-logo-header" />
     <div  style={{display:'flex',justifyContent:'flex-end',width:'100%'}}>
     <Input className='search'  prefix={<SearchOutlined />}  />
    
    <BellFilled style={{padding:10,fontSize:20}} />
    <img width={40} height={40} src='https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg' />
    
     </div>
    </Row>
  )
}

export default header