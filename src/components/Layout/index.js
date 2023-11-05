import React from 'react';
import { Layout, Menu, theme } from 'antd';
import "../../styles/layout.css"
import MenuLayout from '../menu/index';
import  HeaderLayout  from './header'; 

const { Header, Content, Footer, Sider } = Layout;
const App = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className='layout' >
      
     
      <Sider className='slidermenu'
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        
      >
         <div className="demo-logo-vertical" />
        <MenuLayout />
      </Sider>
      <Layout className='layout' >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <HeaderLayout />
        </Header>
        <div style={{height:'100%',marginBottom:20,overflow:'auto'}} >
          <Content
          className='dashboardContent'
        >
       
          {props.children}
         
        </Content>
        </div>
     
      </Layout>
    </Layout>
  );
};
export default App;