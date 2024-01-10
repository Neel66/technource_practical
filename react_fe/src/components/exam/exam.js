import React, { useEffect, useState } from "react";
import {
  Card,
  FormControl,
  FormGroup,
  TextField,
  TextareaAutosize,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Box,
  Input,
  Button,
} from "@mui/material";
import { GetAllQuestion } from "../../api/question.api";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm, Controller } from "react-hook-form";

export function Exam() {
  const [questions, setQuestions] = useState([]);
  const [submit, isSubmit] = useState(false);

  const { control, handleSubmit } = useForm();

  useEffect(() => {
    getAllQuestion();
  }, []);

  async function getAllQuestion() {
    try {
      const response = await GetAllQuestion();
      if (response && response.data && response.data.success) {
        setQuestions(response.data.data?.questions);
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
  }

  const getValidationRules = (isRequired) => {
    // Add any other condition you need for different question types
    const rules = {};

    if (isRequired) {
      rules.required = "This field is required";
    }

    return rules;
  };

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    isSubmit(true);
    console.log("submit :>> ", submit);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pt-3">
          {questions.length ? (
            // eslint-disable-next-line array-callback-return
            questions.map((item, index) => (
              <Card variant="outlined" className="mt-2" key={index}>
                <div className="p-3">
                  <div className="font-weight-bold h5">{item.questionName}</div>
                  <div className="mt-3">
                    {item.questionType === "TEXT" ? (
                      <Controller
                        name={`questions[${index}].answer`}
                        control={control}
                        defaultValue={submit ? "item.questionAns" : ""}
                        rules={getValidationRules(item?.isRequired)}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                    ) : item.questionType === "TEXTAREA" ? (
                      <Controller
                        name={`questions[${index}].answer`}
                        control={control}
                        defaultValue={submit ? item.questionAns : ""}
                        rules={getValidationRules(item?.isRequired)}
                        render={({ field, fieldState }) => (
                          <TextareaAutosize
                            minRows={3}
                            style={{ width: "100%" }}
                            {...field}
                            fullWidth
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                          />
                        )}
                      />
                    ) : item.questionType === "DATE" ? (
                      <Controller
                        name={`questions[${index}].answer`}
                        control={control}
                        defaultValue={submit ? item.questionAns : ""}
                        rules={getValidationRules(item?.isRequired)}
                        render={({ field, fieldState }) => (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              {...field}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            />
                          </LocalizationProvider>
                        )}
                      />
                    ) : item.questionType === "CHECKBOX" ? (
                      <Controller
                        name={`questions[${index}].answer`}
                        control={control}
                        defaultValue={submit ? item.questionAns : ""}
                        rules={getValidationRules(item?.isRequired)}
                        render={({ field, fieldState }) => (
                          <FormControl component="fieldset" variant="standard">
                            <FormGroup>
                              {item.questionOptions.map((option, index) => (
                                <FormControlLabel
                                  key={index}
                                  control={<Checkbox name={option} />}
                                  label={option}
                                  {...field}
                                  error={!!fieldState.error}
                                  helperText={fieldState.error?.message}
                                />
                              ))}
                            </FormGroup>
                          </FormControl>
                        )}
                      />
                    ) : item.questionType === "RADIO" ? (
                      <Controller
                        name={`questions[${index}].answer`}
                        control={control}
                        defaultValue={submit ? item.questionAns : ""}
                        rules={getValidationRules(item?.isRequired)}
                        render={({ field, fieldState }) => (
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                            >
                              {item?.questionOptions.map((option, index) => (
                                <FormControlLabel
                                  key={index}
                                  value={option}
                                  control={<Radio />}
                                  label={option}
                                  {...field}
                                  error={!!fieldState.error}
                                  helperText={fieldState.error?.message}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        )}
                      />
                    ) : item.questionType === "FILE" ? (
                      <Controller
                        name={`questions[${index}].answer`}
                        control={control}
                        defaultValue={submit ? item.questionAns : ""}
                        rules={getValidationRules(item?.isRequired)}
                        render={({ field, fieldState }) => (
                          <Box>
                            <Input
                              id={`file-upload${index}`}
                              type="file"
                              // style={{ display: "none" }}
                              {...field}
                              error={!!fieldState.error}
                              helperText={fieldState.error?.message}
                            />
                            <label htmlFor={`file-upload${index}`}>
                              <Button
                                variant="contained"
                                component="span"
                                startIcon={<CloudUploadIcon />}
                                color="secondary"
                              >
                                Upload
                              </Button>
                            </label>
                          </Box>
                        )}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="p-5 text-center h5">No recode found!</div>
          )}

          <div className="mt-3">
            <Button type="submit" variant="contained" color="primary">
              Submit{" "}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
