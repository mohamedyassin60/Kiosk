import * as React from 'react'
import PropTypes from 'prop-types'

const InputForm = ({ id, name, type, register, errors, ...props }) => {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-black-400">
        {name}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className="mt-2 p-3 block w-full rounded-md border border-gray-200 focus:border-newGreen focus:ring-newGreen sm:text-sm"
        {...props}
        {...register(id)}
      />
      {(errors || {})[id] && (
        <p className="text-red-700">{errors[id].message}</p>
      )}
    </>
  )
}

InputForm.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  register: PropTypes.any.isRequired,
  errors: PropTypes.object.isRequired
}

export default InputForm
