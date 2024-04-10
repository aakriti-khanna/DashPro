const express =  require('express');
const router = express.Router();

const {getAllData,getlineChartData, getEndYearData, getCountryWiseData, getSectorWiseIntensity,getDataForLineChart,getSourceWiseData, getTopicWiseData,getDataByPublishedDate,getDataByAddedDate} =  require('../Controller/dataController')


router.get('/', (req,res)=>{
    res.send({test: "test is working"});
})

router.get('/data', getAllData);
router.get('/endYear', getEndYearData)
router.get('/countryWiseDta', getCountryWiseData)
router.get('/getSectorWiseIntensity', getSectorWiseIntensity)
router.get('/getSourceWiseData', getSourceWiseData)
router.get('/getTopicWiseData', getTopicWiseData)

router.get("/getlineChartData" ,getlineChartData)
// router.get('/getDataByAddedDate',getDataByAddedDate)
// router.get('/getDataByPublishedDate',getDataByPublishedDate)

// router.get('/DataForLineChart',getDataForLineChart)
module.exports =  router;