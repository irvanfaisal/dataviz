@extends('layouts.master')
@section('content')
<div id="globeViz"></div>
<div style="position: absolute;left: 2em;top:1em;">
    <h1 class="fw-bold text-white text-decoration-underline"><a class="text-white" href="">DataViz</a></h1>
    <div class="d-flex">
        <button id="layer-name" type="button" class="btn btn-sm p-0 text-end bg-dark-transparent rounded-0" data-bs-toggle="modal" data-bs-target="#modal-layer"></button>
    </div>
    <div class="autocomplete my-1">
        <input id="search-input" class="form-control form-control-sm font-small text-start rounded-0 text-white" type="text" placeholder="Search Country" onfocus="this.value=''" name="location" autocomplete="off">
    </div>    
</div>
<div style=""></div>
<div style="position: absolute;left: calc(50% - 8em);top: calc(50% - 10em);">
    <div id="testing" class='text-white p-2 testing' style='position: relative;width: 16em; height: 100px; display: none;background-color:rgba(0,0,0,.75)'>
        <div class='d-flex'>
            <img id="modal-country-flag" src="">
            <p id="modal-country-name" class='my-auto ms-1 fw-bold text-uppercase'></p>
        </div>
        <div>
            <p class='my-auto font-small font-yaldevi'>Last Updated: <span id="modal-last-update" class="fw-bold"></span></p>
            <p class='my-auto font-small font-yaldevi'><span id="modal-layer-name"></span>: <span id="modal-layer-value" class="fw-bold"></span></p>
        </div>
    </div>
</div>
<div style="position: absolute;left: 2em;bottom:1em;">
    <div class="d-flex">
        <div class="my-auto legend-color"></div>
        <p class="my-auto ms-2 font-small text-white legend-text">-</p>
    </div>
    <div class="d-flex">
        <div class="my-auto legend-color"></div>
        <p class="my-auto ms-2 font-small text-white legend-text">-</p>
    </div>
    <div class="d-flex">
        <div class="my-auto legend-color"></div>
        <p class="my-auto ms-2 font-small text-white legend-text">-</p>
    </div>
    <div class="d-flex">
        <div class="my-auto legend-color"></div>
        <p class="my-auto ms-2 font-small text-white legend-text">-</p>
    </div>
    <div class="d-flex">
        <div class="my-auto legend-color"></div>
        <p class="my-auto ms-2 font-small text-white legend-text">-</p>
    </div>
    <div class="d-flex">
        <div class="my-auto legend-color"></div>
        <p class="my-auto ms-2 font-small text-white legend-text">-</p>
    </div>
    <div class="d-flex">
        <div class="my-auto legend-color"></div>
        <p class="my-auto ms-2 font-small text-white legend-text">-</p>
    </div>
    <div class="d-flex">
        <div class="my-auto legend-color"></div>
        <p class="my-auto ms-2 font-small text-white legend-text">-</p>
    </div>
    <div class="d-flex">
        <div class="my-auto" style="width:3em;height:1.5em;background-color: #666666;"></div>
        <p class="my-auto ms-2 font-small text-white opacity-75">No Data</p>
    </div>
    <div class="d-flex">
        <button type="button" class="mt-1 btn btn-sm text-white p-0" data-bs-toggle="modal" data-bs-target="#modal-legend">
            <i class="fa fa-cog"></i> Color Scheme
        </button>
    </div>
</div>
<div style="position: absolute;right: 1.5em;top:1.5em;">
    <div class="p-2 d-none d-md-block" id="table-top-right">
        <p id="table-title" class="p-1 fw-bold text-white my-auto"></p>
        <div class="table-container">
            <div id="table-content"></div>
        </div>
    </div>
