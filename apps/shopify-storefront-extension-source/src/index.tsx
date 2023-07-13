/* @refresh reload */
import './index.css'
import { render } from 'solid-js/web'
import { Router, memoryIntegration } from '@solidjs/router'
import App from './App'

const root = document.getElementById('blckgld-ltypgrm')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  )
}

render(
  () => (
    <Router source={memoryIntegration()}>
      <App />
    </Router>
  ),
  root!,
)
