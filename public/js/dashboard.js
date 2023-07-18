var countryList;
const colorScheme = {
    "Red": ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#990000'],
    "Blue": ['#fff7fb','#ece7f2','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#034e7b'],
    "Green": ['#f7fcf5','#e5f5e0','#c7e9c0','#a1d99b','#74c476','#41ab5d','#238b45','#005a32'],
    "Orange": ['#fff5eb','#fee6ce','#fdd0a2','#fdae6b','#fd8d3c','#f16913','#d94801','#8c2d04'],
    "Purple": ['#fcfbfd','#efedf5','#dadaeb','#bcbddc','#9e9ac8','#807dba','#6a51a3','#4a1486'],
    "Blue to Red": ['#2166ac','#4393c3','#92c5de','#d1e5f0','#fddbc7','#f4a582','#d6604d','#b2182b'],
    "Green to Red": ['#1a9850','#66bd63','#a6d96a','#d9ef8b','#fee08b','#fdae61','#f46d43','#d73027']
};
    // "Black": ['#ffffff','#f0f0f0','#d9d9d9','#bdbdbd','#969696','#737373','#525252','#252525'],
    // "Black to Red": ['#4d4d4d','#878787','#bababa','#e0e0e0','#fddbc7','#f4a582','#d6604d','#b2182b']
for (const [key, value] of Object.entries(colorScheme)) {
    buttonValue = '"' + key + '"';
    let content = "<div class='button-clickable' onclick='changeColor(" + buttonValue + ");'><p class='my-auto'>" + key + "</p><div class='d-flex'>";
    for (var i = 0; i < value.length; i++) {
        content += "<div style='width:calc(100%/8);height:1.5em;background-color:" + value[i] + ";'></div>"
    }
    content+="</div></div>"
    document.getElementById("legend-color-option").innerHTML += content;
}
const layerName = {
    total_cases: "Total Cases of COVID-19",
    new_cases: "New Cases of COVID-19",
    total_deaths: "Total Deaths of COVID-19",
    new_deaths: "New Deaths of COVID-19",
    total_cases_per_million: "Total Cases of COVID-19 per Million",
    new_cases_per_million: "New Cases of COVID-19 per Million",
    total_deaths_per_million: "Total Deaths of COVID-19 per Million",
    new_deaths_per_million: "New Deaths of COVID-19 per Million",
    reproduction_rate: "Reproduction Rate of COVID-19",
    icu_patients: "ICU Patients",
    icu_patients_per_million: "ICU Patients per Million",
    hosp_patients: "Hospital Patients",
    hosp_patients_per_million: "Hospital Patients per Million",
    weekly_icu_admissions: "Weekly ICU Admissions",
    weekly_icu_admissions_per_million: "Weekly ICU Admission per Million",
    weekly_hosp_admissions: "Weekly Hospital Admissions",
    weekly_hosp_admissions_per_million: "Weekly Hospital Admissions per Million",
    new_tests: "New Tests of COVID-19",
    total_tests: "Total Tests of COVID-19",
    total_tests_per_thousand: "Total Tests of COVID-19 per Thousand",
    new_tests_per_thousand: "New Tests of COVID-19 per Thousand",
    positive_rate: "Positive Rate of COVID-19",
    total_vaccinations: "Total COVID-19 Vaccinations",
    people_vaccinated: "People Vaccinated COVID-19",
    people_fully_vaccinated: "People Fully Vaccinated COVID-19",
    total_boosters: "Total COVID-19 Booster",
    new_vaccinations: "New COVID-19 Vaccinations"
};

