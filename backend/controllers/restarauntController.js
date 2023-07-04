const Restaurant = require('../models/restaraunt');
const fetch = require('node-fetch');
const APIKey =  process.env.APIKey;
const APIHost = process.env.APIHost;

// Find all resturants Route
module.exports.searchResturants = async (req, res) => {
  const { city, state } = req.body.searchQuery;
  const url = `https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/state/${state}/city/${city}/0`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-RapidAPI-Key': process.env.APIKey,
      'X-RapidAPI-Host': process.env.APIHost,
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "<---- data")
      res.json(data);
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
  //  console.log(req.session, 'CHECKING IF LOGGED IN ')
    //  try  {
    //    if (req.session.logged === true) {
    //      const allRestaurants = await Restaurant.find();
    //      res.json({
    //        status: 200,
    //        data: allRestaurants
    //      });
    //    } else {
    //      res.json({
    //        status: 200,
    //        data: 'unsuccessful'
    //      })
    //    }
    // } catch (err){
    //   res.send(err)
    // }
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
// module.exports.searchResturant = async (req, res) => {
// // router.get('/:id', async (req, res, next) => {
//      try  {
//         const foundRestaurant = await Restaurant.findById(req.params.id);
//         res.json({
//           status: 200,
//           data: foundRestaurant
//         });
//       } catch (err){
//         res.send(err);
//       }
// };

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