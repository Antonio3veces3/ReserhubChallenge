import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COLORS } from '../../styles/colors';
import logo from '../../assets/logo.svg';
import { styles } from './common.styles';
import { CustomLabel } from './components/CustomLabel';
import axios from 'axios';
import { config } from '../../config/config';

export function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false)

    const navigate = useNavigate();

    const handleSingUpSubmit = async (event: any) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${config.API_BASE_URL}/auth/signup`, {
                username,
                email,
                password,
            });

            if (response.status === 201) {
                console.log(response.data);
                localStorage.setItem('jwt', response.data.token);
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('email', response.data.user.email);
                setIsError(false)
                navigate('/home', { replace: false });
            }



        } catch (err: any) {
            console.error('Login error:', err.response?.data || err.message);
            setIsError(true)
        }
    };

    return (
        <div className={styles.containerMain} style={{ background: COLORS().BACKGROUND }}>
            <div className={styles.containerBody}>
                <div
                    className={styles.containerImage}
                >
                    <img src={logo} alt="Logo" className={styles.imageLogo} />
                </div>

                <h2 className={styles.textTitle}>
                    Create your account
                </h2>

                <form onSubmit={handleSingUpSubmit} className="space-y-4">
                    <CustomLabel text="Full name:" id="fullname" />
                    <input
                        id='fullname'
                        type="text"
                        placeholder="Full Name"
                        required
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <CustomLabel text="Email:" id="email" />
                    <input
                        id='email'
                        type="email"
                        placeholder="example@example.com"
                        required
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <CustomLabel text="Password:" id="password" />
                    <input
                        id='password'
                        type="password"
                        placeholder="Password"
                        required
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />

                    {isError && (
                        <p className='font-sm  text-red-800'>Error creating account. Please try again.</p>
                    )}

                    <button
                        type="submit"
                        className={styles.button}
                        style={{ backgroundColor: COLORS().GREEN_MAIN }}
                    >
                        Sign Up
                    </button>
                </form>

                <p className={styles.textButtom}>
                    Already have an account?
                    <Link to={{
                        pathname: "/auth/sign-in",
                    }}
                        className={styles.link}
                        style={{ color: COLORS().GREEN_MAIN }}
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    )
}
