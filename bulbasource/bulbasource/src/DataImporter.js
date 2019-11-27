import $ from "jquery";

var PriceArea = "DK1";

function ElectricityProductionDataQuery(callback) {
    var data = {
        resource_id: 'electricitybalancenonv',
        limit: 2,
        q: {"TotalLoad":"null"},
        sort: "HourUTC desc"
    };

    $.ajax({
        url: 'https://api.energidataservice.dk/datastore_search_sql?sql=SELECT * from "electricitybalancenonv" WHERE "PriceArea" = \'DK1\' AND "TotalLoad" >= 0 ORDER BY "HourUTC" ASC LIMIT 24',
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
    
    // This is obsolete, because we request data only from the relevant PriceArea
    var record = data.result.records.find(rcd => {
        return rcd.PriceArea === PriceArea;
    }); 

    var importedDataSet = [];

    for(var i = 0; i < data.result.records.length; i++) {
        var importedDataRow = [
            {name: "Biomasse", value:  data.result.records[i].Biomass, color: "#2ed573"},
            {name: "Fossil Gas", value: data.result.records[i].FossilGas, color: "#ff7f50"},
            {name: "Fossil Kul", value: data.result.records[i].FossilHardCoal, color: "#0D1321"},
            {name: "Fossil Olie", value: data.result.records[i].FossilOil, color: "#0D1321"},
            {name: "Vandkraft", value: data.result.records[i].HydroPower, color: "#5EB1BF"},
            {name: "Andet vedvarende", value: data.result.records[i].OtherRenewable, color: "#56E39F"}, /* 587B7F */
            {name: "Solenergi", value: data.result.records[i].SolarPower, color: "#F28F3B"},
            {name: "Affald", value: data.result.records[i].Waste, color: "#ffa502"},
            {name: "Vindenergi", value: data.result.records[i].OnshoreWindPower + record.OffshoreWindPower, color: "#70a1ff"},
            {name: "Import Europa", value: data.result.records[i].ExchangeContinent, color: "#1e90ff"},
            {name: "Import Norden", value: data.result.records[i].ExchangeNordicCountries, color: "#5352ed"}
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

        var formattedData = [];
        var otherData = {name: "Andre", value: 0};

        for(var i = 0; i < positiveData.length; i++) {
            if (positiveData[i].value/totalValue > cutoff) {
                formattedData.push(positiveData[i]);
            } else {
                otherData.value += positiveData[i];
            }
        }


        if (otherData.value/totalValue > cutoff) {
            formattedData.push(otherData);
        }

        importedDataSet.push(formattedData);
    }

    console.log(importedDataSet);

    callback(importedDataRow);
}

export default ElectricityProductionDataQuery;


