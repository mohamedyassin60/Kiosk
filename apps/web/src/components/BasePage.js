import React from 'react'
import PropTypes from 'prop-types'

const BasePage = ({ header, children }) => {
  return (
    <div className="container mx-auto px-4 max-w-5xl h-screen">
      <div className="flex flex-col w-full h-full">
        {header}
        <div className="pt-4 px-4 bg-white border-b-4 border-b-newGreen rounded-sm">
          {children}
        </div>
      </div>
    </div>
  )
}

BasePage.propTypes = {
  header: PropTypes.object.isRequired
}

export default BasePage
