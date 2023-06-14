const Restaurant = require('../models/restaraunt');

// Find all resturants Route
module.exports.getAllResturants = async (req, res) => {
//  router.get('/', async (req, res) => {
   console.log(req.session, 'CHECKING IF LOGGED IN ')
     try  {
       if (req.session.logged === true) {
         const allRestaurants = await Restaurant.find();
         res.json({
           status: 200,
           data: allRestaurants
         });
       } else {
         res.json({
           status: 200,
           data: 'unsuccessful'
         })
       }
    } catch (err){
      res.send(err)
    }
};

//Add resturant Route
module.exports.addResturant = async (req, res) => {
// router.post('/', async (req, res) => {
  try {
    if (req.session.logged === true) {
      req.body.createdBy = req.session.username;
      console.log(req.body.username, ' this is req.body');
      const createdRestaurant = await Restaurant.create(req.body);
      console.log('response happening?', createdRestaurant)
      res.json({
        status: 200,
        data: createdRestaurant
      });
    } else {
      res.json({
        status: 200,
        data: 'unsuccessful'
      });
    }

  } catch(err){
    console.log(err);
    res.send(err);
  }
};

//Search resturant Route
module.exports.searchResturant = async (req, res) => {
// router.get('/:id', async (req, res, next) => {
     try  {
        const foundRestaurant = await Restaurant.findById(req.params.id);
        res.json({
          status: 200,
          data: foundRestaurant
        });
      } catch (err){
        res.send(err);
      }
};

//Update resturant Route
module.exports.updateResturant = async (req, res) => {
// router.put('/:id', async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: 200,
      data: updatedRestaurant
    });
  } catch(err){
    res.send(err)
  }
};


// Delete resturant route
module.exports.deleteResturant = async (req, res) => {
// router.delete('/:id', async (req, res) => {
  try {
     const deletedRestaurant = await Restaurant.findByIdAndRemove(req.params.id);
     console.log(deletedRestaurant, ' this is deleted');
      res.json({
        status: 200,
        data: deletedRestaurant
      });
  } catch(err){
    res.send(err);
  }
};