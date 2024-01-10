import request from "./request";

export function CreateQuestion(data) {
  return request({
    url: "question",
    method: "post",
    data,
  });
}

export function GetAllQuestion(data) {
  return request({
    url: "question",
    method: "get",
    data,
  });
}

export function DeleteQuestion(id) {
  return request({
    url: "question/" + id,
    method: "delete",
  });
}

export function UpdateQuestion(id, data) {
  return request({
    url: "question/" + id,
    method: "put",
    data,
  });
}
