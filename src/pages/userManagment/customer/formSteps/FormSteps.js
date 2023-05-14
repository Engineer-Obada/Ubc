import { mixed, number, object } from "yup";
import { Formikstepers } from "./formikSteper/Formikstepers";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";

export function FormSteps() {
    const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
    return (

        <Formikstepers
        validationSchema={object({
          money: mixed().when('millionaire',{
              is: true,
              then: number().required().min(1_000_000),
              otherwise: number().required()
          }),
        })}
        initialValues={{
          firstName: '',  
          lastName: '',
          millionaire: false,
          money: 0,
          description: '',
        }}
        onSubmit={ async (values) => {
          try{
            await sleep(3000);
            console.log(values)
          }
          catch(error){
            console.error('Error submitting form:', error);
          }
        }}
      >
          <Step1 key={"1"}/>
          <Step2 key={"2"}/>
          <Step3 key={"3"}/>
      </Formikstepers>
    
    );
  }