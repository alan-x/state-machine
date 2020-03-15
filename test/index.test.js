import StateMachine from "../src";

describe('状态机测试', () => {
    test('测试环境', () => {
        expect(1 + 1).toBe(2)
    })

    test('一层任务', () => {
        const ATask = jest.fn()
        const sm = new StateMachine({
            'A': {
                task: ATask
            }
        })
        sm.run('A', 'initialPayload')
        expect(ATask).toHaveBeenCalledTimes(1)
        expect(ATask.mock.calls[0]).toEqual(['initialPayload'])
    })

    test('多层任务-字符串', () => {
        const ATask = jest.fn()
        ATask.mockReturnValue('payloadFromA')
        const BTask = jest.fn()
        const sm = new StateMachine({
            'A': {
                task: ATask,
                next: 'B'
            },
            'B': {
                task: BTask,
            }
        })
        sm.run('A', 'initialPayload')
        expect(ATask).toHaveBeenCalledTimes(1)
        expect(ATask.mock.calls[0]).toEqual(['initialPayload'])
        expect(BTask).toHaveBeenCalledTimes(1)
    })

    test('多层任务-函数', () => {
        const ATask = jest.fn()
        ATask.mockReturnValue('payloadFromA')
        const BTask = jest.fn()
        const sm = new StateMachine({
            'A': {
                task: ATask,
                next: (payload) => ({
                    "state": 'B',
                    payload
                })
            },
            'B': {
                task: BTask,
            }
        })
        sm.run('A', 'initialPayload')
        expect(ATask).toHaveBeenCalledTimes(1)
        expect(ATask.mock.calls[0]).toEqual(['initialPayload'])
        expect(BTask).toHaveBeenCalledTimes(1)
        expect(BTask.mock.calls[0]).toEqual(['payloadFromA'])
    })

    test('多层任务-对象', () => {
        const ATask = jest.fn()
        ATask.mockReturnValue('payloadFromA')
        const BTask = jest.fn()
        const sm = new StateMachine({
            'A': {
                task: ATask,
                next: {
                    'payloadFromA': 'B'
                }
            },
            'B': {
                task: BTask,
            }
        })
        sm.run('A', 'initialPayload')
        expect(ATask).toHaveBeenCalledTimes(1)
        expect(ATask.mock.calls[0]).toEqual(['initialPayload'])
        expect(BTask).toHaveBeenCalledTimes(1)
        expect(BTask.mock.calls[0]).toEqual(['payloadFromA'])
    })
})
