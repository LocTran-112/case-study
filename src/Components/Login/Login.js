import { useRef, useContext } from "react";
import validator from "validator";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import withModal from "../Reuse/Modal";
import SignUp from "../Register/SignUp";
import Context from "../../Context";


const Login = (props) => {
    const { toggleModal } = props;
    const { setUser, setIsLoading } = useContext(Context);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const history = useNavigate();

   

    const getInputs = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        return { email, password };
    };

    const isUserCredentialsValid = (email, password) => {
        return validator.isEmail(email) && password;
    };

    const signin = async (email, password) => {
        const url = 'https://6499a33d79fbe9bcf83faadd.mockapi.io/user_info';
        return await axios.get(url, { email, password })
        .then((res) => {
            console.log(res)
        })
    }

    const login = async () => {
        const { email, password } = getInputs();
        if (isUserCredentialsValid(email, password)) {
            setIsLoading(true);
            const authenticatedUser = await signin(email, password);
            if (authenticatedUser) {
                setUser(authenticatedUser.username)
                setIsLoading(false)
                history.push('/');
            }

            else {
                alert(`Fail to login, Please try again`)
                setIsLoading(false);
            }
        }
    }

    return (
        <div className="login__container">
            <div className="login__welcome">       
                <p>Instagram Clone</p>
            </div>
            <div className="login__form-container">
                <div className="login__form">
                    <input
                        type="text"
                        placeholder="Email or phone number"
                        ref={emailRef}
                    />
                    <input type="password" placeholder="Password" ref={passwordRef} />
                    <button className="login__submit-btn" onClick={login}>
                        Login
                    </button>
                    <span className="login__forgot-password">Forgot password?</span>
                    <span className="login__signup" onClick={() => toggleModal(true)}>Create New Account</span>
                </div>
            </div>
        </div>
    );
}

export default withModal(SignUp)(Login);

