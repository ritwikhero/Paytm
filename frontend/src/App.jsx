
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/signup" element = {< Signup />} />
          <Route path = "/signin" element = {< Signin />} />
          <Route path = "/dashboard" element = {< Dashboard />} />
          <Route path = "/signup" element = {< Send />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
