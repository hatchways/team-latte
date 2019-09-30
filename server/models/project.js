const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    industry: {
      type: String,
      enum: ["Automotive", "Technology", "Culinary", "Literature", "Crafts"],
      required: true
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      maxlength: 500
    },
    photos: [
      {
        photo: {
          key: {
            type: String,
            required: true
          },
          link: {
            type: String,
            required: true
          }
        }
      }
    ],
    launch: {
      type: Boolean,
      required: true
    },
    funding_goal: {
      type: Number,
      required: true,
      default: 0
    },

    /*
    raised_amount: {
      type: Number,
      required: true,
      default: 0
    },
  */
  
  //**************
  
  raised_amount: [ 
     {  type: { 
          type: mongoose.Schema.Types.ObjectID, 
          ref: "Investment" 
        }
      } 
    ],

 /* This is to provide an array of objects which contain amount invested and investor ID. 

  Using .populate( "Property name TO BE populated in the document", "List of the properties of the populated object you want to fetch"  ) in PROJECT ROUTES that show investments for specific projects, use  "  'raised_amount', 'investorID, amount'  " to get invester ID & Amount   

  **************
  */

   /* investment: {
      type: { type: mongoose.Types.Number, ref: "Investment"}
    },
    */
    
  /*
    author: {
      type: String ,
      required: true
    } */
    
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
