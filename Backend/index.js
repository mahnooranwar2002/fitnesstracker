// to require thr database

require("./src/model/connection")

var express=require("express");
var app=express();
var body=require("body-parser")
app.use(body.json())
var cors=require("cors")
app.use(cors())
var port=4000;
var userModel=require('./src/model/user')
var progressModel = require('./src/model/ProgressTracker')
var workoutModel=require('./src/model/Workout')
var nutritionModel=require('./src/model/Nutrition')
var multer = require("multer")
var exerciseModel = require('./src/model/Exercise')
var progressExportRoute = require('./src/routes/progressExportRoute');
var feedbackModel = require('./src/model/Feedback')
var faqModel = require('./src/model/Faqs')
var Notification = require('./src/model/Notification')
var blogModel = require('./src/model/Blog')
var Goal = require('./src/model/Goals')
app.use(progressExportRoute);

// for picture and Images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      // make directory
    cb(null,'C:/Users/Mahnoor Anwar/Desktop/final project/fitness Tracker/Fitness Tracker/Clientside/public/Images/profileImage/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  //   generate filename
    cb(null,uniqueSuffix+file.originalname)
  }
})

const upload = multer({ storage: storage })
// user registration
app.post("/userReg", (req, res) => {
  if (!req.body.email) {
    return res.status(400).send("Please fill in email fields!");
  }

  userModel.findOne({ email: req.body.email })
    .then((resp) => {
      if (resp) {
        return res.status(400).send("The email is already registered");
      } else {
      return  userModel.create(req.body);
      }
    })
    .then((newUser) => {
      return res.status(201).send("User created successfully");
    })
    .catch((error) => {
      console.error("Error inserting user:", error);
      return res.status(500).send("Internal server error");
    });
});

app.get("/userDetails",(req,res)=>{
    userModel.find({is_admin:0}).then((resp)=>{
        res.send(resp)
    })
})

app.delete("/userDel/:id",(req,res)=>{
    userModel.findByIdAndDelete(req.params.id).then(()=>{
        res.send("the user is deleted !")
    })
})
app.get("/userfind/:id",(req,res)=>{
    userModel.findById(req.params.id).then((resp)=>{
        res.send(resp)
    })
})
app.put("/userStatus/:id", async (req, res) => {
    var user = await userModel.findById(req.params.id);
       user.status = user.status === 1 ? 0 : 1;
      await user.save();
});
app.get("/searchByuserName/search",async(req,res)=>{
  var query=req.query.q || "";
  var userItem = await userModel.find({
  
    email:{$regex:query,$options: "i"} })
  res.send(userItem)
})
app.put("/userUpdate/:id", upload.single("image"), async(req,res)=>{
  var userId= req.params.id;

  let image;
  if (req.file) {
    image = req.file.filename;
  
  }
  const updateData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    status: req.body.status,
    image:image
};
try {
  const userUpdate = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
  if (!userUpdate) {
      return res.status(404).send({ message: "User  not found" });
  }
  res.send(userUpdate);}
catch(e){}
  
})
// loginApi
app.post("/loginedUser",(req,res)=>{
    userModel.findOne({email:req.body.email}).then((resp)=>{
      if (!resp) {
      
        return res.status(401).send("Login Failed: User not found");
    }
  
      if(resp.password == req.body.password){
        res.send(resp)
      }
      else{
        res.send("login failed !")
      }
    })
  })
  // workout Crud
    app.post("/addWorkout",(req,res)=>{
      workoutModel.create(req.body).then((resp)=>{
        res.send(resp)
      })
    })
    app.get("/getWorkout/:UserID",(req,res)=>{
      workoutModel.find(req.params.UserID).then((resp)=>{
        res.send(resp)
      })

    })
    app.get("/getWorkout/:UserID/:Category",(req,res)=>{
      workoutModel.find({UserID: req.params.UserID, Category: req.params.Category }).then((resp)=>{
        res.send(resp)
      })

    })
   
    app.delete("/deleteWorkout/:id",(req,res)=>{
      workoutModel.findByIdAndDelete(req.params.id).then(()=>{
        res.send("workout is deleted !")
      })
    })
    app.get("/findWorkout/:id",(req,res)=>{
      workoutModel.findById(req.params.id).then((resp)=>{
        res.send(resp)
      })
    })
    app.get("/updateWorkout/:id",(req,res)=>{
      workoutModel.findByIdAndUpdate(req.params.id,req.body).then((resp)=>{
        res.send(resp)
      })
    })
    // Nutrition Crud
