import $ from "jquery";

var PriceArea = "DK1";

function ElectricityProductionDataQuery(callback) {


    $.ajax({
        url: "https://api.energidataservice.dk/dataset/ElectricityBalanceNonv?filter={\"PriceArea\":\"DK1\"}&sort=HourUTC&limit=24",
        dataType: 'jsonp',
        cache: true,
        success: function(data) {
            console.log('Total results found: ' + data.result.total)

            FormatProductionData(data, callback);
        },
        error: function() {
            console.warn("ElectricityProductionDataQuery return an error!");
        }
        
    });
}

function FormatProductionData(data, callback) {
    // This function should be formatting all production data. And return an array of data from different points in time
    console.log(data);

    const dataRecords = data.result.records.sort(function(a,b) {
        return new Date(a.HourDK) - new Date(b.HourDK);
    })

    var dataValues = [];
    var dataDates = [];

    for(var e = 0; e < dataRecords.length; e++) {
        var importedDataRow = [
            {name: "Biomasse", value:  dataRecords[e].Biomass, color: "#2ed573"},
            {name: "Fossil Gas", value: dataRecords[e].FossilGas, color: "#ff7f50"},
            {name: "Fossil Kul", value: dataRecords[e].FossilHardCoal, color: "#0D1321"},
            {name: "Fossil Olie", value: dataRecords[e].FossilOil, color: "#0D1321"},
            {name: "Vandkraft", value: dataRecords[e].HydroPower, color: "#5EB1BF"},
            {name: "Andet vedvarende", value: dataRecords[e].OtherRenewable, color: "#56E39F"}, /* 587B7F */
            {name: "Solenergi", value: dataRecords[e].SolarPower, color: "#F28F3B"},
            {name: "Affald", value: dataRecords[e].Waste, color: "#ffa502"},
            {name: "Vindenergi", value: dataRecords[e].OnshoreWindPower + dataRecords[e].OffshoreWindPower, color: "#70a1ff"},
            {name: "Import Norden", value: dataRecords[e].ExchangeContinent, color: "#1e90ff"},
            {name: "Import Norden", value: dataRecords[e].ExchangeNordicCountries, color: "#5352ed"}
        ];

        var totalValue = 0;
        var positiveData = [];

        for(var i = 0; i < importedDataRow.length; i++) {
            if (importedDataRow[i].value > 0) {
                positiveData.push(importedDataRow[i]);
                totalValue += importedDataRow[i].value;
            }
        }

        const cutoff = 0.025;

        var formattedDataRow = [];
        var otherData = {name: "Andre", value: 0};

        for(var i = 0; i < positiveData.length; i++) {
            if (positiveData[i].value/totalValue > cutoff) {
                formattedDataRow.push(positiveData[i]);
            } else {
                otherData.value += positiveData[i];
            }
        }


        if (otherData.value/totalValue > cutoff) {
            formattedDataRow.push(otherData);
        }

        dataValues.push(formattedDataRow);
        dataDates.push(dataRecords[e].HourDK);
    }

    callback({dataValues: dataValues, dataDates: dataDates});
}

export default ElectricityProductionDataQuery;


