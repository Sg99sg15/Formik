import React from 'react'
import { Formik, Form } from 'formik';
import * as yup from 'yup'
import FormikControl from './FormikControl';


function FormikContainer() {
    const dropdownOptions = [
        { key: 'Select an option', value: '' },
        { key: 'Option 1', value: 'option1' },
        { key: 'Option 2', value: 'option2' },
        { key: 'Option 3', value: 'option3' },
    ]
    const radioOptions = [
        { key: 'Option 1', value: 'roption1' },
        { key: 'Option 2', value: 'roption2' },
        { key: 'Option 3', value: 'roption3' },
    ]
    const checkboxOptions = [
        { key: 'Option 1', value: 'coption1' },
        { key: 'Option 2', value: 'coption2' },
        { key: 'Option 3', value: 'coption3' },
    ]
    const initialValues = {
        email: '',
        description: '',
        selectOption: '',
        radioOption: '',
        checkboxOption: [],
        birthDate:null,
    }
    const validationSchema = yup.object({
        email: yup.string().required('Required!!'),
        description: yup.string().required('Required!'),
        selectOption: yup.string().required('Required!'),
        radioOption: yup.string().required('Required!'),
        checkboxOption: yup.array().required('Required!'),
        birthDate: yup.date().required('Required!').nullable()
    })
    const onSubmit = values => console.log("FormData", values)
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <FormikControl control='input' type='email' label='Email' name='email' />
                    <FormikControl control='textarea' label='Description' name='description' />
                    <FormikControl control='select' label='Select a topic' name='selectOption' options={dropdownOptions} />
                    <FormikControl control='radio' label='Radio Topic' name='radioOption' options={radioOptions} />
                    <FormikControl control='checkbox' label='Checkbox Topic' name='checkboxOption' options={checkboxOptions} />
                    <FormikControl control='date' label='Pick a date' name='birthDate' options={checkboxOptions} />
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
        </>
    )
}

export default FormikContainer
