import { useRef, useContext, useState } from "react";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import Context from "../../Context";

function SignUp(props) {
    const { toggleModal } = props;

    const { setIsLoading } = useContext(Context);

    const fullnameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const filepickerRef = useRef(null);

    const [userAvatar, setUserAvatar] = useState(null);
    const [uploadedAvatar, setUploadedAvatar] = useState(null);

    const getInputs = () => {
        const fullname = fullnameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        return { fullname, email, password, confirmPassword };
    }

    const isSignupValid = ({ fullname, email, password, confirmPassword }) => {
        if (!userAvatar) {
            alert("Please upload your avatar");
            return false;
        }
        if (validator.isEmpty(fullname)) {
            alert("Please input your fullname");
            return false;
        }
        if (!validator.isEmail(email)) {
            alert("Please input your email");
            return false;
        }
        if (validator.isEmpty(password) || !validator.isLength(password, { min: 6 })) {
            alert("Please input your password. You password must have at least 6 characters");
            return false;
        }
        if (validator.isEmpty(confirmPassword)) {
            alert("Please input your confirm password");
            return false;
        }
        if (password !== confirmPassword) {
            alert("Confirm password and password must be the same");
            return false;
        }
        return true;
    };

    const createFormData = ({ id, email, password, fullname }) => {
        const formData = new FormData();
        formData.append('avatar', uploadedAvatar);
        formData.append('id', id);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('fullname', fullname);
        return formData;
    }

    const createUser = async ({ id, email, password, fullname }) => {
        const url = 'https://6499a33d79fbe9bcf83faadd.mockapi.io/user_info';
        const formData = createFormData({ id, email, password, fullname });
        return await axios.post(url, formData);
    }

    const signup = async () => {
        const { fullname, email, password, confirmPassword } = getInputs();
        if (isSignupValid({ fullname, email, password, confirmPassword })) {
            setIsLoading(true)
            const id = uuidv4()
            const response = await createUser({ id, email, password, fullname })
            if (response && response.data.message) {
                alert(response.data.message)
            } else {
                return response
            }
        }
        toggleModal(false);
        setIsLoading(false);
    }

    const removeUserAvatar = () => {
        filepickerRef.current.value = null;
        setUserAvatar(null);
        setUploadedAvatar(null);
    };

    const addUserAvatar = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            setUploadedAvatar(e.target.files[0]);
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setUserAvatar(readerEvent.target.result);
        };
    };

    return (
        <div className="signup">
            <div className="signup__content">
                <div className="signup__container">
                    <div className="signup__title">Sign Up</div>
                    <div className="signup__close">
                        <img
                            alt="close"
                            onClick={() => toggleModal(false)}
                            src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
                        />
                    </div>
                </div>
                <div className="signup__subtitle"></div>
                <div className="signup__form">
                    {userAvatar && <div className="signup__user-avatar">
                        <div>
                            <img src={userAvatar} alt="user-avatar" />
                            <svg onClick={removeUserAvatar} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>}
                    {!userAvatar && <div onClick={() => filepickerRef.current.click()} className="signup__avatar-picker">Choose File</div>}
                    <input
                        style={{ display: 'none' }}
                        onChange={addUserAvatar}
                        ref={filepickerRef}
                        type="file"
                        hidden
                    />
                    <input type="text" placeholder="Fulllname" ref={fullnameRef} />
                    <input type="text" placeholder="Email" ref={emailRef} />
                    <input type="password" placeholder="Password" ref={passwordRef} />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        ref={confirmPasswordRef}
                    />
                    <button className="signup__btn" onClick={signup}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;

