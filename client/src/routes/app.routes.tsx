import { Route, Routes } from 'react-router-dom'
import SignUp from '../pages/Auth/SignUp'
import SignIn from '../pages/Auth/SignIn'
import DashBoard from '../pages/DashBoard'
import ViewBrain from '../components/ViewBrain'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<DashBoard/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/dashboard' element={<DashBoard/>} />
        <Route path='/brain/share/:brainUrl' element={<ViewBrain/>} />
    </Routes>
  )
}

export default AppRoutes