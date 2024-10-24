import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';

const initialState = {
    questions: [],

    // 'loading', 'error', 'ready', 'active', 'finished'
    status: 'loading',
};

function reducer(state, action){
    switch(action.type){
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready',
            };
        case 'dataFailed':
            return {
                ...state,
                status: 'error',
                questions: [],
            }
        default:
            throw new Error('Unknown action');
    }
}

export default function App(){
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(function(){
        fetch('http://localhost:8000/questions')
        .then(response => response.json())
        .then(data => dispatch({type: 'dataReceived', payload: data}))
        .catch(error => dispatch({type: 'datafailed'}))
    },[])
    return (
        <div className='app'>
            <Header />

            <Main>
                <p>1/15</p>
                <p>Question?</p>
            </Main>
                
            
        </div>
    )
}