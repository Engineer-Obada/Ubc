import { Button, CircularProgress, Grid, Step, StepLabel, Stepper } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import PropTypes from 'prop-types';
import React from 'react'

export function Formikstepers({children, ...props}){// this just wrapper
    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    function isLastStep(){  
      return step === childrenArray.length - 1
    }
     return(
     <Formik 
     {...props}
      onSubmit={async (values,helpers)=>{
      if(isLastStep()){
        await props.onSubmit(values, helpers)
        // setCompleted(true);
        helpers.resetForm();
        setStep(0);
      }
      else{
        setStep((s)=> s + 1)
      }
     }}>  
     {({isSubmitting}) =>(
      <Form autoComplete='off'>
        <Stepper alternativeLabel activeStep={step} >
      {childrenArray.map((child) => (
        <Step key={child.props.label} >
          <StepLabel >{child.props.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
        {currentChild}
          <Grid container spacing={2}>
        {step > 0 ? (
        <Grid item xs={3}>
        <Button fullWidth disabled={isSubmitting} variant='contained' color='primary' onClick={()=>setStep((s)=> s - 1)}>
          Back
          </Button>
          </Grid>
         ) : null}
          <Grid item xs={3}>
        <Button fullWidth startIcon={isSubmitting ? <CircularProgress size='1rem' /> : null}  disabled={isSubmitting} variant='contained' color='primary' type="submit">
        {isSubmitting
                    ? 'Submitting'
                    : isLastStep()
                    ? 'Submit'
                    : 'Next'}
          </Button>
          </Grid>
          </Grid>
    </Form>
     )}
      
    </Formik>
     );
  }
  Formikstepers.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }