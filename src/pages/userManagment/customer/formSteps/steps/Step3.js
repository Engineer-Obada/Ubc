import { Box, Step } from "@mui/material";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
export function Step3() {
    return (
      <div>
         <Step label="More info">
          <Box paddingBottom={2}>
            <Field
              fullWidth
              name="description"
              component={TextField}
              label="Description"
            />
          </Box>
        </Step>
        </div>
    );
  }