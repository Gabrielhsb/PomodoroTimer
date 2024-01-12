import { ActionTypes } from "./actions";
import { produce } from "immer";
interface CyclesState {
    cycles: Cycle[];
    activeCycleId: string | null;
}

export interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cyclesReducer(state: CyclesState, action: any) {
        switch (action.type) {
            case ActionTypes.ADD_NEW_CYCLE:
                return produce(state, draft => {
                    draft.cycles.push(action.payload.newCycle);
                    draft.activeCycleId = action.payload.newCycle.id
                })
            case ActionTypes.INTERRUPT_CURRENT_CYCLE:
                // return {
                //     ...state,
                //     cycles: state.cycles.map((cycle) => {
                //         if (cycle.id === action.payload.activeCycleId) {
                //             return { ...cycle, interruptedDate: new Date() }
                //         } else {
                //             return cycle
                //         }
                //     }),
                //     activeCycleId: null
                // }
                return produce(state, draft => {
                    const currentCycleIndex = state.cycles.findIndex((cycle) => {
                        return cycle.id === state.activeCycleId
                    })
                    if (currentCycleIndex < 0) {
                        return state
                    }
                    draft.activeCycleId = null
                    draft.cycles[currentCycleIndex].interruptedDate = new Date()
                })
            case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
                    return produce(state, draft => {
                        const currentCycleIndex = state.cycles.findIndex((cycle) => {
                            return cycle.id === state.activeCycleId
                        })
                        if (currentCycleIndex < 0) {
                            return state
                        }
                        draft.activeCycleId = null
                        draft.cycles[currentCycleIndex].finishedDate = new Date()
                    })
            default:
                return state
        }
    }
