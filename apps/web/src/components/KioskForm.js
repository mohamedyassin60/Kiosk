import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputForm from './InputForm'
import { get } from '../services/api'

const KioskForm = ({ isFetching, oldValues, onSubmit }) => {
  const requiredField = 'Required field *'
  const atLeast = 'must be at least 4 characters'
  const atMost = 'must be at most'
  const schema = yup
    .object({
      serialKey: yup
        .string()
        .required(requiredField)
        .min(4, `Serial Key ${atLeast}`)
        .max(30, `Serial Key ${atMost} 30 characters`),
      description: yup
        .string()
        .required(requiredField)
        .min(4, `Description ${atLeast}`)
        .max(200, `Description ${atMost} 200 characters`),
      storeOpensAt: yup
        .string()
        .required(requiredField)
        .min(4, `Opens at ${atLeast}`)
        .max(40, `Opens at ${atMost} 4 characters`),
      storeClosesAt: yup
        .string()
        .required(requiredField)
        .min(5, `Closes at ${atLeast}`)
        .max(5, `Closes at ${atMost} 4 characters`)
    })
    .required()

  const {
    register,
    setValue,
    getValues,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isValidating }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onBlur'
  })

  const checkHours = () => {
    const { storeOpensAt, storeClosesAt } = getValues()
    if (!storeOpensAt || !storeClosesAt) {
      setError('storeClosesAt', null)
      return true
    }
    const [openHrs, openMins] = storeOpensAt.split(':')
    const [closeHrs, closeMins] = storeClosesAt.split(':')
    if (openHrs > closeHrs || (openHrs === closeHrs && openMins >= closeMins)) {
      setError('storeClosesAt', {
        message: 'Closing time should be after opening time'
      })
      return false
    }
    setError('storeClosesAt', null)
    return true
  }

  const handleForm = async (data) => {
    const verified = checkHours(data)
    if (!verified) return
    if (!!oldValues && oldValues.serialKey === data.serialKey) {
      setError('serialKey', null)
      onSubmit(data)
      return
    }
    try {
      const isValid = await get(`kiosk/checkKey/${data.serialKey}`)
      if (isValid) {
        setError('serialKey', null)
        onSubmit(data)
      } else {
        setError('serialKey', {
          message: 'A kiosk with the same Serial Key already exists'
        })
      }
    } catch (e) {
      console.log('handleForm', e)
      setError('serialKey', {
        message: 'Could not verify Serial Key'
      })
    }
  }

  useEffect(() => {
    const data = getValues()
    checkHours(data)
  }, [isValidating, isSubmitting])

  useEffect(() => {
    Object.keys(oldValues || {}).forEach((key) => {
      setValue(key, oldValues[key])
    })
  }, [oldValues])

  return (
    <div className="w-full">
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <InputForm
            id="serialKey"
            name="Serial Key"
            type="text"
            errors={errors}
            register={register}
            disabled={!!isFetching}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <InputForm
            id="description"
            name="Description"
            type="text"
            errors={errors}
            register={register}
            disabled={!!isFetching}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <InputForm
            id="storeOpensAt"
            name="Opens at"
            type="time"
            errors={errors}
            register={register}
            disabled={!!isFetching}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <InputForm
            id="storeClosesAt"
            name="Closes at"
            type="time"
            errors={errors}
            register={register}
            disabled={!!isFetching}
            validation={{}}
          />
        </div>
      </div>
      <button
        className="px-6 py-4 my-5 font-bold text-white bg-newGreen rounded-full"
        disabled={isSubmitting || isFetching}
        onClick={handleSubmit(handleForm)}
      >
        Submit
      </button>
    </div>
  )
}

KioskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default KioskForm
