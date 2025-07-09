import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../../mocks/CallingAPI.js';
import Button from '../../../components/Button.jsx';
import { useAuth } from '../../../hooks/AuthContext/AuthContext.jsx';
import './Login.css';

export default function Login({ MoveImage }) {
    console.log('Login');
    const { login } = useAuth();
    const navigate = useNavigate();

    const ResetLoginInputs = () => {
        var inputs = document.querySelectorAll('input');
        inputs.forEach(function (input) {
            input.value = '';
        });
        setLoginError({ value: '', name: '' });
    };

    const [Remember, setRemember] = useState(false);
    const [loading, setLoading] = useState(false);
    const [LoginError, setLoginError] = useState({ value: '', name: '' });

    const Login = async (Username, Password) => {
        if (!Username) {
            console.error('Invalid value');
            setLoginError({ value: 'Invalid username', name: 'Username' });
            return;
        }
        if (!Password) {
            console.error('Invalid value');
            setLoginError({ value: 'Invalid password', name: 'Password' });
            return;
        }

        const LoginData = {
            username: Username,
            password: Password,
        };
        console.log('LoginData:', LoginData);

        try {
            setLoading(true);
            const result = await postData('api/user/loginusername', LoginData, '');
            console.log('result', result);
            login(result);

            navigate('/');
        } catch (error) {
            console.log('Login failed:', error);
            setLoginError({ value: 'Login failed', name: 'Username or Password' });
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

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoginError({ value: '', name: '' });
        const Username = e.target.username.value;
        const Password = e.target.password.value;
        console.log({ Username, Password });
        Login(Username, Password);
    };

    const handleRemember = () => {
        setRemember(p => !p);
    };

    return (
        <div className='card-body card-appear' id='card-login'>
            <div className='bubble bubble-login bubble1'></div>
            <div className='bubble bubble-login bubble2'></div>
            <div className='bubble bubble-login bubble3'></div>
            <div className='title'>LOGIN</div>
            <form onSubmit={handleSubmitLogin} ref={formRef}>
                <div className='form-group form-input-login'>
                    <i className={`fa-solid fa-user ${LoginError.name.includes('Username') && 'invalid-icon'}`}></i>
                    <input type='text' name='username' placeholder='Username' style={{ border: LoginError.name.includes('Username') && '2px solid #dc3545', }} />
                </div>
                <div className='form-group form-input-login'>
                    <i className={`fa-solid fa-key ${LoginError.name.includes('Password') && 'invalid-icon'}`}></i>
                    <input type='password' name='password' placeholder='Password' style={{ border: LoginError.name.includes('Password') && '2px solid #dc3545', }} />
                </div>
                <div className='form-check form-check-login'>
                    <div className='form-remember'>
                        <label className='label-remember'>
                            <input type='checkbox' id='checkbox-remember' checked={Remember} onChange={handleRemember} />
                            Remember me
                        </label>
                    </div>

                    <a href='#' className='forget-link'>Forgot password?</a>
                </div>

                {LoginError && <div className='message error-message'>{LoginError.value}</div>}
                {!LoginError && <div className='message error-message'></div>}

                <button type='submit' style={{ display: 'none' }}></button>

                <div className='btn-box btn-login'>
                    <Button
                        width={'200px'}
                        height={'36px'}
                        border={'6px'}
                        radius={'8px'}
                        maincolor={'correct'}
                        onToggle={() => handleSubmitFromOutSide()}
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
                        onToggle={() => ResetLoginInputs()}
                        active={false}
                    >
                        CLEAR
                    </Button>
                    {/* <button type='submit' className='btn btn-submit'>SUBMIT</button> */}
                    {/* <button type='reset' className='btn btn-reset' onClick={ResetLoginInputs}>CLEAR</button> */}
                </div>
            </form>

            <div className='other-method'>
                <hr />
                <div>Or</div>
                <hr />
            </div>

            <div className='google-method'>Login with Google (Coming soon)</div>

            <div className='link-box'>
                <div>Have no accounts yet?</div>
                <div className='link' onClick={() => MoveImage()}>Sign up now!</div>
            </div>
        </div>
    )
}
