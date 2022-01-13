import * as React from 'react'
import { Field, useFormikContext } from 'formik'
import './formik-base-input.scss'

const FormikInputField = ({ name, label, ...rest }): JSX.Element => {
    // const formik = useFormikContext()
    // const touched = formik.touched
    // const errors = formik.errors
    let error = false
    let errorMsg = ''

    // try {
    //     error = eval(`touched.${name} && !!errors.${name}`);
    // } catch (err) {
    //     console.log("dasdas")
    // }
    // try {
    //     errorMsg = eval(`touched.${name} && errors.${name}`);
    // } catch (err) {
    //     console.log("dasdas")
    // }
    return <Field variant="outlined" fullWidth={true} error={error} helperText={errorMsg} name={name} label={label} {...rest}></Field>
}

export default FormikInputField