const legendValue = {
    total_cases: [25000,50000,100000,250000,500000,1000000,5000000],
    new_cases: [500,1000,2500,5000,10000,25000,50000],
    total_deaths: [5000,10000,25000,50000,100000,250000,500000],
    new_deaths: [25,50,100,250,500,1000,5000],
    total_cases_per_million: [2500,5000,10000,25000,50000,100000,200000],
    new_cases_per_million: [10,25,50,100,150,200,250],
    total_deaths_per_million: [50,100,250,500,1000,2500,5000],
    new_deaths_per_million: [0.1,0.5,1,5,10,15,20],
    reproduction_rate: [0.5,0.75,1,1.25,1.5,1.75,2],
    icu_patients: [250,500,1000,2500,5000,10000,20000],
    icu_patients_per_million: [20,25,30,35,40,45,50],
    hosp_patients: [1000,2500,5000,10000,25000,50000,75000],
    hosp_patients_per_million: [50,75,100,200,300,400,500],
    weekly_icu_admissions: [25,50,75,100,250,500,750],
    weekly_icu_admissions_per_million: [1,5,10,20,30,40,50],
    weekly_hosp_admissions: [1000,5000,10000,20000,30000,40000,50000],
    weekly_hosp_admissions_per_million: [100,250,500,1000,2500,5000,7500],
    new_tests: [25000,50000,100000,250000,500000,750000,1000000],
    total_tests: [500000,1000000,25000000,50000000,100000000,250000000,500000000],
    total_tests_per_thousand: [250,500,1000,2500,5000,7500,10000],
    new_tests_per_thousand: [10,25,50,100,150,200,250],
    positive_rate: [0.01,0.025,0.05,0.1,0.15,0.2,0.25],
    total_vaccinations: [50000000,100000000,250000000,500000000,1000000000,2500000000,5000000000],
    people_vaccinated: [25000000,50000000,100000000,250000000,500000000,1000000000,2500000000],
    people_fully_vaccinated: [25000000,50000000,100000000,250000000,500000000,1000000000,2000000000],
    total_boosters: [250000,500000,1000000,2500000,5000000,10000000,20000000],
    new_vaccinations: [250000,500000,1000000,2500000,5000000,10000000,20000000]
};
currentColor = session.color;
currentLayer = session.layer;
maplayer = document.getElementsByName("maplayer");
for (var i = 0; i < maplayer.length; i++) {
    if (maplayer[i].value == currentLayer) {
        maplayer[i].checked = true;
        break;
    }
}
(function () {
    var w = window.innerWidth;
    var h = window.innerHeight;
    const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);

    // GDP per capita (avoiding countries with small pop)
    let getVal = feat => feat.properties.total_cases;

    fetch(flagsUrl + 'data/world.geojson').then(res => res.json()).then(countries =>
    {
        autocomplete(document.getElementById("search-input"), countries.features);

        selectedColor = colorScheme[currentColor];
    
        document.getElementById("layer-name").innerHTML = '<i class="my-auto fa fa-database" style="color:' + selectedColor[3] + '"></i> ' + layerName[currentLayer];
        document.getElementById("layer-name").style.color = selectedColor[5];
        countryList = countries;
        for (var i = 0; i < countries.features.length; i++) {
            for (const country in data_covid) {
                if (countries.features[i].properties.ISO_A3 == country){
                    countries.features[i].properties.total_cases = data_covid[country].total_cases;
                    countries.features[i].properties.new_cases = data_covid[country].new_cases;
                    countries.features[i].properties.total_deaths = data_covid[country].total_deaths;
                    countries.features[i].properties.new_deaths = data_covid[country].new_deaths;
                    countries.features[i].properties.total_cases_per_million = data_covid[country].total_cases_per_million;
                    countries.features[i].properties.new_cases_per_million = data_covid[country].new_cases_per_million;
                    countries.features[i].properties.total_deaths_per_million = data_covid[country].total_deaths_per_million;
                    countries.features[i].properties.new_deaths_per_million = data_covid[country].new_deaths_per_million;
                    countries.features[i].properties.reproduction_rate = data_covid[country].reproduction_rate;
                    countries.features[i].properties.last_updated_date = data_covid[country].last_updated_date;
                    countries.features[i].properties.new_tests = data_covid[country].new_tests;
                    countries.features[i].properties.total_tests = data_covid[country].total_tests;
                    countries.features[i].properties.total_tests_per_thousand = data_covid[country].total_tests_per_thousand;
                    countries.features[i].properties.new_tests_per_thousand = data_covid[country].new_tests_per_thousand;
                    countries.features[i].properties.positive_rate = data_covid[country].positive_rate;
                    countries.features[i].properties.total_vaccinations = data_covid[country].total_vaccinations;
                    countries.features[i].properties.people_vaccinated = data_covid[country].people_vaccinated;
                    countries.features[i].properties.people_fully_vaccinated = data_covid[country].people_fully_vaccinated;
                    countries.features[i].properties.total_boosters = data_covid[country].total_boosters;
                    countries.features[i].properties.new_vaccinations = data_covid[country].new_vaccinations;
                    break;
                }
            }
        }
        tmp = [];
        for (var i = 0; i < countries.features.length; i++) {
            if (countries.features[i].properties[currentLayer]) {
                tmp[i]= {
                    name: countries.features[i].properties.NAME_LONG,
                    value: countries.features[i].properties[currentLayer]
                };
            }
        }
        tableContent = "";
        document.getElementById("table-title").innerHTML = layerName[currentLayer];
        document.getElementById("table-title").style.backgroundColor = selectedColor[6];
        tableContainer = document.getElementById("table-content");
        tmp.sort(function (a, b) {
          return b.value - a.value;
        });
        for (const val in tmp) {
            tableContent += "<div class='d-flex'><p class='my-auto fw-bold' style='color: " + selectedColor[4] + ";'>" + tmp[val].value.toLocaleString() + "</p><p class='my-auto ms-1 text-white'>" + tmp[val].name + "</p></div><hr class='text-white' style='margin:2px 0;opacity:0.25;'>"
        }
        tableContainer.innerHTML = tableContent;

        legendColor = document.getElementsByClassName('legend-color');
        for (var i = 0; i < legendColor.length; i++) {
            legendColor[i].style.backgroundColor = selectedColor[(7-i)];
        }

        legendText = document.getElementsByClassName('legend-text');    
        for (var i = 0; i < legendText.length; i++) {
                legendText[i].innerHTML = (i == 0 ? '>' + legendValue[currentLayer][(legendText.length-i-2)].toLocaleString() : (i == legendText.length-1 ? '<' + legendValue[currentLayer][legendText.length-i-1].toLocaleString() :  legendValue[currentLayer][legendText.length-i-1].toLocaleString() + " - " + legendValue[currentLayer][legendText.length-i-2].toLocaleString() ));
        }

        world = Globe({rendererConfig:{ antialias: true, alpha: true }})
    		.pointOfView({ lat:-1, lng:120, altitude:1.75 },[5000])
            .height([h])
            .width([w*10/10])
            .backgroundColor('rgba(0,0,0,1)')
            .showGlobe(true)
            .showAtmosphere(true)
            .labelLat(d => d.properties.lat)
            .labelLng(d => d.properties.lon)
            .labelText(d => d.properties.NAME_LONG)
            .labelSize(d => 0)
            .labelDotRadius(d => 0)
            .labelColor(() => 'rgba(255, 0, 0, 0.75)')
            .labelResolution(2)
            .labelAltitude(0.16)
            .atmosphereAltitude(0.25)
            .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
            .atmosphereColor(selectedColor[4])
            // .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
            // .backgroundImageUrl(flagsUrl + '/img/bg-white.png')
            .onPolygonClick(({ properties: d }) => (getCountry(d)))
            // .onGlobeClick(({ properties: d }) => {((d.ISO_A2 ==  && d.ISO_A3 != 'IDN') ? getCountry(summary) : "")}
            // .lineHoverPrecision(0)
            .polygonsData(countries.features.filter(d => d.properties.ISO_A2 !== 'AQ'))
            .polygonAltitude(({ properties: d }) => ((d[currentLayer] < legendValue[currentLayer][0]) ? 0.01 : ((d[currentLayer] < legendValue[currentLayer][1]) ? 0.02 : ((d[currentLayer] < legendValue[currentLayer][2]) ? 0.03 : (((d[currentLayer] < legendValue[currentLayer][3]) ? 0.04 : (((d[currentLayer] < legendValue[currentLayer][4]) ? 0.05 : (((d[currentLayer] < legendValue[currentLayer][5]) ? 0.06 : (((d[currentLayer] < legendValue[currentLayer][6]) ? 0.07 : ((d[currentLayer] >= legendValue[currentLayer][6]) ? 0.08 : 0.01) )) )) )) ))) ) ))
            .polygonCapColor(({ properties: d }) => (d[currentLayer] ? ((d[currentLayer] < legendValue[currentLayer][0]) ? selectedColor[0] : ((d[currentLayer] < legendValue[currentLayer][1]) ? selectedColor[1] : ((d[currentLayer] < legendValue[currentLayer][2]) ? selectedColor[2] : (((d[currentLayer] < legendValue[currentLayer][3]) ? selectedColor[3] : (((d[currentLayer] < legendValue[currentLayer][4]) ? selectedColor[4] : (((d[currentLayer] < legendValue[currentLayer][5]) ? selectedColor[5] : (((d[currentLayer] < legendValue[currentLayer][6]) ? selectedColor[6] : ((d[currentLayer] >= legendValue[currentLayer][6]) ? selectedColor[7] : '#666666') )) )) )) ))) ) ) : "#666666"))
            // .polygonLabel(({ properties: d }) => `
            //     <div class='text-white p-2' style='background-color:rgba(0,0,0,.85)'>
            //         <div class='d-flex'>
            //             <img src="https://www.countryflags.io/${d.ISO_A2}/shiny/32.png">
            //             <p class='my-auto ms-1 fw-bold text-uppercase'>${d.NAME_LONG}</p>
            //         </div>
            //         <div>
            //             <p class='my-auto font-small font-yaldevi'>Last Updated: <span class="fw-bold" style="color:${selectedColor[5]};">${d.last_updated_date}</span></p>
            //             <p class='my-auto font-small font-yaldevi'>${layerName[currentLayer]}: <span class="fw-bold" style="color:${selectedColor[5]};">${((d[currentLayer]) ? d[currentLayer].toLocaleString() : "-")}</span></p>
            //         </div>
            //     </div>
            // `)
            .labelDotRadius(d => 0)            
            // .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
            .polygonStrokeColor(() => 'rgba(0,0,0,.75)')
            .polygonSideColor(() => 'rgba(51, 51, 51, 0.75)')
      (document.getElementById('globeViz'))
        world.controls().autoRotate = false;
        world.controls().autoRotateSpeed = 0.1;
    });
})()

