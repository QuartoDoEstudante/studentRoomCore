require("express-async-errors");
const express = require("express");
const routes = require("./routes")
const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")
const cors = require("cors")


const app = express();
app.use(cors())
app.use(express.json());



app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER))
app.use(routes);

app.use((error, request, response, next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  return response.status(500).json({
    status: "Error",
    message: (error.message)
  })

});


const PORT = 3333;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
