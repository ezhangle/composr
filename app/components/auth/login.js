import { connect } from 'react-redux';
import cx from 'classnames';
import { signUp, signIn } from 'actions/authActions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'signin'
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser && nextProps.currentUser.uid) {
            this.props.pushState('/home');
        }
    }
    //
    //_signup() {
    //    return (
    //        <div>
    //            <div className="title">sign up</div>
    //            <input type="text" placeholder="email" ref="signup_mail" />
    //            <input type="password" placeholder="password" ref="signup_pass" />
    //            <div className="button" onClick={ () => this.signUp() }>sign up</div>
    //            <div className="footer">
    //                already a member?
    //                <span className="action" onClick={ () => this.setState({ mode: 'login' }) }>
    //                    sign in<i className="fa fa-sign-in" aria-hidden="true" />
    //                </span>
    //            </div>
    //        </div>
    //    );
    //}

    _signup() {
        return (
            <div>
                <div className="title">sign up</div>
                COMING SOON!
                <div className="footer">
                    already a member?
                    <span className="action" onClick={ () => this.setState({ mode: 'login' }) }>
                        sign in<i className="fa fa-sign-in" aria-hidden="true" />
                    </span>
                </div>
            </div>
        );
    }

    signUp() {
        this.props.signUp(this.refs.signup_mail.value, this.refs.signup_pass.value);
    }

    _signin() {
        return (
            <div>
                <div className="title">sign in</div>
                <input type="text" placeholder="email" ref="signin_mail" />
                <input type="password" placeholder="password" ref="signin_pass" />
                <div className="button" onClick={ () => this.signIn() }>sign in</div>
                <div className="footer">
                    not a member?
                    <span className="action" onClick={ () => this.setState({ mode: 'signup' }) }>
                        sign up now<i className="fa fa-sign-in" aria-hidden="true" />
                    </span>
                </div>
            </div>
        );
    }

    signIn() {
        this.props.signIn(this.refs.signin_mail.value, this.refs.signin_pass.value);
    }

    render() {
        return (
            <div>
                <div className="login-container">
                    { this.state.mode === 'signup' ? this._signup() : this._signin() }
                </div>
            </div>
        );
    }
}

export default connect(null, {signIn, signUp})(Login);;