function zoomIn(){
    if(world.pointOfView().altitude-0.25 > 0){
        world.pointOfView({altitude:(world.pointOfView().altitude-0.25)},1000)    
    }
}

function zoomOut(){
    world.pointOfView({altitude:(world.pointOfView().altitude+0.25)},1000)    
}

function pause(data){
    if (data) {
        world.controls().autoRotate = false;
    }else{
        setTimeout(function(){ world.controls().autoRotate = false; }, 2000)
    }
}

function changeLayer(layer){
    currentLayer = layer;
    let data = {
        layer: currentLayer,
        color: currentColor
    };
    fetch('createSession?' + new URLSearchParams(data), {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })   
    selectedColor = colorScheme[currentColor];
    document.getElementById("layer-name").innerHTML = '<i class="my-auto fa fa-database" style="color:' + selectedColor[3] + '"></i> ' + layerName[layer];
    document.getElementById("layer-name").style.color = selectedColor[5];
    legendColor = document.getElementsByClassName('legend-color');
    for (var i = 0; i < legendColor.length; i++) {
        legendColor[i].style.backgroundColor = selectedColor[(7-i)];
    }

    legendText = document.getElementsByClassName('legend-text');    
    for (var i = 0; i < legendText.length; i++) {
        legendText[i].innerHTML = (i == 0 ? '>' + legendValue[layer][(legendText.length-i-2)].toLocaleString() : (i == legendText.length-1 ? '<' + legendValue[layer][legendText.length-i-1].toLocaleString() :  legendValue[layer][legendText.length-i-1].toLocaleString() + " - " + legendValue[layer][legendText.length-i-2].toLocaleString() ));
    }

    world
    .atmosphereColor(selectedColor[4])
    .polygonAltitude(({ properties: d }) => ((d[layer] < legendValue[layer][0]) ? 0.01 : ((d[layer] < legendValue[layer][1]) ? 0.02 : ((d[layer] < legendValue[layer][2]) ? 0.03 : (((d[layer] < legendValue[layer][3]) ? 0.04 : (((d[layer] < legendValue[layer][4]) ? 0.05 : (((d[layer] < legendValue[layer][5]) ? 0.06 : (((d[layer] < legendValue[layer][6]) ? 0.07 : ((d[layer] >= legendValue[layer][6]) ? 0.08 : 0.01) )) )) )) ))) ) ))
    .polygonCapColor(({ properties: d }) => (d[layer] ? ((d[layer] < legendValue[layer][0]) ? selectedColor[0] : ((d[layer] < legendValue[layer][1]) ? selectedColor[1] : ((d[layer] < legendValue[layer][2]) ? selectedColor[2] : (((d[layer] < legendValue[layer][3]) ? selectedColor[3] : (((d[layer] < legendValue[layer][4]) ? selectedColor[4] : (((d[layer] < legendValue[layer][5]) ? selectedColor[5] : (((d[layer] < legendValue[layer][6]) ? selectedColor[6] : ((d[layer] >= legendValue[layer][6]) ? selectedColor[7] : '#666666') )) )) )) ))) ) ) : "#666666"))
    .labelDotRadius(d => 0)
    // .polygonLabel(({ properties: d }) => `
    //     <div class='text-white p-2' style='background-color:rgba(0,0,0,.85)'>
    //         <div class='d-flex'>
    //             <img src="https://www.countryflags.io/${d.ISO_A2}/shiny/32.png">
    //             <p class='my-auto ms-1 fw-bold text-uppercase'>${d.NAME_LONG}</p>
    //         </div>
    //         <div>
    //             <p class='my-auto font-small font-yaldevi'>Last Updated: <span class="fw-bold" style="color:${selectedColor[5]};">${d.last_updated_date}</span></p>
    //             <p class='my-auto font-small font-yaldevi'>${layerName[currentLayer]}: <span class="fw-bold" style="color:${selectedColor[5]};">${((d[currentLayer]) ? d[currentLayer].toLocaleString() : "-")}</span></p>
    //         </div>
    //     </div>
    // `)    
    tmp = [];
    for (var i = 0; i < countryList.features.length; i++) {
        if (countryList.features[i].properties[layer]) {
            tmp[i]= {
                name: countryList.features[i].properties.NAME_LONG,
                value: countryList.features[i].properties[layer]
            };
        }
    }
    tableContent = "";
    tableContainer = document.getElementById("table-content");
    document.getElementById("table-title").innerHTML = layerName[currentLayer];
    document.getElementById("table-title").style.backgroundColor = selectedColor[6];    
    tmp.sort(function (a, b) {
      return b.value - a.value;
    });
    for (const val in tmp) {
        tableContent += "<div class='d-flex'><p class='my-auto fw-bold' style='color: " + selectedColor[4] + ";'>" + tmp[val].value.toLocaleString() + "</p><p class='my-auto ms-1 text-white'>" + tmp[val].name + "</p></div><hr class='text-white' style='margin:2px 0;opacity:0.25;'>"
    }
    tableContainer.innerHTML = tableContent;

}