app.post("/addNutrition",async (req,res)=>{

   try {
    const newMeal = await nutritionModel.create(req.body);

  
    await Notification.create({
      userId: req.body.UserID,
      type: "Meal",
      message: `You added  a new  Meal: ${req.body.food_item}`,
    });

    res.send("meal Added and Notification Created");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding meal");
  }
})
app.put("/updateNutrition/:id", async (req, res) => {
  try {
    const mealUpdate = await nutritionModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status }, 
      
    );
    
    res.send(mealUpdate);
  } catch (error) {
    console.error("Error updating nutrition status:", error);
    res.status(500).send({ message: "Error updating nutrition status" });
  }
});

app.get("/NutritionData/:UserID",(req,res)=>{
  nutritionModel.find({UserID:req.params.UserID}).then((resp)=>{
    res.send(resp)
  })
})
app.get("/NutritionData/:UserID/:meal_type",(req,res)=>{
  nutritionModel.find({UserID:req.params.UserID,meal_type:req.params.meal_type}).
  then((resp)=>{
    res.send(resp)
  })
})
app.get("/NutritionDatabyDay/:UserID/:dateday",(req,res)=>{
  nutritionModel.find({UserID:req.params.UserID,day:req.params.dateday}).
  then((resp)=>{
    res.send(resp)
  })
})
app.delete("/NutritionDel/:id",(req,res)=>{
  nutritionModel.findByIdAndDelete(req.params.id).
  then((resp)=>{
    res.send(resp)
  })
})
app.get("/findNutrition/:id",(req,res)=>{
  nutritionModel.findById(req.params.id).
  then((resp)=>{
    res.send(resp)
  })
})
app.put("/NutritionUpdated/:id",(req,res)=>{
  nutritionModel.findByIdAndUpdate(req.params.id,req.body).
  then((resp)=>{
    res.send(resp)
  })
})

// search Api of nutrition 
app.get("/searchByitem/:UserID/search",async(req,res)=>{
  var query=req.query.q || "";
  var foodItem = await nutritionModel.find({
    UserID:req.params.UserID, 
    food_item:{$regex:query,$options: "i"} })
  res.send(foodItem)
})
// Exercise

// // add
app.post("/addexercise", async (req, res) => {
  try {
    const newExercise = await exerciseModel.create(req.body);

    // Create a notification for exercise/workout completion
    await Notification.create({
      userId: req.body.user_id,
      type: "workout",
      message: `You logged a new exercise: ${req.body.exercise_name}`,
    });

    res.send("Exercise Added and Notification Created");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding exercise");
  }
});


// // fetch exercise user wise
app.get("/fetchexercise/:user_id", (req, res) => {
  exerciseModel.find({ user_id: req.params.user_id })
  .sort({ _id: -1 }).then((resp) => {
      res.send(resp);
    })
    
});
// for sort by the Category
app.get("/fetchexercisebycategory/:user_id/:workout_category", (req, res) => {
  exerciseModel.find({ user_id: req.params.user_id, workout_category: req.params.workout_category })
  .sort({ _id: -1 }).then((resp) => {
      res.send(resp);
    })
    
});
app.get("/fetchexercisebydate/:user_id/:daydate", (req, res) => {
  exerciseModel.
  find({ user_id: req.params.user_id, daydate: req.params.daydate}).sort({ _id: -1 })
    .then((resp) => {
      res.send(resp);
    })
    
});
// for put the status only
app.put("/updateExecriseStatus/:id", async (req, res) => {
  try {
    const ExerciseUpdate = await exerciseModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status }, 
      
    );
    
    res.send(ExerciseUpdate);
  } catch (error) {
    console.error("Error updating nutrition status:", error);
    res.status(500).send({ message: "Error updating nutrition status" });
  }
});

// // fetch exercise to update
app.get("/findExercise/:id", (req, res) => {
  exerciseModel.findById(req.params.id)
    .then((exercise) => {
      if (!exercise) {
        return res.status(404).send({ message: "Exercise not found" });
      }
      res.send(exercise);
    })
    .catch((err) => {
      console.error("Error fetching exercise:", err);
      res.status(500).send({ message: "Error fetching exercise" });
    });
});


