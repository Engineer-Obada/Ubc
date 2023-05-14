import { Box, Step } from "@mui/material";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

export function Step2() {
    return (
      <div>
        <Step label="Bank Account">
          <Box paddingBottom={2}>
            <Field name="money" type="number" component={TextField} label="Money" />
          </Box>
        </Step>
        </div>
    );
  }