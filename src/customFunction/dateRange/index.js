import moment from "moment"

const endDate = moment(new Date()).add(1, 'days').format("YYYY-MM-DD"); 
const startDate = moment(new Date()).subtract(1, 'months').format("YYYY-MM-DD"); 


export const dateRangeDashboard={
    start_date:startDate,
    end_date:endDate
}