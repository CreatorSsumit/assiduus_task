import Layout from "./components/Layout/index"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Accounts from "./components/accounts/index"
import Dashboard from "./components/dashboard/index"

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Layout>
     <Routes>
      <Route path='/'Component={Dashboard} />
      <Route path='account'Component={Accounts} />
     </Routes>
     </Layout>
     </BrowserRouter>
    </div>
  );
}

export default App;
