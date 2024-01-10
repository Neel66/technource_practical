import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import { AddQuestion } from "./addQuestion";
import { GetAllQuestion, DeleteQuestion } from "../../api/question.api";
import { toast } from "react-toastify";
import { Exam } from "../exam/exam";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export function Questions() {
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateQuestion, setUpdateQuestion] = useState({});
  const [isExam, setIsExam] = useState(false);

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

  const editQuestion = (index, data) => {
    try {
      data.index = index;
      data.edit = true;
      setOpen(!open);
      setUpdateQuestion(data);
    } catch (error) {}
  };

  const deleteQuestion = async (index, data) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want delete this question?"
      );
      if (confirmation) {
        const response = await DeleteQuestion(data?._id);
        if (response && response.data && response.data.success) {
          toast.success(response.data?.message);
          questions.splice(index, 1);
          setQuestions(questions);
        } else {
          toast.error(response.data?.message);
        }
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
      <div className="p-3">
        <div className="d-flex justify-content-between mb-3">
          <Button variant="contained" onClick={() => setIsExam(!isExam)}>
            Exam submit
          </Button>
          <Button variant="contained" onClick={() => setOpen(!open)}>
            + Add
          </Button>
        </div>
        {isExam ? (
          <Exam></Exam>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Type</TableCell>
                  <TableCell align="right">Required</TableCell>
                  <TableCell align="right">Sequence</TableCell>
                  <TableCell align="right">Answer</TableCell>
                  <TableCell align="right">Option</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {questions.length ? (
                  questions.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.questionName}
                      </TableCell>
                      <TableCell align="right">{row.questionType}</TableCell>
                      <TableCell align="right">
                        {row.isRequired ? "Yes" : "No"}
                      </TableCell>
                      <TableCell align="right">
                        {row.questionSequence}
                      </TableCell>
                      <TableCell align="right">{row.questionAns}</TableCell>
                      <TableCell align="right">
                        {" "}
                        {Array.from(row.questionOptions).join(",")}
                      </TableCell>
                      <TableCell align="right">
                        <div>
                          <IconButton onClick={() => editQuestion(index, row)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => deleteQuestion(index, row)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body1">No data available</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Modal
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="model-box">
            <AddQuestion
              close={(e) => setOpen(false)}
              updateQuestion={updateQuestion}
            ></AddQuestion>
          </Box>
        </Modal>
      </div>
    </>
  );
}
