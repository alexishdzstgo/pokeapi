import React, { useState } from 'react';
import { changeUser } from '../store/slices/user.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserInput = () => {
    const [userName, setUserName] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = e => {
        e.preventDefault()
        dispatch(changeUser(userName))
        navigate("/pokedex")
    }
    return (
        <div className='user-input-img'>
            <div className='user-input text-center'>
                <div className='card-user'>   
                    <h3>Hello Trainer</h3>
                    <p className='p-text'>Give me your name to start</p>

                    <form className='' onSubmit={submit}>
                        <input 
                            className='beginning'
                            type="text" 
                            value={userName}
                            placeholder="Ingresa tu nombre"
                            onChange={e => setUserName(e.target.value)}
                        />
                        <button className='button'>Submit</button>
                    </form>
                </div>
            </div>
            
        </div>
    );
};

export default UserInput;