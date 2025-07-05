import React, { useRef, useState } from 'react';
import { postData } from '../../../../mocks/CallingAPI.js';
import Button from '../../../components/Button.jsx';
import CheckValidation from './CheckValidation.jsx';
import './Register.css';

export default function Register({ MoveImage }) {
    console.log('Register');

    const ResetRegisterInputs = () => {
        var inputs = document.querySelectorAll('input');
        inputs.forEach(function (input) {
            input.value = '';
        });
        setRegisterError({ value: '', name: '' });
        setRegisterSuccess('');
    };

    const [Role, setRole] = useState(null);
    const [Accept, setAccept] = useState(false);
    const [loading, setLoading] = useState(false);
    const [RegisterError, setRegisterError] = useState({ value: '', name: '' });
    const [RegisterSuccess, setRegisterSuccess] = useState(null);

    const Register = async (Username, Name, Password, Confirm) => {

        const Validate = CheckValidation(Username, Name, Role, Password, Confirm, Accept);
        console.log('Validate: ', Validate);
        if (Validate.value != 'OK') {
            console.log('Validation Is False');
            setRegisterError(Validate);
            setRegisterSuccess('');
            return;
        }

        const RegisterData = {
            name: Name,
            username: Username,
            password: Password,
            role: Role,
            curatorId: null,
            email: '',
            point: 0,
            joinedDate: null,
            dayStreak: 0,
            highestDayStreak: 0,
            // type: 'Regular',
            // image: 'https://i.pinimg.com/736x/50/2d/f5/502df527ee91c613c64586ed977ba316.jpg',
        };
        console.log('RegisterData:', RegisterData);

        try {
            setLoading(true);
            const result = await postData('api/user', RegisterData, '');
            console.log('result', result);

            setRegisterSuccess('Register success!');
            setRegisterError({ value: '', name: '' });
        } catch (error) {
            console.log('Register failed:', error);
            setRegisterError({ value: 'Register failed', name: 'Username, Name, Role, Password, Confirm, Accept' });
            setRegisterSuccess('');
        } finally {
            setLoading(false);
        }
    };

    const formRef = useRef(null);
    const handleSubmitFromOutSide = () => {
        console.log('handleSubmitFromOutSide!');
        if (formRef.current) {
            formRef.current.requestSubmit();
        }
    };

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        setRegisterError({ value: '', name: '' });
        setRegisterSuccess('');
        const Username = e.target.username.value;
        const Name = e.target.name.value;
        const Password = e.target.password.value;
        const Confirm = e.target.confirm.value;
        console.log({
            Username,
            Name,
            Role,
            Password,
            Confirm,
            Accept,
        });
        Register(
            Username,
            Name,
            Password,
            Confirm
        );
    };

    const handleAccept = () => {
        setAccept(p => !p);
    };

    return (
        <div className='card-body card-disappear' id='card-register'>
            <div className='bubble bubble-register bubble1'></div>
            <div className='bubble bubble-register bubble2'></div>
            <div className='bubble bubble-register bubble3'></div>
            <div className='title'>REGISTER</div>
            <form ref={formRef} onSubmit={handleSubmitRegister}>
                <div className='form-group form-input-register'>
                    <i className={`fa-solid fa-user ${RegisterError.name.includes('Username') && 'invalid-icon'}`}></i>
                    <input type='text' name='username' placeholder='Username' style={{ border: RegisterError.name.includes('Username') && '2px solid #dc3545', }} />
                </div>
                <div className='form-group form-input-register'>
                    <i className={`fa-solid fa-user-tag ${RegisterError.name.includes('Name') && 'invalid-icon'}`}></i>
                    <input type='text' name='name' placeholder='Full name' style={{ border: RegisterError.name.includes('Name') && '2px solid #dc3545', }} />
                </div>
                {/* <div className='form-group form-input-register'>
                    <i className={`fa-solid fa-phone ${RegisterError.name.includes('Phone') && 'invalid-icon'}`}></i>
                    <input type='text' name='phone' placeholder='Phone number' style={{ border: RegisterError.name.includes('Phone') && '2px solid #dc3545', }} />
                </div> */}
                <div className='form-group form-input-register'>
                    <i className={`fa-solid fa-user-group ${RegisterError.name.includes('Role') && 'invalid-icon'}`}></i>
                    <div className='role-group'>
                        {['Student', 'Parent'].map((role) => (
                            <label key={role} className='radio-label' style={{ border: RegisterError.name.includes('Role') && '2px solid #dc3545', }} >
                                <input
                                    type='radio'
                                    name='role'
                                    value={role}
                                    className='hidden-radio'
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                <div className='radio-box'>{role}</div>
                            </label>
                        ))}
                    </div>
                </div>
                <div className='form-group form-input-register'>
                    <i className={`fa-solid fa-key ${RegisterError.name.includes('Password') && 'invalid-icon'}`}></i>
                    <input type='password' name='password' placeholder='Password' style={{ border: RegisterError.name.includes('Password') && '2px solid #dc3545', }} />
                </div>
                <div className='form-group form-input-register'>
                    <i className='fa-solid fa-key dobble-icon'></i>
                    <i className={`fa-solid fa-key ${RegisterError.name.includes('Confirm') && 'invalid-icon'}`}></i>
                    <input type='password' name='confirm' placeholder='Confirm' style={{ border: RegisterError.name.includes('Confirm') && '2px solid #dc3545', }} />
                </div>
                <div className='form-check form-check-register'>
                    <a href='https://docs.google.com/document/d/1gpc5I74B66ldC76mSZsafEXuumeYlhSbV1ocqHCrrR4/edit?tab=t.0' className='provision' target='_blank'><b>PROVISION</b></a>

                    <div className='form-accept'>
                        <label className='label-accept' style={{ borderBottom: RegisterError.name.includes('Accept') && '2px solid #dc3545', color: RegisterError.name.includes('Accept') && '#dc3545', }}>
                            <input type='checkbox' id='checkbox-accept' checked={Accept} onChange={handleAccept} />
                            Accept provision
                        </label>
                    </div>
                </div>

                {RegisterError.value && <div className='message error-message'>{RegisterError.value}</div>}
                {RegisterSuccess && <div className='message success-message'>{RegisterSuccess}</div>}
                {!RegisterError.value && !RegisterSuccess && <div className='message'></div>}

                <div className='btn-box btn-register'>
                    <Button
                        width={'200px'}
                        height={'36px'}
                        border={'6px'}
                        radius={'8px'}
                        maincolor={'correct'}
                        onToggle={() => { if (!loading) { handleSubmitFromOutSide() } }}
                        active={loading}
                    >
                        SUBMIT
                    </Button>
                    <Button
                        width={'80px'}
                        height={'36px'}
                        border={'6px'}
                        radius={'8px'}
                        maincolor={'correct'}
                        onToggle={() => ResetRegisterInputs()}
                        active={false}
                    >
                        CLEAR
                    </Button>
                    {/* <button type='submit' className='btn btn-submit'>SUBMIT</button> */}
                    {/* <button type='reset' className='btn btn-reset' onClick={ResetRegisterInputs}>CLEAR</button> */}
                </div>
            </form>

            <div className='link-box'>
                <div className=''>Already had an account?</div>
                <div className='link' onClick={() => MoveImage()}>Sign in now!</div>
            </div>
        </div>
    )
}
