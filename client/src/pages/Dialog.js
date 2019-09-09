import React from 'react';

function EditDialog(props) {
  console.log(props.profile);
   const [profile, setProfile] = useState(props.profile)
   //console.log(profile.name)
   const [name, setCurrentName] = useState("");
   const [location, setCurrentLocation] = useState("");
   const [open, setOpen] = useState(false);
 
   const modifyProfileInfo = profileInfo => {
     console.log(profileInfo);
    // fetch(`${props.location.pathname}`, {
      fetch(`/profile/${profile._id}` , {
        method: "PUT",
        headers: {
         Authorization: `Bearer ${sessionStorage.getItem("AuthToken")}`,
         "Content-Type": "application/json"
       },
       body: JSON.stringify(profileInfo)
     })
       .then(res => {
         const response = res.json();
         if (res.status > 499) throw Error("Server error");
         else return response;
       })
        .then(res => {
         console.log(res.profile)
         if (res.status > 299) throw Error(res.message + "");
       })
       .catch(err => console.log(err));
   };
 
   const handleSubmit = e => {
     e.preventDefault();
     const updatedInfo = profile;
     console.log("test");
     // console.log(JSON.stringify(updatedInfo));
     console.log(updatedInfo)
     modifyProfileInfo(updatedInfo);
 
     handleCloseClick();
   };
 
   function handleOpenClick() {
     setOpen(true);
   }
   function handleCloseClick() {
     setOpen(false);
   }
 
   const classes = useStyles();
 
   return (
     <React.Fragment>
       <Button onClick={handleOpenClick} variant="outlined">
         Edit info
       </Button>
       <Dialog
         open={open}
         close={handleCloseClick}
         onBackdropClick={handleCloseClick}
         onEscapeKeyDown={handleCloseClick}
         fullWidth
       >
         <DialogTitle>Edit Profile</DialogTitle>
         <DialogContent dividers>
           <DialogContentText style={{ border: "2px solid red" }}>
             <Grid container xs={12} justify="center">
               <Grid container justify="center" alignItems="center">
                 <Avatar alt="James Hampton" src={JHAvatar} className={classes.bigAvatar} />
               </Grid>
 
               <Grid container justify="center" alignItems="center" className="full-name">
                 <TextField
                   type="text"
                   name="name"
                   id="name"
                   margin="normal"
                   variant="standard"
                   label="Name"
                   value={profile.name}
                   onChange={e => setProfile({
                     name: e.target.value,
                   })}
                   fullWidth
                   required
                 />
               </Grid>
 
               <Grid container justify="center" alignItems="center" className="full-name">
                 <TextField
                   type="text"
                   name="location"
                   id="location"
                   margin="normal"
                   variant="standard"
                   label="Location"
                   value={location}
                   onChange={e => setCurrentLocation(e.target.value)}
                   fullWidth
                   required
                 />
               </Grid>
 
               <Grid container justify="center" alignItems="center">
                 <TextField type="text" value={fieldsData} />
               </Grid>
             </Grid>
           </DialogContentText>
 
           <DialogActions>
             <Button onClick={handleSubmit}>Submit Changes</Button>
           </DialogActions>
         </DialogContent>
       </Dialog>
     </React.Fragment>
   );
 }