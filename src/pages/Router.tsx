import { createBrowserRouter, Navigate } from 'react-router-dom'
import { App, ErrorComponent } from 'components/index'
import { SignIn } from 'pages/index'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: '',
        element: (
          <Navigate
            to="/signin"
            replace
          />
        ),
        errorElement: <ErrorComponent />
      },
      {
        path: '/signin',
        element: <SignIn />,
        errorElement: <ErrorComponent />
      }
    ]
  }
])
