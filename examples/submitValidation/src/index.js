import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import {
  App,
  Code,
  Markdown,
  Values,
  generateExampleBreadcrumbs
} from 'redux-form-website-template'

const dest = document.getElementById('content')
const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer)

let render = () => {
  const SubmitValidationForm = require('./SubmitValidationForm').default
  const readme = require('./SubmitValidation.md')
  const raw = require('!!raw-loader!./SubmitValidationForm')
  const rawSubmit = require('!!raw-loader!./submit')
  ReactDOM.render(
    <Provider store={store}>
      <App
        /**
         * This <App/> component only provides the site wrapper.
         * Remove it on your dev server if you wish. It will not affect the functionality.
         */
        version="7.1.0"
        path="/examples/submitValidation"
        breadcrumbs={generateExampleBreadcrumbs(
          'submitValidation',
          'Submit Validation Example',
          '7.1.0'
        )}
      >
        <Markdown content={readme} />

        <div style={{ textAlign: 'center' }}>
          <a
            href="https://codesandbox.io/s/XoA5vXDgA"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '1.5em' }}
          >
            <i className="fa fa-codepen" /> Open in Sandbox
          </a>
        </div>

        <h2>Form</h2>

        <SubmitValidationForm />

        <Values form="submitValidation" />

        <h2>Code</h2>

        <h4>submit.js</h4>

        <Code source={rawSubmit} />

        <h4>SubmitValidationForm.js</h4>

        <Code source={raw} />
      </App>
    </Provider>,
    dest
  )
}

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render
  const renderError = error => {
    const RedBox = require('redbox-react')
    ReactDOM.render(<RedBox error={error} className="redbox" />, dest)
  }
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }
  const rerender = () => {
    setTimeout(render)
  }
  module.hot.accept('./SubmitValidationForm', rerender)
  module.hot.accept('./SubmitValidation.md', rerender)
  module.hot.accept('./submit', rerender)
  module.hot.accept('!!raw-loader!./SubmitValidationForm', rerender)
  module.hot.accept('!!raw-loader!./submit', rerender)
}

render()
