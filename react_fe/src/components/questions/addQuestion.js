import React, { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { CreateQuestion, UpdateQuestion } from "../../api/question.api";

export function AddQuestion(props) {
  const validationSchema = Yup.object().shape({
    questionName: Yup.string().required("Question name is required"),
    questionType: Yup.string().required("Question type is required"),
    isRequired: Yup.boolean().required("This field is required"),
    questionSequence: Yup.number().required("Question sequence is required"),
    questionAns: Yup.string().required("Question ans is required"),
    questionOptions: Yup.array().of(Yup.string()).optional(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (props?.updateQuestion && Object.keys(props?.updateQuestion).length) {
      setValue("questionName", props?.updateQuestion?.questionName);
      setValue("questionType", props?.updateQuestion?.questionType);
      setValue("isRequired", props?.updateQuestion?.isRequired);
      setValue("questionSequence", props?.updateQuestion?.questionSequence);
      setValue("questionAns", props?.updateQuestion?.questionAns);
      setValue("questionOptions", props?.updateQuestion?.questionOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questionOptions",
  });

  const onSubmit = async (data) => {
    try {
      let response;
      if (props?.updateQuestion?.edit) {
        response = await UpdateQuestion(props?.updateQuestion?._id);
      } else {
        response = await CreateQuestion(data);
      }
      if (response && response.data && response.data.success) {
        toast.success(response.data?.message);
        props.close(true);
        reset();
      } else {
        toast.error(response.data?.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.errors.length !== 0
          ? error?.response?.data?.errors[0]?.message
          : error.response.data.message
      );
    }
  };
  return (
    <>
      <div className="w-100 p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex flex-column gap-3">
            <h4 className="m-1">
              {props?.updateQuestion?.edit ? "Update" : "Add"} question
            </h4>
            <Controller
              name="questionName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Question name"
                  fullWidth
                  error={!!errors.questionName}
                  helperText={errors.questionName?.message}
                />
              )}
            />
            <Controller
              name="questionType"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Question type
                  </InputLabel>
                  <Select
                    defaultValue={props?.updateQuestion?.questionType}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Question type"
                    {...field}
                    error={!!errors.questionType}
                    helperText={errors.questionType?.message}
                  >
                    <MenuItem value="TEXT">Text</MenuItem>
                    <MenuItem value="TEXTAREA">Textarea</MenuItem>
                    <MenuItem value="DATE">Date</MenuItem>
                    <MenuItem value="CHECKBOX">Checkbox</MenuItem>
                    <MenuItem value="RADIO">Radio</MenuItem>
                    <MenuItem value="FILE">File</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="isRequired"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Required
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={field.value}
                    defaultValue={props?.updateQuestion?.isRequired}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                    }}
                    name="radio-buttons-group"
                    error={!!errors.isRequired}
                    helperText={errors.isRequired?.message}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            />

            <Controller
              name="questionSequence"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Question sequence"
                  fullWidth
                  error={!!errors.questionSequence}
                  helperText={errors.questionSequence?.message}
                />
              )}
            />
            <Controller
              name="questionAns"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Question answer"
                  fullWidth
                  error={!!errors.questionAns}
                  helperText={errors.questionAns?.message}
                />
              )}
            />

            <div>
              {fields.map((field, index) => (
                <div key={field.id}>
                  <Controller
                    name={`questionOptions[${index}]`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={`questionOptions ${index + 1}`}
                        fullWidth
                        error={!!errors.questionOptions?.[index]}
                        helperText={errors.questionOptions?.[index]?.message}
                      />
                    )}
                  />
                  <Button type="button" onClick={() => remove(index)}>
                    Remove Option
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={() => append("")}>
                Add Option
              </Button>
            </div>
          </div>
          <div className="d-flex gap-2 mt-2">
            <Button type="submit" variant="contained" color="primary">
              {props?.updateQuestion?.edit ? "Update" : "Submit"}
            </Button>
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={() => props.close(true)}
            >
              Close
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
