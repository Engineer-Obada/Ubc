import { Box, Step } from "@mui/material";
import { Field } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";

export function Step1() {
    return (
      <div>
        <Step label="Personal data">
          <Box paddingBottom={2}>
            <Field fullWidth name="firstName" component={TextField} label="First Name" />
          </Box>
          <Box paddingBottom={2}>
            <Field fullWidth name="lastName" component={TextField} label="Last Name" />
          </Box>
          <Box paddingBottom={2}>
            <Field
              fullWidth
              name="millionaire"
              type="checkbox"
              component={CheckboxWithLabel}
              Label={{ label: 'I am a millionaire' }}
            />
          </Box>
        </Step>
        </div>
    );
  }