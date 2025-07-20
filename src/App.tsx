import './index.css'

import { RouterProvider } from 'react-router-dom'

import { Button } from './components/ui/button'
import { router } from './routes'

export function App() {
  return <RouterProvider router={router} />
}
