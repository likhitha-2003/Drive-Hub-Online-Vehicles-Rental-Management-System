const express = require('express');
const router = express.Router();
const customer=require('D:/final/server/models/customers.js')
const Register=require('D:/final/server/models/Register.js')
const current_bookings=require('D:/final/server/models/current_bookings.js')
const Favourites=require('D:/final/server/models/Favourites.js')
const Feedbacks=require('D:/final/server/models/Feedbacks.js')
const History=require('D:/final/server/models/History.js')
const vehicles=require('D:/final/server/models/vehicles.js')

/*user*/
/*---------------------------------------------------------------------*/
router.get("/",(req,res)=>{
    res.render('register_login')
})
router.get("/register_login",(req,res)=>{
    res.render('register_login.ejs')
})
router.get("/abtcomp",(req,res)=>{
    res.render('abtcomp.ejs')
})
router.get("/contact",(req,res)=>{
    res.render('contact.ejs')
})
router.get("/services",(req,res)=>{
    res.render('services.ejs')
})
router.get("/register",(req,res)=>{
    res.render('Register.ejs')
})
router.get("/locationselection",(req,res)=>{
    res.render('location_selection.ejs')
})
router.get("/helpsupport",(req,res)=>{
    res.render('helpsupport.ejs')
})
router.get("/Forgotpassword",(req,res)=>{
    res.render('forgot.ejs')
})
router.get("/profile/:id",(req,res)=>{
    Register.findOne({username:req.params.id}, { _id: 0 }).exec()
    .then(y => {
        res.render('profile.ejs',{data:y})
    })
    .catch(error => {
        console.error('Error fetching vehicles:', error);
    });
    
})
router.get("/userpage/:id",(req,res)=>{
    vehicles.find({status:"Available"}, {_id: 0 }).exec()
    .then(x => {
        res.render('userpage.ejs',{vehicle:x,username:req.params.id})
    })
    .catch(error => {
        console.error('Error fetching vehicles:', error);
    });
})
router.get("/Current_Bookings/:id",(req,res)=>{
    current_bookings.find({username:req.params.id}, {_id: 0 }).exec()
    .then(x => {
        res.render('currentbookings.ejs',{data:x,username:req.params.id})
    })
    .catch(error => {
        console.error('Error fetching vehicles:', error);
    });

})
router.get("/History/:id",(req,res)=>{
    History.find({username:req.params.id}, {_id: 0 }).exec()
    .then(x => {
        res.render('history.ejs',{data:x,username:req.params.id})
    })
    .catch(error => {
        console.error('Error fetching vehicles:', error);
    });

})
router.get("/:id2/book/:id",(req,res)=>{
    vehicles.findOne({vehicleid:String(req.params.id)}, { _id: 0 }).exec()
    .then(y => {
        const images=y.vehicleimage.split(/\s+/);
        res.render('book.ejs',{x:y,images:images,username:req.params.id2})
    })
    .catch(error => {
        console.error('Error fetching vehicles:', error);
    });
})
router.get("/terms",(req,res)=>{
    res.render('termsconditions.ejs')
})
router.post("/userpage",(req,res)=>{
    const { username, password } = req.body;
    Register.findOne({ username: username })
    .exec()
    .then(result => {
      if (result) {
       if(result.status=="active")
        {if (result.password == password) {
            res.json({ success: true ,message: "Login successful.. please wait",type:"success"});
        } 
        else {
            return res.json({ success: false, message: "Password incorrect! Try again",type:"error" });}}
        else{
            return res.json({ success: false, message: "Sorry, you are blocked contact us for further information",type:"warning" });
        }
      } else {
        return res.json({ success: false, message: "Username does not exist! Please register to login" ,type:"info"});
      }
    })
    .catch(err => {
      console.log(err);
    });
  
})
router.post("/newregister",async(req,res)=>{
    x=req.body
    const newdata={
        firstname:x.firstname,
    lastname:x.lastname,
    phoneno:x.phoneno,
    gender:x.gender,
    address:x.address,
    dob:x.dob,
    altphoneno:x.altphoneno,
    username:x.username,
    password:x.password,
    status:"active"
    }
   Register.create(newdata).then(()=>{res.redirect('/register_login')})
    .catch((err)=>{console.log(err)})
})
router.post("/:username/:vehicleid/payment",async(req,res)=>{
    vehicles.findOne({vehicleid:req.params.vehicleid}, { _id: 0 }).exec()
    .then(y => {
        const x=req.body;
        const date1 = new Date(x.startdate);
        const date2 = new Date(x.returndate);
        const [datepart1, timepart1] = String(date1).split("T");
        const [datepart2, timepart2] = String(date2).split("T");
        const startdate=datepart1.replace(" GM", "");
        const returndate=datepart2.replace(" GM", "");
    const diffMilliseconds = Math.abs(date2 - date1);
    const hoursDifference = diffMilliseconds / (1000 * 60 * 60);
    const hours= Math.floor(hoursDifference);
    const tripcost=hours*y.cost;
    const sgst=Math.ceil(0.09*tripcost);
    const totalcost=tripcost+sgst+sgst;
    const stdate = date1.toString().split("GMT")[0]
    const redate = date2.toString().split("GMT")[0]
        const newdata={
            username:req.params.username,
        vehicleid:y.vehicleid,
        vehicleimage:y.vehicleimage,
        name:y.name,
        totalcost:totalcost,
        startdate:stdate,
        returndate:redate
        }
        vehicles.updateOne(
            { "vehicleid":req.params.vehicleid},
            { $set: { "status": "Booked" } } 
         ).exec();
         setTimeout(function() {
            current_bookings.create(newdata).then(()=>{res.redirect(`/userpage/${req.params.username}`)})
            .catch((err)=>{console.log(err)})          }, 2000);
         
    })
    .catch(error => {
        console.error('Error fetching vehicles:', error);
    });
})
/*admin*/
/*---------------------------------------------------------------------*/
router.get("/adminlogin",(req,res)=>{
    res.render('adminlogin.ejs')
})
router.get("/admin/current_bookings",(req,res)=>{
    current_bookings.find({}, {_id: 0 }).exec()
    .then(x => {
        res.render('currentbookings2.ejs',{data:x})
    })
    .catch(error => {
        console.error('Error fetching vehicles:', error);
    });
})
router.get("/admin/dashboard",(req,res)=>{
    res.render('dashboard.ejs',) 
})
router.get("/admin/manage_customers",(req,res)=>{
    Register.find({}).exec().then(result=>{
        res.render('manage_customers.ejs',{data:result});  
    })
    .catch(error => {
        console.error('Error fetching vehicles:', error);
    });
})
router.get("/admin/deletecustomer/:username",(req,res)=>{
   Register.deleteOne({username:req.params.username}).exec().then(()=>{
        res.redirect('/admin/manage_customers');  
    })
    .catch(error => {
        console.error('Error fetching vehicles:', error);
    });
})
router.post("/admin/addcustomer",(req,res)=>{
    x=req.body
    const newdata={
        firstname:x.firstname,
   lastname:x.lastname,
   phoneno:x.phoneno,
   gender:x.gender,
   address:x.address,
   dob:x.dob,
   altphoneno:x.altphoneno,
   username:x.username,
   password:x.password,
   status:x.status
    }
   Register.create(newdata).then(()=>{res.redirect('/admin/manage_customers')})
    .catch((err)=>{console.log(err)})
})
router.post("/admin/editcustomer/:username",(req,res)=>{
    x=req.body
    Register.updateOne(
        { "username":req.params.username},
        { 
          $set: {
            "firstname":x.efirstname,
   "lastname":x.elastname,
   "phoneno":x.ephoneno,
   "gender":x.egender,
   "address":x.eaddress,
   "dob":x.edob,
   "altphoneno":x.ealtphoneno,
   "username":x.eusername,
   "status":x.estatus
          }
        }
      ).exec()
     .then(()=>{
        res.redirect('/admin/manage_customers');  
    }).catch((err)=>{console.log(err)})  
})
router.get("/admin/manage_vehicles",(req,res)=>{
    vehicles.find({}).exec().then(result=>{
        res.render('manage_vehicles.ejs',{data:result});  
    })
    .catch(error => {
        console.error('Error fetching vehicles:', error);
    });
})
router.get("/admin/deletevehicle/:vehicleid",(req,res)=>{
   vehicles.deleteOne({vehicleid:req.params.vehicleid}).exec().then(()=>{
        res.redirect('/admin/manage_vehicles');  
    })
    .catch(error => {
        console.error('Error fetching vehicles:', error);
    });
})
router.get("/admin/receivevehicle/:username/:id",(req,res)=>{
    current_bookings.findOne({username:req.params.username,vehicleid:req.params.id}).exec().then(result=>{
        const newdata={
            username: result.username,
            vehicleid: result.vehicleid,
            vehicleimage: result.vehicleimage,
            name: result.name,
            totalcost: result.totalcost,
            startdate: result.startdate,
            returndate: result.returndate
        }
       vehicles.updateOne(
        { vehicleid:req.params.id},
        { 
          $set: {"status":"Available"},
           $inc: { "trips": 1 }
        }
      ).exec()
     .then(()=>{
        res.redirect('/admin/current_bookings');  
    }).catch((err)=>{console.log(err)}) ;
    History.create(newdata);
    current_bookings.deleteOne({username:req.params.username,vehicleid:req.params.id}).exec();

    })
    .catch(error => {
        console.error('Error fetching vehicles:', error);
    });
 })
router.post("/admin/addvehicle",(req,res)=>{
    x=req.body
    const newdata={
        vehicleid:x.vehicleid,
   vehicleimage:x.vehicleimage,
   name:x.name,
   status:"Available",
   feedbacks:".",
   rating:x.rating,
   cost:x.cost,
   category:x.category,
   fuel:x.fuel,
   seats:x.seats,
   trips:0
    }
   vehicles.create(newdata).then(()=>{res.redirect('/admin/manage_vehicles')})
    .catch((err)=>{console.log(err)})
})
router.post("/admin/editvehicle/:vehicleid",(req,res)=>{
    x=req.body
    vehicles.updateOne(
        { "vehicleid":req.params.vehicleid},
        { 
          $set: {
            "vehicleid":x.evehicleid,
            "name": x.ename,
            "rating": x.erating,
            "cost": x.ecost, 
            "category": x.ecategory,
            "fuel": x.efuel, 
            "seats": x.eseats, 
          }
        }
      ).exec()
     .then(()=>{
        res.redirect('/admin/manage_vehicles');  
    }).catch((err)=>{console.log(err)})  
})

module.exports = router;