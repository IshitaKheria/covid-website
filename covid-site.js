//creating objects of the html identifiers needed
var update_time = document.querySelector("#update_time");
var tbody = document.querySelector("#tbody");
var globalinfo = document.querySelector("#globalinfo");

//data from the API source site
var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
	}
});

xhr.open("GET", "https://corona-virus-world-and-india-data.p.rapidapi.com/api");
xhr.setRequestHeader("x-rapidapi-host", "corona-virus-world-and-india-data.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "2342683bb2msh11dcec77ecab246p163b76jsnef954df1963c");
//END of the data from the API source site

xhr.onload = function(){ //to store the data in the variable
    var ourData = JSON.parse(xhr.responseText); //parsing as by default data is interpretated as plain text i.e. string
    console.log(ourData); //to check that we have recieved the data in the object notation form
    renderHTML(ourData);
}
xhr.send(data);

//function to add the info from the API to the html file
function renderHTML(data){
    //adding the last update info 
    update_time_statement = "Last Updated: " + data.statistic_taken_at;
    update_time.insertAdjacentHTML('beforeend',update_time_statement);

    //adding global information
    var Total_Cases_global = "<td>" + data.world_total.total_cases + "</td>";
    var Total_Deaths_global = "<td>" + data.world_total.total_deaths + "</td>";
    var Total_Recovered_global = "<td>" + data.world_total.total_recovered + "</td>";
    var New_Deaths_global = "<td>" + data.world_total.new_deaths + "</td>";
    var New_Cases_global = "<td>" + data.world_total.new_cases + "</td>";
    var global_row = "<tr>" + Total_Cases_global + Total_Deaths_global+ Total_Recovered_global + New_Deaths_global + New_Cases_global + "<tr>";
    globalinfo.insertAdjacentHTML('beforeend',global_row);

    //adding the table content
    var tableRow = "";    
    //loop for getting in element of array 
    for(var i = 0; i< data.countries_stat.length; i++){
        //storing all the property:value in variables
        var country = "<td class='col-1'id='" + data.countries_stat[i].country_name + "'>" + data.countries_stat[i].country_name + "</td>";
        var Total_Cases = "<td>" + data.countries_stat[i].cases + "</td>";
        var Total_Deaths = "<td>" + data.countries_stat[i].deaths + "</td>";
        var Total_Recovered = "<td>" + data.countries_stat[i].total_recovered + "</td>";
        var Active_Cases = "<td>" + data.countries_stat[i].ative_cases + "</td>";
        var Serious_Cases = "<td>" + data.countries_stat[i].serious_critical + "</td>";
        var New_Deaths = "<td>" + data.countries_stat[i].new_deaths + "</td>";
        var New_Cases = "<td>" + data.countries_stat[i].new_cases + "</td>";
        var Case_per_million = "<td>" + data.countries_stat[i].total_cases_per_1m_population + "</td>";
        //storing the html equivalent of row in a variable
        var tableRow = "<tr>" + country + Total_Cases+ Total_Deaths + Total_Recovered + Active_Cases + Serious_Cases + New_Deaths+ New_Cases+ Case_per_million +"</tr>";
        //adding the table to the html file
        tbody.insertAdjacentHTML('beforeend',tableRow);
    }   
    addLink();
}

// function to add external link to few country names
function addLink()
{   //done for ind similarly add for others
    var element = document.querySelector("#India");
    var link = "<a href='https://www.covid19india.org'>*-></a>";
    element.insertAdjacentHTML('beforeend',link);
}

