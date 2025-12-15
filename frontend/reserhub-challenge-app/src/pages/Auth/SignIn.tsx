import { useState } from 'react';
import { COLORS } from '../../styles/colors';
import logo from '../../assets/logo.svg';
import { styles } from './common.styles';
import { Link, useNavigate } from 'react-router-dom';
import { CustomLabel } from './components/CustomLabel';
import axios from 'axios';
import { config } from '../../config/config';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false)


    const navigate = useNavigate();

    const handleLoginSubmit = async (event: any) => {
        event.preventDefault();


        try {
            const response = await axios.post(`${config.API_BASE_URL}/auth/signin`, {
                email,
                password,
            });

            if (response.status === 200) {
                const token = response.data.token;
                const { username, email } = response.data.user;
                localStorage.setItem('jwt', token);
                localStorage.setItem('username', username);
                localStorage.setItem('email', email);

                setIsError(false)
                navigate('/home');
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
                    Welcome!
                </h2>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
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
                        placeholder="password"
                        required
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                    />

                    {isError && (
                        <p className='font-sm  text-red-800'>Invalid user, please try again.</p>
                    )}
                    <button
                        type="submit"
                        className={styles.button}
                        style={{ backgroundColor: COLORS().GREEN_MAIN }}
                    >
                        Login
                    </button>
                </form>

                <p className={styles.textButtom}>
                    Do you need a new account?
                    <Link to={{
                        pathname: "/auth/sign-up",
                    }}
                        className={styles.link}
                        style={{ color: COLORS().GREEN_MAIN }}
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    )
}
