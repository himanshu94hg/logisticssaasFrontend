import moment from "moment";

export const getDateRangeDashboard = (dateRange) => {
    console.log("dateRange received:", dateRange);

    if (!dateRange || typeof dateRange !== "object") {
        console.warn("Invalid dateRange, using defaults");
    }

    const startDate = dateRange?.startDate && moment(new Date(dateRange.startDate)).isValid()
        ? moment(new Date(dateRange.startDate)).format("YYYY-MM-DD")
        : moment().subtract(1, 'months').format("YYYY-MM-DD");

    const endDate = dateRange?.endDate && moment(new Date(dateRange.endDate)).isValid()
        ? moment(new Date(dateRange.endDate)).format("YYYY-MM-DD")
        : moment().add(1, 'days').format("YYYY-MM-DD");

    console.log("Final startDate:", startDate, "Final endDate:", endDate);

    return {
        start_date: startDate,
        end_date: endDate
    };
};
