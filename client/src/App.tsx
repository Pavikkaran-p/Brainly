import { Toaster } from "react-hot-toast"
import AppRoutes from "./routes/app.routes"

const App = () => {
  return (
    <div>
      <AppRoutes/>
      <div>
        <Toaster
        position="top-right"
        reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: "#64cc67",
              },
            },
            error: {
              style: {
                background: 'red',
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default App