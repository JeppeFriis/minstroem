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
        url: 'https://api.energidataservice.dk/datastore_search_sql?sql=SELECT * from "electricitybalancenonv" WHERE "PriceArea" = \'DK1\' AND "TotalLoad" >= 0 ORDER BY "HourUTC" ASC LIMIT 1',
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
    var record = data.result.records.find(rcd => {
        return rcd.PriceArea === PriceArea;
    }); 

    const importedData = [
        {name: "Biomasse", value:  record.Biomass, color: "#2ed573"},
        {name: "Fossil Gas", value: record.FossilGas, color: "#ff7f50"},
        {name: "Fossil Kul", value: record.FossilHardCoal, color: "#0D1321"},
        {name: "Fossil Olie", value: record.FossilOil, color: "#0D1321"},
        {name: "Vandkraft", value: record.HydroPower, color: "#5EB1BF"},
        {name: "Andet vedvarende", value: record.OtherRenewable, color: "#56E39F"}, /* 587B7F */
        {name: "Solenergi", value: record.SolarPower, color: "#F28F3B"},
        {name: "Affald", value: record.Waste, color: "#ffa502"},
        {name: "Vindenergi", value: record.OnshoreWindPower + record.OffshoreWindPower, color: "#70a1ff"},
        {name: "Import Europa", value: record.ExchangeContinent, color: "#1e90ff"},
        {name: "Import Norden", value: record.ExchangeNordicCountries, color: "#5352ed"}
    ];

    var totalValue = 0;
    var usableData = [];


    for(var i = 0; i < importedData.length; i++) {
        if (importedData[i].value > 0) {
            usableData.push(importedData[i]);
            totalValue += importedData[i].value;
        }
    }

    const cutoff = 0.025;

    var formattedData = [];
    var otherData = {name: "Andre", value: 0};

    for(var i = 0; i < usableData.length; i++) {
        if (usableData[i].value/totalValue > cutoff) {
            formattedData.push(usableData[i]);
        } else {
            otherData.value += usableData[i];
        }
    }


    if (otherData.value/totalValue > cutoff) {
        formattedData.push(otherData);
    }

    callback(formattedData);
}

export default ElectricityProductionDataQuery;


