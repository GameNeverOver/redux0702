import React, { useMemo, useRef, useState, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTodo, toggleTodo, delTodo } from './actions';
import './App.scss';

function ShowTodo({ todos, toggleTodo, delTodo }) {
    const [tab, setTab] = useState(1)
    return <div>
        <div className='tabChange'>
            <span onClick={() => setTab(1)} className={`${tab == 1 ? 'tab_act' : ''}`}>全部</span>
            <span onClick={() => setTab(2)} className={`${tab == 2 ? 'tab_act' : ''}`}>未完成</span>
            <span onClick={() => setTab(3)} className={`${tab == 3 ? 'tab_act' : ''}`}>已完成</span>
        </div>
        <ul>
            {
                tab == 1 && todos.map(item => <Li item={item} key={item.id} toggleTodo={toggleTodo} delTodo={delTodo}></Li>)
            }
            {
                tab == 2 && todos.filter(item => !item.toggle).map(item => <Li item={item} key={item.id} toggleTodo={toggleTodo} delTodo={delTodo}></Li>)
            }
            {
                tab == 3 && todos.filter(item => item.toggle).map(item => <Li item={item} key={item.id} toggleTodo={toggleTodo} delTodo={delTodo}></Li>)
            }
        </ul>
    </div>
}
const Li = memo(function Li({ item, toggleTodo, delTodo }) {
    const { content, id, toggle } = item;
    return <li>
        <b onClick={() => delTodo(id)} className='delContent'> <span>X</span> </b>
        <span className={toggle ? 'act' : ''}>{content}</span>
        <input type='checkbox'
            defaultChecked={toggle}
            onChange={e => toggleTodo(id)}
        />
    </li>
})

function App(props) {
    const iptRef = useRef(null);
    const { todo, dispatch} = props;
    const cbs = useMemo(() => {
        return bindActionCreators(
            { addTodo, toggleTodo, delTodo },
            dispatch
        );
    }, []);
    function addContent(value) {
        if (!value) return
        cbs.addTodo({
            content: value,
            id: Date.now(),
            toggle: false
        })
        iptRef.current.value = ''
    }
    return (
        <div className="App">
            <h2>TODOS</h2>
            <div className='input_btn'>
                <input type='text' ref={iptRef} 
                    onKeyUp={e => {
                        if (e.keyCode == 13) {
                            const value = iptRef.current.value.trim();
                            addContent(value)
                        }
                    }}
                /><button 
                    onClick={() => {
                        const value = iptRef.current.value.trim();
                        addContent(value)
                    }}
                >添加</button>
            </div>
            <ShowTodo todos={todo} {...cbs}/>
        </div>
    );
}

export default connect(
    function mapStateToProps(state) {
        return state;
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch };
    }
)(App);
