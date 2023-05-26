import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const[username, usernameupdate] = useState('')
    const[password, passwordupdate] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        sessionStorage.clear();
    })

    const ProceedLogin= (e) => {
        e.preventDefault();
        if(validate()) {
            fetch("http://localhost:3001/users/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                if (Object.keys(resp).length === 0) {
                    toast.warn('Please Enter a valid Username', {position: "top-center"});
                } else {
                    if(resp.password === password) {
                        toast.success('Success!', {position: "top-center"});
                        sessionStorage.setItem('username', username)
                        navigate('/')
                    } else {
                        toast.warn('Please Enter Valid Credentials', {position: "top-center"});
                    }
                }
            }).catch((err) => {
                toast.error('Login Failed: ' + err.message, {position: "top-center"});
            })
        }
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warn('Please Enter a Username', {position: "top-center"});
        }

        if (password === '' || password === null) {
            result = false;
            toast.warn('Please Enter a Password', {position: "top-center"});
        }
        return result;
    }
    
    return (
        <div className="row">
            <ToastContainer/>
            <div className="offset-lg-3 col-lg-6">
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Username <span className="errmsg">*</span></label>
                                <input value={username} onChange={e=>usernameupdate(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Password <span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e=>passwordupdate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Login</button>
                            <space> </space>
                            <Link className="btn btn-success" to={'/register'}>New User</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Login;