// // update
// // Update exercise
app.put("/updateexercise/:id", (req, res) => {
  exerciseModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.send("Updated");
    })
    .catch((err) => {
      console.error('Error updating exercise:', err);
      res.status(500).send('Error updating exercise');
    });
});
// search
app.get("/searchByexercise/:user_id/search", async (req, res) => {
  try {
    var query = req.query.q || "";

    // Find exercises where 'exercise_name' matches the query (case-insensitive)
    var results = await exerciseModel.find({
      user_id:req.params.user_id,
      exercise_name: { $regex: query, $options: "i" }
    });

    res.send(results);
  } catch (error) {
    console.error("Error searching exercises:", error);
    res.status(500).send({ error: "Server error" });
  }
});
//delete
app.delete("/deleteexercise/:id",(req, res) => {
  exerciseModel.findByIdAndDelete(req.params.id).then(() => {
      res.send("Deleted")
  })
})
//Notifiaction Insert,Read ,delete
app.get("/notifications/:userId", async (req, res) => {

  Notification.find({userId:req.params.userId}).sort({createdAt:-1}).then((resp)=>{
    res.send(resp)
  })
});


// mark as read
app.put("/notifications/:id/read", async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update notification");
  }
});
//delete
app.delete("/deleteNoti/:id",(req, res) => {
  Notification.findByIdAndDelete(req.params.id).then(() => {
      res.send("Deleted")
  })
})
//delete

// progress trackering
// add
app.post("/addprogress",async(req,res) => {

    try {
    const newprogress = await progressModel.create(req.body);

    // Create a notification for exercise/workout completion
    await Notification.create({
      userId: req.body.userId,
      type: "Progress",
      message: `You created  a new Progress`,
    });

    res.send("Progress Added and Notification Created");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding progress");
  }
})

// fetch
app.get("/fetchprogress/:user_id", (req, res) => {
  progressModel.find({ userId: req.params.user_id })
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching exercises");
    });
});

// fetch  to update
app.get("/findprogress/:id", (req, res) => {
  progressModel.findById(req.params.id)
    .then((progress) => {
      if (!progress) {
        return res.status(404).send({ message: "Exercise not found" });
      }
      res.send(progress);
    })
    .catch((err) => {
      console.error("Error fetching exercise:", err);
      res.status(500).send({ message: "Error fetching exercise" });
    });
});

// update
app.put("/updateprogress/:id", (req, res) => {
  progressModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.send("Updated");
    })
    .catch((err) => {
      console.error('Error updating exercise:', err);
      res.status(500).send('Error updating exercise');
    });
});

//delete
app.delete("/deleteprogress/:id",(req, res) => {
  progressModel.findByIdAndDelete(req.params.id).then(() => {
      res.send("Deleted")
  })
})

// feedback

// add
app.post("/addfeedback",(req,res) => {
  feedbackModel.create(req.body).then(() => {
      res.send("Added")
  })
})

//fetch
app.get("/fetchfeedback",(req,res)=>{
  feedbackModel.find().then((response)=>{
        res.send(response)
    })
})

//delete
app.delete("/deletefeedback/:id",(req, res) => {
  feedbackModel.findByIdAndDelete(req.params.id).then(() => {
      res.send("Deleted")
  })
})
// feedback search
app.get("/searchfeeeback/search",async(req,res)=>{
  var query=req.query.q || "";
  var feedbackItem = await feedbackModel.find({
   
    email:{$regex:query,$options: "i"} })
  res.send(feedbackItem)
})

// faq
// add
app.post("/addfaq",(req,res) => {
  faqModel.create(req.body).then(() => {
      res.send("Added")
  })
})

//fetch
app.get("/fetchfaq",(req,res)=>{
  faqModel.find().then((response)=>{
        res.send(response)
    })
})

//delete
app.delete("/deletefaq/:id",(req, res) => {
  faqModel.findByIdAndDelete(req.params.id).then(() => {
      res.send("Deleted")
  })
})
app.get("/faqFind/:id",(req, res) => {
  faqModel.findById(req.params.id).then((r) => {
      res.send(r)
  })
})
app.put("/faqUpdate/:id",(req, res) => {
  faqModel.findByIdAndUpdate(req.params.id,req.body).then((r) => {
      res.send(r)
  })
})
app.get("/searchfaq/search",async(req,res)=>{
  var query=req.query.q || "";
  var faqItem = await faqModel.find({
   
    Subject:{$regex:query,$options: "i"} })
  res.send(faqItem)
})

