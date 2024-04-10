const RawData = require('../model/rawData');


module.exports.getAllData = async (req, res) => {
    const data = await RawData.find({});
    res.json({success: true,data})
    // res.send("hi");
}

module.exports.getEndYearData = async (req, res) => {
    const data = await RawData.find({end_year: 2027});
    res.json({success: true,data})
    // res.send("hi");
}
module.exports.getSectorWiseIntensity = async (req, res) => {
                  RawData
                  .find({})
                  .then(data => {

                    let manupulatedData = [];
                    data.forEach((obj) =>{
                    obj = obj.toObject()
                        console.log(obj["sector"])
                        let tempSector = [];
                        if(obj.sector && !tempSector.includes(obj.sector)){
                           let foundInManipulatedData = manupulatedData.find(v => v.sector  == obj.sector)
                          if(foundInManipulatedData){
                       foundInManipulatedData['intesity'] =     foundInManipulatedData['intesity'] + obj.intensity;
                
                        }else{
                            manupulatedData.push({'intesity':obj.intensity, 'sector':obj.sector });
                            tempSector.push(obj.sector)
                        }
                    }
                    })

                    res.json({success: true,manupulatedData})

                  })
  
 
 
    // res.send("hi");
}



module.exports.getCountryWiseData = async (req, res) => {
    const data = await RawData.aggregate( [
        {
          $group: {
             _id:'$country',
             count: { $count: {     } }
          }
        }
      ] );
    res.json({success: true,answer : data.filter(v => v.count > 8)})
   
}
module.exports.getSourceWiseData = async (req, res) => {
    const data = await RawData.aggregate( [
        {
          $group: {
             _id:'$source',
             count: { $count: { } }
          }
        }
      ] );
    res.json({success: true,data})
   
}
module.exports.getTopicWiseData = async (req, res) => {
    const data = await RawData.aggregate( [
        {
          $group: {
             _id:'$topic',
             count: { $count: { } }
          }
        }
      ] );
    res.json({success: true,answer : data.filter(v => v.count > 30)})
   
}


module.exports.getlineChartData = async (req, res) => {
    try {
        const data = await RawData.aggregate( [
            {
              $group: {
                 _id:'$topic',
             count: { $count: { } },
                //  relevance: {$relevance: {}},
                published: { $first: '$published' },
                 relevance: { $first: '$relevance' },
                 intensity: { $first: '$intensity' },
            
              }
            }
          ] );
        res.json({success: true,data})
     
            // _id: '$topic',
            // published: '$published',
            // added: 1,
            // relevance: 1,
            // intensity: 1,
            // count: { $count: { } 
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


// module.exports.getDataForLineChart = async (req, res) => {
//     try {
//       const { startDate, endDate } = req.query;
      
//       // Construct the match conditions based on relevance, likelihood, published, and added dates
//       const matchConditions = {
//         relevance: { $gte: req.query.minRelevance || 0 }, // Filter by minimum relevance (optional)
//         likelihood: { $gte: req.query.minLikelihood || 0 }, // Filter by minimum likelihood (optional)
//       };
//       if (startDate && endDate) {
//         matchConditions.$and = [
//           { published: { $gte: new Date(startDate) } },
//           { published: { $lte: new Date(endDate) } },
//         ];
//       }
      
//       // Aggregate data based on relevance, likelihood, and date
//       const data = await RawData.aggregate([
//         { $match: matchConditions },
//         {
//           $group: {
//             _id: { 
//               year: { $year: '$published' }, 
//               month: { $month: '$published' }, 
//               day: { $dayOfMonth: '$published' },
//             },
//             relevanceTotal: { $sum: '$relevance' },
//             likelihoodTotal: { $sum: '$likelihood' },
//             count: { $sum: 1 },
//           },
//         },
//         {
//           $project: {
//             _id: 0,
//             date: { $dateFromParts: { 
//               year: '$_id.year', 
//               month: { $toString: '$_id.month' }, // Convert month to string
//               day: { $toString: '$_id.day' } // Convert day to string
//             }},
//             relevanceAvg: { $divide: ['$relevanceTotal', '$count'] },
//             likelihoodAvg: { $divide: ['$likelihoodTotal', '$count'] },
//           },
//         },
//         { $sort: { date: 1 } }, // Sort by date in ascending order
//       ]);
  
//       res.json({ success: true, data });
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   };
  


// Get data based on added date
exports.getDataByAddedDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};
    if (startDate && endDate) {
      query.added = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    const data = await RawData.find(query);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get data based on published date
exports.getDataByPublishedDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};
    if (startDate && endDate) {
      query.published = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    const data = await RawData.find(query);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