</div>
<div style="position: absolute;right: 2em;bottom:1em;">
    <div class="d-flex flex-column align-items-end">
        <button type="button" class="button-zoom d-flex text-center justify-content-center fw-bold text-white align-items-center" onclick="zoomIn()">+</button>
        <button type="button" class="button-zoom d-flex text-center justify-content-center fw-bold text-white align-items-center mt-1" onclick="zoomOut()">-</button>
        <a class="mt-2 mb-0 font-small text-white text-decoration-none opacity-75" href="https://ourworldindata.org">Data Source: Our World in Data</a>
    </div>
</div>

<div class="modal fade" id="modal-layer" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header py-2 px-3">
                <h6 class="my-1">COVID-19 Map Layer</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-2 pb-3">
                <div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="total_cases" onclick="changeLayer('total_cases');">
                        <label class="form-check-label">Total Cases</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="total_cases_per_million" onclick="changeLayer('total_cases_per_million');">
                        <label class="form-check-label">Total Cases per Million</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="new_cases" onclick="changeLayer('new_cases');">
                        <label class="form-check-label">New Cases</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="new_cases_per_million" onclick="changeLayer('new_cases_per_million');">
                        <label class="form-check-label">New Cases per Million</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="total_deaths" onclick="changeLayer('total_deaths');">
                        <label class="form-check-label">Total Deaths</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="total_deaths_per_million" onclick="changeLayer('total_deaths_per_million');">
                        <label class="form-check-label">Total Deaths per Million</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="new_deaths" onclick="changeLayer('new_deaths');">
                        <label class="form-check-label">New Deaths</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="new_deaths_per_million" onclick="changeLayer('new_deaths_per_million');">
                        <label class="form-check-label">New Deaths per Million</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="reproduction_rate" onclick="changeLayer('reproduction_rate');">
                        <label class="form-check-label">Reproduction Rate</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="total_tests" onclick="changeLayer('total_tests');">
                        <label class="form-check-label">Total Tests</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="total_tests_per_thousand" onclick="changeLayer('total_tests_per_thousand');">
                        <label class="form-check-label">Total Tests per Thousand</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="new_tests" onclick="changeLayer('new_tests');">
                        <label class="form-check-label">New Tests</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="new_tests_per_thousand" onclick="changeLayer('new_tests_per_thousand');">
                        <label class="form-check-label">New Tests per Thousand</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="positive_rate" onclick="changeLayer('positive_rate');">
                        <label class="form-check-label">Positive Rate</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="total_vaccinations" onclick="changeLayer('total_vaccinations');">
                        <label class="form-check-label">Total Vaccinations</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="new_vaccinations" onclick="changeLayer('new_vaccinations');">
                        <label class="form-check-label">New Vaccinations</label>
                    </div>    
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="people_vaccinated" onclick="changeLayer('people_vaccinated');">
                        <label class="form-check-label">People Vaccinated</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="people_fully_vaccinated" onclick="changeLayer('people_fully_vaccinated');">
                        <label class="form-check-label">People Fully Vaccinated</label>
                    </div>
                    <div class="form-check my-1">
                        <input class="form-check-input" type="radio" name="maplayer" value="total_boosters" onclick="changeLayer('total_boosters');">
                        <label class="form-check-label">Total Boosters</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 
<div class="modal fade" id="modal-legend" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header py-2 px-3">
                <h6 class="my-1">Color Scheme</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body pt-2 pb-3">
                <div id="legend-color-option"></div>
            </div>
        </div>
    </div>
</div>      

@endsection

@section('js')
    <script src="//unpkg.com/d3"></script>
    <script src="//unpkg.com/globe.gl"></script>
<script type="text/javascript">
    var flagsUrl = '{{ URL::asset("/") }}';
    var data_covid = {!! json_encode($data) !!};
    var data_range = {!! json_encode($max) !!};
    var session = {!! json_encode($session) !!};
</script>    
<script src="https://cdnjs.cloudflare.com/ajax/libs/chroma-js/1.3.6/chroma.min.js"></script>
    <script src="{{ asset('js/dashboard.js') }}"></script>
@endsection