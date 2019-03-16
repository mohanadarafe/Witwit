function error(res){
  res.json({
    code: 400,
    message: "there are some error with query"
  });
}
