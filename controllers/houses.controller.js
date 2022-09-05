const db = require('../models/index');
const House = db.houses

// Create and Save 
exports.create = (req,res) => {
    //Validate Request
    if(!req.body){
        res.status(400).send({message: "Cannot be empty!"});
        return
    }

    //Create a house for rent, access information from a form etc...
    const house = new House({
        image: req.body.image,
        address: req.body.address,
        description: req.body.description,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        interior: req.body.interior_status,
        price: req.body.price,
        landlord: req.body.landlord,
        contact: req.body.contact
    });

    //Save house in database
    house.save().then(data =>{
        res.send(data)
    }).catch(err =>{
       res.status(500).send({
        message:
        err.message || "An error occurred while trying to save"
       }) 
    })
}

//Get All houses
exports.findAllHouses = (req,res) =>{  
    House.find(req.body)
    .then((data) =>{
        res.send(data)})
        
    .catch((err) =>{
        res.status(500).send({
        message:
        err.message || "Houses not found."
            })
        })
}


//Get a Specific House
exports.findHouseById = (req, res) => {
    const id = req.params.id;
  
    House.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({message: `House by id  ${id} not found.`});
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving House with id=" + id });
      });
  };

  //Update House Info
  exports.updateHouse = (req,res) =>{
    if(!req.body){
       return res.status(400).send({
        message: "Data to be Updated cannot be empty!"
       });
    }

    const id = req.params.id;

    House.findByIdAndUpdate(id,req.body,{ useFindAndModify: false }).then(data => {
        if(!data){
            res.status(404).send({
                message: `Cannot update House with id=${id}.House was not found!`
            })
        }else res.send({message: "House was updated Successfully."})
    }).catch((err)=> {
        res.status(500).send({
            message: `Error updating House with id ${id}.`
        })
    })
  }


  // Delete a House with the specified id in the request
  exports.deleteHouse = (req,res)=>{
    const id = req.params.id;
    House.findByIdAndRemove(id).then(data => {
        if(!data){
            res.status(404).send({
                message: `Cannot find house with id ${id} to delete.`
            })
        }else{
            res.send({
                message: `House was deleted successfully!`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete House with id=" ${id}`
        })
    })
  }


  //Delete All houses from the database
  exports.deleteAllHouses = (req,res)=>{
    House.deleteMany({}).then(data=>{
        res.send({
            message: `All ${data.deletedCount} houses were deleted successfully!`
        });
    })
    .catch(err =>
        res.status(500).send({
            message: 
            err.message || `An error occurred while deleting all houses.`
    })
    )
  }

  


