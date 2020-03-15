import React from 'react';
import {Input, Row, Col, Button, Modal} from 'antd'
import {UserOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import UserService from "./services/UserService";
import StateMachine from '@followwinter/state-machine';

const {confirm} = Modal

class App extends React.Component {
    state = {
        show: false
    }

    showBindModal = () => new Promise(((resolve) => {
        confirm({
            title: '你的账户还未绑定邮箱',
            icon: <ExclamationCircleOutlined/>,
            content: '是否现在绑定？',
            okText: '是',
            cancelText: '暂时不绑定',
            onOk() {
                resolve(0)
            },
            onCancel() {
                resolve(1)
            },
        });
    }))

    toastLoginFail = () => alert('login fail')

    forwardToIndex = () => alert('jump to index')

    forwardToBind = () => alert('jump to bind')

    stateMachine = new StateMachine({
        'login': {
            task: UserService.login,
            next: {
                0: 'forwardToIndex',
                1: 'toastLoginFail',
                2: 'showBindModal'
            }
        },
        'forwardToIndex': {
            task: this.forwardToIndex
        },
        'toastLoginFail': {
            task: this.toastLoginFail
        },
        'showBindModal': {
            task: this.showBindModal,
            next: {
                0: 'forwardToIndex',
                1: 'forwardToBind'
            },
        },
        'forwardToBind': {
            task: this.forwardToBind
        }
    })

    handleLoginClick = () => {
        this.stateMachine.run('login')
    }

    render() {
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <Row justify="center">
                    <Col span={12}>
                        <Input placeholder="default size" prefix={<UserOutlined/>}/>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={12}>
                        <Input.Password size="large" placeholder="large Password"/>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span={12}>
                        <Button type="primary" onClick={this.handleLoginClick}>
                            登陆
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