// blog crud
app.post("/addblog", upload.single("FeaturedImage"), async(req,res)=>{
 let FeaturedImage;
  if (req.file) { FeaturedImage= req.file.filename;}
  const blogData = {
   
      user_id:req.body.user_id,
    Tittle: req.body.Tittle,
    summary:req.body.summary,
    Discription:req.body.Discription,
    date:req.body.date,
    status:req.body.status,
    AuthorName:req.body.AuthorName,
    FeaturedImage:FeaturedImage,
};

blogModel.create(blogData).then(()=>{
res.send("Added !");
})
})
app.get("/fetchblog",(req,res)=>{
  blogModel.find().then((resp)=>{
    res.send(resp)
  })
})
app.get("/blogdel/:id",(req,res)=>{
  blogModel.findByIdAndDelete(req.params.id).then((resp)=>{
    res.send("delete !")
  })
})
app.get("/fetchblogByuser/:user_id",(req,res)=>{
  blogModel.find({user_id:req.params.user_id}).then((resp)=>{
    res.send(resp)
  })
})
app.get("/blogFind/:id",(req,res)=>{
  blogModel.findById(req.params.id).then((resp)=>{
    res.send(resp)
  })
})
app.put("/updateblog/:id", upload.single("FeaturedImage"), async(req,res)=>{
  const BlogId = req.params.id;
 let FeaturedImage;
  if (req.file) { FeaturedImage= req.file.filename;}
  const blogData = {
   
      user_id:req.body.user_id,
    Tittle: req.body.Tittle,
    summary:req.body.summary,
    Discription:req.body.Discription,
    date:req.body.date,
    status:req.body.status,
    AuthorName:req.body.AuthorName,
    FeaturedImage:FeaturedImage,
};


await blogModel.findByIdAndUpdate(
      BlogId,
     blogData
    );
})
app.get("/searchByBlogname/:user_id/search",async(req,res)=>{
  var query=req.query.q || "";
  var userItem = await blogModel.find({
  user_id:req.params.user_id,
   Tittle:{$regex:query,$options: "i"} })
  res.send(userItem)
})
app.put("/blogStatus/:id", async (req, res) => {
  try {
    const StatusUpdate = await blogModel.findByIdAndUpdate(
      req.params.id,
      { status: 1 }, 
      
    );
    
    res.send(StatusUpdate);
  } catch (error) {
    console.error("Error updating blog status:", error);
    res.status(500).send({ message: "Error updating blog status" });
  }
});
app.get("/BlogFetch",async(req,res)=>{
     blogModel.find({status:1}).then((data)=>{
      res.send(data)
     })  

})
app.get("/searchByBlog/search",async(req,res)=>{
  var query=req.query.q || "";
  var userItem = await blogModel.find({
 Tittle:{$regex:query,$options: "i"} })
  res.send(userItem)
})
// goal
app.post("/addgoal",async(req,res) => {
try {
    const newGoal = await Goal.create(req.body);

    // Create a notification for exercise/workout completion
    await Notification.create({
      userId: req.body.userId,
      type: "Goal",
      message: `You created  a new Goal Type: ${req.body.type}`,
    });

    res.send("Goal Added and Notification Created");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding Goal");
  }
})
app.get("/fetchgoal/:userId",async(req,res) => {
Goal.find({userId:req.params.userId}).then((resp)=>{
  res.send(resp)
})
})
app.get("/findgoal/:id",async(req,res) => {
Goal.findById(req.params.id).then((resp)=>{
  res.send(resp)
})
})
app.delete("/delgoal/:id",async(req,res) => {
Goal.findByIdAndDelete(req.params.id).then((resp)=>{
  res.send("deleted")
})
})
const checkGoals = async (userId, progressValue, type) => {
  const goals = await Goal.find({ userId, achieved: false });

  for (const goal of goals) {
    if (goal.type === type && progressValue >= goal.targetValue) {
      goal.achieved = true;
      await goal.save();

      await Notification.create({
        userId,
        type: "goal",
        message: `🎯 Goal achieved! ${goal.description || "You reached your goal!"}`,
      });
    }
  }
};


console.log("The application is connected on the " +" "+ port)
app.listen(port)