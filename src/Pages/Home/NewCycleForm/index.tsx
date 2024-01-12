
import { useFormContext } from 'react-hook-form';
import * as S from './styles'
import { useContext } from 'react';
import { CyclesContext } from '../../../Context/CyclesContext';

export function NewCycleForm() {
    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext();
    return (
        <S.FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <S.TaskInput
                id="task"
                placeholder="De um nome para seu projeto"
                list="task-suggestions"
                disabled={!!activeCycle}
                {...register('task')}
            />

            <datalist id="task-suggestions">
                <option value="Projeto 1" />
                <option value="Projeto 2" />
                <option value="Projeto 3" />
                <option value="Projeto 4" />
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <S.MinutesAmountInput
                id="minutesAmount"
                type="number"
                placeholder="00"
                step={5}
                min={5}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </S.FormContainer>
    )
}