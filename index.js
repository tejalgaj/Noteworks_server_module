const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
const express = require("express");
const noteRoutes = require("./routes/api/noteRouter-DB");
const jobApplicationsRoutes = require("./routes/api/jobApplicationsRoutes");
const reminderRoutes = require("./routes/api/journalComponentRoutes/reminderRoutes");
const usersRoutes = require("./routes/api/usersRoutes");
const authRoutes = require("./routes/api/authRoutes");
const journalRoutes = require("./routes/api/journalComponentRoutes/journalRoutes");
const resumeRoutes = require("./routes/api/resumeComponentRoutes/resumeRoutes");
const resuemDownloadRoute = require("./routes/api/resumeComponentRoutes/resumeDownload");
const connectDB = require("./config/connectDB");
const cors = require("cors");

const app = express();

//imports for task component
const taskConnectDB = require("./config/taskComponentConnectDB");
const groupRoute = require("./routes/api/taskComponentRoutes/groupRoute");
const cardRoute = require("./routes/api/taskComponentRoutes/cardRoute");
const checklistRoute = require("./routes/api/taskComponentRoutes/checklistRoute");
const todoRoute = require("./routes/api/taskComponentRoutes/todoRoute");
const labelRoute = require("./routes/api/taskComponentRoutes/labelRoute");
const coverRoute = require("./routes/api/taskComponentRoutes/coverRoute");

//connect to db
connectDB();
//taskConnectDB();

//set a middleware to parse dat

//routes for journal component
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api/journal", journalRoutes);
app.use("/api/reminder", reminderRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/jobApplications", jobApplicationsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/resumeDownload", resuemDownloadRoute);
app.use("/api/journal", journalRoutes);

//routes for task component
app.use("/api/task/group", groupRoute);
app.use("/api/task/card", cardRoute);
app.use("/api/task/checklist", checklistRoute);
app.use("/api/task/todo", todoRoute);
app.use("/api/task/label", labelRoute);
app.use("/api/task/cover", coverRoute);

var port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Server started");
});

// enable files upload
app.use(
	fileUpload({
		createParentPath: true,
	})
);
