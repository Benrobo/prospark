
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello Prospark!</h1>
    <div class="card">
      <button id="counter" class="px-3 py-1 bg-blue-200 m-3" type="button"></button>
    </div>
  </div>
`

setupCounter(document.querySelector('#counter'))
