import React, { useState, useRef } from 'react'
// useRef allows us to extract data from our tags
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import AuthService from '../services/auth.service'

// Component
import FormGroup from "./common/FormGroup";
import ButtonSpinner from './common/ButtonSpinner'

// Helper
import { resMessage } from '../utilities/functions.utilities'

//function give to react-validator
const required = (value) => {
    if (!value) {
        return (
            <div className='alert alert-danger' role='alert'>
                This field is required!
            </div>
        )
    }
}

const Login = (props) => {
    const form = useRef()
    const checkBtn = useRef()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    // Store the username in our username state
    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    // Store the username in our username state
    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        //clear out previous messages
        setMessage('')
        setLoading(true)
        //validates every field in your form
        form.current.validateAll()

        //validator stores errors and we can check if error exists
        console.log(checkBtn.current.context._errors)
        if (checkBtn.current.context._errors.length === 0) {
            AuthService.login(username, password)
                .then(
                    () => {
                        props.history.push("/")
                        window.location.reload()
                    },
                    //another way of formatting a .catch()
                    (error) => {
                        //Setting loading to false and return the error
                        setLoading(false)
                        //checking
                        setMessage(resMessage(error))
                    }
                )
        } else {
            setLoading(false)
        }
    }
    
    return (
        <div className='col-md-12'>
            <div className='card card-container'>
                <img
                    src="https://www.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleLogin} ref={form}>
                    <FormGroup text='username'>
                        <Input
                            type='text'
                            className='form-control'
                            name='username'
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </FormGroup>

                    <FormGroup text='password'>
                        <Input
                            type='password'
                            className='form-control'
                            name='password'
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </FormGroup>

                    <ButtonSpinner text="Login" loading={loading} />

                    {message && (
                        <div className='form-group'>
                            <div className='alert alert-danger' role='alert'>
                                {message}
                            </div>
                        </div>
                    )}
                    {/* checkbutton needs to be used for the react validation for it to submit the form; required but not used since we have our own custom button */}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    )
}

export default Login
