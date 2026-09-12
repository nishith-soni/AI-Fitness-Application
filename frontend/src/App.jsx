import { Box, Button } from '@mui/material'
import './App.css'
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { useDispatch } from 'react-redux'
import { setCredentials } from './store/authSlice'
import ActivityForm from './components/ActivityForm'
import ActivityList from './components/ActivityList'

const ActivitiesPage = () => {
  return (
    <Box components="section" sx={{ p:2, border: '1px dashed grey'}}>
      <ActivityForm onActivitiesAdded = { () => window.location.reload() } />
      <ActivityList />
    </Box>
  );
}

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({token, user:tokenData}));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
      <Button variant="contained" color="#007bff"
              onClick={() => {
                logIn();
              }}> LOGIN </Button>
            ) : (
              // <div>
              //   <pre>{JSON.stringify(tokenData, null, 2)}</pre>
              // </div>

              <Box components="section" sx={{ p:2, border: '1px dashed grey'}}>
                <Routes>
                  <Route path="/activities" element={<ActivitiesPage />} />
                  <Route path="/activities/:id" element={<ActivityDetail />} />

                  <Route path="/" element={token ? <Navigate to="/activities" replace /> : <div>Welcome! Please Log In</div>} />
                </Routes>
              </Box>
            )}
    </Router>
  )
}

export default App
