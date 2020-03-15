# state-machine
状态机，编排复杂业务流程的

### 特性
- 配置化，让业务流程更加清晰可见，代码即业务
- 分离原子任务和流程控制器，更加彻底的 DIY，方便 Unit Test

### 使用方式
- 引入
```shell
npm install @followwinter/state-machine
```
- 配置
```jsx harmony
        const taskA = ()=>{return 'payloadFromA'}
        const taskB = (payload)=>{console.log(payload)}
        
        const stateMachine = new StateMachine({
            'A': {
                task: taskA,
                next: 'B'
            },
            'B': {
                task: taskB,
            }
        })
        stateMachine.run('A', 'initialPayload') // 输出 payloadFromA
```


### API

- StateMachine:
    - constructor(config, name): StateMachine - 构造一个状态机
        - config: object - 状态机配置，key 为状态，value 是 Task
        - name: string - 状态机名称，如果不需要可以不用
    - run(state, payload): void - 指定初始状态和负载执行状态机
        - state: string - 初始状态
        - payload: object - 负载

- Task:
    - task: function - 该状态的任务
    - next: string | function | object - 下一个任务的状态转化器
        - string：直接指定状态
        - function：将任务的执行结果作为入参数，该函数的声明如下：
            - function(prePayload: object): {state: string, payload: object}
        - object: 将任务执行的结果作为 key，在该对象中查找，将命中的 value 作为下一个状态。
