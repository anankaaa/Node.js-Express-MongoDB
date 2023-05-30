const Tour = require('../model/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  //1, get tour data from collection
  const tours = await Tour.find();

  //2, build template

  //3, render that template using tour data from 1,
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = (req, res) => {
  //1, get the data, for the requested tour (incl. reviews and guides)

  //2, build template

  //3, render template using data from 1,
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  });
};
