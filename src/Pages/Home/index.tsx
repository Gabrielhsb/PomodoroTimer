import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import * as S from "./styles";
import { NewCycleForm } from "./NewCycleForm";
import { CountDown } from "./CountDown";
import { CyclesContext } from "../../Context/CyclesContext";
import { useContext } from "react";

const newCycleFormValidationSchema = zod.object({
    // regras de validação
    task: zod.string().min(1, "Informa a tarefa"),
    minutesAmount: zod
        .number()
        .min(5, "O ciclo precisa ser de no minimo 5 minutos")
        .max(60, "O ciclo precisa ser de no maximo 60 minutos"),
});

export function Home() {
    const { activeCycle, createNewCycle, interruptCurrentCycle } =
        useContext(CyclesContext);

    type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        },
    });
    const { handleSubmit, watch, reset } = newCycleForm;

    const task = watch("task");
    const isSubmitDisabled = !task;

    function handleCreateNewCycle(data: NewCycleFormData) {
        createNewCycle(data);
        reset();
    }
    return (
        <S.HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <CountDown />

                {activeCycle ? (
                    <S.StopCountdownButton onClick={interruptCurrentCycle}>
                        <HandPalm size={24} /> Termina
                    </S.StopCountdownButton>
                ) : (
                    <S.StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                        {" "}
                        <Play size={24} /> Começar
                    </S.StartCountdownButton>
                )}
            </form>
        </S.HomeContainer>
    );
}
