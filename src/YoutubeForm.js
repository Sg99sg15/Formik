import React, {useState} from 'react'
// import {useFormik} from 'formik'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import *as yup from 'yup'
import './App.css';
import TextError from './TextError';


const initialValues = {
    name: '',
    email: '',
    channel: '',
    comment: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumber: ['', ''],
    phNumber: ['']
}
const savedValues = {
    name: 'shashank',
    email: 'shashank100gupta@gmail.com',
    channel: 'shashank',
    comment: 'good',
    address: 'alwar',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumber: ['', ''],
    phNumber: ['']
}
const onSubmit = (values, onSubmitProps) => {
    console.log('form data', values)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm();
}

const validationSchema = yup.object({
    name: yup.string()
        .required('Required!!'),
    email: yup.string()
        .email('Invalid Email Format')
        .required('Required!!'),
    channel: yup.string()
        .required('Required!!')
})

const validateComments = value => {
    let error;
    if (!value) {
        error = 'Required!!'
    }
    return error
}
function YoutubeForm() {

    const [formValues, setFormValues] = useState(null);


    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
            // validateOnMount
        // validateOnChange={false}
        // validateOnBlur={false}
        >
            {
                formik => {
                    console.log('Formic props', formik)
                    return (
                        <Form>
                            <div className='form-control'>
                                <label htmlFor='name'>Name</label>
                                <Field type="text" id='name' name='name'
                                />
                                <ErrorMessage name='name' component={TextError} />
                            </div>
                            <div className='form-control'>
                                <label htmlFor='email'>Email</label>
                                <Field type="email" id='email' name='email'
                                />
                                <ErrorMessage name='email'>
                                    {
                                        errorMsg => <div className='error'>{errorMsg}</div>
                                    }
                                </ErrorMessage>
                            </div>
                            <div className='form-control'>
                                <label htmlFor='channel'>Channel</label>
                                <Field type="text" id='channel' name='channel'
                                />
                                <ErrorMessage name='channel' />
                            </div>
                            <div className='form-control'>
                                <label htmlFor='comments'>Comments</label>
                                <Field as='textarea' id='comment' name='comment' validate={validateComments} />
                                <ErrorMessage name='comment' component={TextError} />
                            </div>
                            <div className='form-control'>
                                <label htmlFor='address'> Address </label>
                                <FastField name='address'>
                                    {
                                        (props) => {
                                            const { field, form, meta } = props
                                            return (
                                                <div>
                                                    <input id='address' type="text" {...field} />
                                                    {
                                                        meta.touched && meta.error ? <div>{meta.error}</div> : null
                                                    }
                                                </div>
                                            )
                                        }
                                    }
                                </FastField>
                            </div>
                            <div className='form-control'>
                                <label htmlFor='facebook'>Fabebook Profile</label>
                                <Field type='text' id='facebook' name='social.facebook' />
                            </div>
                            <div className='form-control'>
                                <label htmlFor='twitter'>Twitter Profile</label>
                                <Field type='text' id='twitter' name='social.twitter' />
                            </div>
                            <div className='form-control'>
                                <label htmlFor='primaryPh'>Primary phone number</label>
                                <Field type='number' id='primaryPh' name='phoneNumber[0]' />
                            </div>
                            <div className='form-control'>
                                <label htmlFor='secondaryPh'>Secondary phone number</label>
                                <Field type='number' id='secondaryPh' name='phoneNumber[1]' />
                            </div>
                            <div className='form-control'>
                                <label>List of phone number</label>
                                <FieldArray name='phNumber'>
                                    {
                                        fieldArrayProps => {
                                            const { push, remove, form } = fieldArrayProps
                                            const { values } = form
                                            const { phNumber } = values
                                            return (
                                                <div>
                                                    {
                                                        phNumber.map((phNumber, index) => (
                                                            <div key={index}>
                                                                <Field name={`phNumber[${index}`} />
                                                                {
                                                                    index > 0 && (
                                                                        <button type='button' onClick={() => remove(index)}> - </button>
                                                                    )
                                                                }
                                                                <button type='button' onClick={() => push('')}> + </button>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    }
                                </FieldArray>
                            </div>
                            {/* <button type='button'
                                onClick={()=>formik.validateField('comments')}
                            >
                            Validate Comments</button>
                            <button type='button'
                                onClick={()=>formik.validateField('comments')}
                            >
                            Validate all</button>
                            <button type='button'
                                onClick={()=>formik.setFieldTouched('comments')}
                            >
                            Visit Comments</button>
                            <button type='button'
                                onClick={()=>formik.setTouched()('comments')}
                            >
                            Visit fields</button> */}
                            <button type='button' onClick={()=>setFormValues(savedValues)}>Load Saved data</button>
                            <button type='reset'>Reset</button>
                            <button type='submit' disabled={!(formik.isValid || formik.isSubmitting)}>Submit</button>
                        </Form>
                    )
                }
            }

        </Formik>
    )
}

export default YoutubeForm
