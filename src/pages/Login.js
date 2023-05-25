import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'

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
            fetch("https://my-json-server.typicode.com/Yileri/CS391-JSON/users/" + username).then((res) => {
                return res.json();
            }).then((resp) => {
                if (Object.keys(resp).length === 0) {
                    alert('Please Enter Valid Username')
                } else {
                    if(resp.password === password) {
                        alert('Success!')
                        sessionStorage.setItem('username', username)
                        navigate('/')
                    } else {
                        alert('Please Enter Valid Credentials')
                    }
                }
            }).catch((err) => {
                alert('Login Failed: ' + err.message);
            })
        }
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            alert('Please Enter a Username');
        }

        if (password === '' || password === null) {
            result = false;
            alert('Please Enter a Password');
        }
        return result;
    }
    
    return (
        <div className="row">
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