function changeColor(color){
    currentColor = color;
    let data = {
        layer: currentLayer,
        color: currentColor
    };
    fetch('createSession?' + new URLSearchParams(data), {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    changeLayer(currentLayer);
}

function printMousePos(event) {
    position = [event.clientX,event.clientY];
    return position;
}
function goto(event) {
        if (!event.target.classList.contains('testing')) {
        // your code
        document.getElementById("testing").style.display = "none";
    }else{
        console.log("akdjfb")
    }
}

// function dragevent(event) {
//     document.getElementById("testing").style.display = "none";
// }
document.body.addEventListener('mousedown', goto);


function getCountry(data){
    selectedColor = colorScheme[currentColor];
    document.getElementById("testing").style.display = "";
    document.getElementById("modal-country-flag").src = "https://www.countryflags.io/" + data.ISO_A2 + "/shiny/32.png";
    document.getElementById("modal-country-name").innerHTML = data.NAME_LONG;
    document.getElementById("modal-last-update").innerHTML = data.last_updated_date;
    document.getElementById("modal-last-update").style.color = selectedColor[5];
    document.getElementById("modal-layer-name").innerHTML = layerName[currentLayer];
    document.getElementById("modal-layer-value").innerHTML = (data[currentLayer] ? data[currentLayer].toLocaleString() : "-");
    document.getElementById("modal-layer-value").style.color = selectedColor[5];
    world.pointOfView({ lat:data.lat, lng:data.lon},[500]);    
    setTimeout(function () {
        document.getElementById("testing").style.display = "";
    }, 1500);    
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");

      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].properties.NAME_LONG.toUpperCase().includes(val.toUpperCase())) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = arr[i].properties.NAME_LONG;
          // b.innerHTML += arr[i].properties.NAME_LONG.substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          let tmp = arr[i].properties;
          b.innerHTML += "<input name='location' type='hidden' value='" + arr[i].properties.NAME_LONG + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
                getCountry(tmp);
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

function generateRandomNumber(min, max) {
    let random = Math.random() * (max - min) + min;
    return random;
};