import { COLORS } from '../../styles/colors';
import logo from '../../assets/logo.svg';
import { styles } from './common.styles';
import { Link } from 'react-router-dom';
import { CustomLabel } from './components/CustomLabel';

export function SignIn() {
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

                <form onSubmit={() => { }} className="space-y-4">
                    <CustomLabel text="Email:" id="email" />
                    <input
                        id='email'
                        type="email"
                        placeholder="example@example.com"
                        required
                        className={styles.input}
                    />
                    <CustomLabel text="Password:" id="password" />
                    <input
                        id='password'
                        type="password"
                        placeholder="password"
                        required
                        className={styles.input}

                    />
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
