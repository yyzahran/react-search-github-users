import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <AuthWrapper>
            <BrowserRouter>
                <Routes>
                    {/* exact means only navigate to home page is the url is exact */}
                    <Route path='/' element={
                        <PrivateRoute>
                            <Dashboard /> </PrivateRoute>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='*' element={<Error />} />
                </Routes>
            </BrowserRouter>
        </AuthWrapper>
    );
}

export default App;
