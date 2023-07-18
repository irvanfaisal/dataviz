@extends('layouts.master')

@section('head')
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
   integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
   crossorigin=""></script>
  <script src="https://unpkg.com/esri-leaflet@3.0.3/dist/esri-leaflet.js"
    integrity="sha512-kuYkbOFCV/SsxrpmaCRMEFmqU08n6vc+TfAVlIKjR1BPVgt75pmtU9nbQll+4M9PN2tmZSAgD1kGUCKL88CscA=="
    crossorigin=""></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment-with-locales.js"></script>
    <script src="//d3js.org/d3.v4.min.js"></script>
    <script src="https://d3js.org/topojson.v2.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chroma-js/1.3.6/chroma.min.js"></script>
    <link rel="stylesheet" href="{{ URL::asset('css/leaflet-openweathermap.css') }}" type="text/css">
    <script src="{{ asset('js/leaflet-openweathermap.js') }}"></script>
@endsection
@section('content')

<main>
    <section>
            <div id="map" class="min-vh-100">
                <div id="menu-title">
                    <div class="flex">
                        <p class="text-yellow-400 font-bold text-6xl uppercase" style="text-shadow: 0 0 10px rgba(0, 0, 0,1);">DataViz</p>
                    </div>
                    <div class="my-auto mt-2 pt-1 border-t">
                        <p id="map-title" class="text-white font-bold text-xl uppercase" style="text-shadow: 0 0 10px rgba(0, 0, 0,1);">Weather Forecasts</p>
                        <p id="map-date" class="text-white" style="text-shadow: 0 0 10px rgba(0, 0, 0,1);">-</p>
                    </div>
                </div>

                <div id="menu-layer" class="flex flex-col justify-end">
                    
                    <div class="flex justify-end">
                        <div class="flex grow-0 bg-black bg-opacity-30 p-2 my-auto rounded-sm shadow-xs shadow-paleblue">
                            <div class="mr-2 flex">
                                <input type="radio" name="menu-layer" class="my-auto" data-text="Rain" value='rain' onclick="getWeather();">
                                <label class="ml-1 my-auto text-white text-xs">Rainfall</label>
                            </div>
                            <div class="mr-2 flex">
                                <input type="radio" name="menu-layer" class="my-auto" data-text="Wind Speed" checked value='wspd' onclick="getWeather();">
                                <label class="ml-1 my-auto text-white text-xs">Wind Speed</label>
                            </div>
                            <div class="mr-2 flex">
                                <input type="radio" name="menu-layer" class="my-auto" data-text="Temperature" value='temp' onclick="getWeather();">
                                <label class="ml-1 my-auto text-white text-xs">Temperature</label>
                            </div>
                            <div class="mr-2 flex">
                                <input type="radio" name="menu-layer" class="my-auto" data-text="Humidity" value='rh' onclick="getWeather();">
                                <label class="ml-1 my-auto text-white text-xs">Humidity</label>
                            </div>
                        </div>
                    </div>
                    <div id="weather-legend-container"></div>                    
                </div>              
                <div id="map-zoom" class="flex items-end">
                    <div class="mr-2">
                        <input id="date" type='date' class="bg-white bg-opacity-75 p-1" required value="{{ \Carbon\Carbon::now()->format('Y-m-d') }}" onchange="getWeather();">
                        <select id="time" class="bg-white bg-opacity-75 p-1" onfocus='this.size=10;' onblur='this.size=1;' onchange='this.size=1; this.blur();getWeather();'>
                            @php
                                $now = \Carbon\Carbon::now()->format('G');
                                if ($now <= 2) {
                                    $now = 0;
                                } else if ($now <= 5) {
                                    $now = 3;
                                } else if ($now <= 8) {
                                    $now = 6;
                                } else if ($now <= 11) {
                                    $now = 9;
                                } else if ($now <= 14) {
                                    $now = 12;
                                } else if ($now <= 17) {
                                    $now = 15;
                                } else if ($now <= 20) {
                                    $now = 18;
                                } else if ($now <= 23) {
                                    $now = 21;
                                }

                            @endphp
                            @for($i = 0;$i<24;$i+=3)
                                <option value="{{ sprintf('%02d',$i); }}" class="text-center" {{ ($i == $now ? 'selected' : '') }}>{{ sprintf('%02d',$i); }}:00</option>
                            @endfor
                        </select>                          
                    </div>                    
                    <div>
                        <div id='in' class="bg-white bg-opacity-30 mb-1 flex hover:bg-orange-500 cursor-pointer" style="width: 25px;height: 25px;"><p class="cursor-pointer m-auto text-white font-bold">+</p></div>
                        <div id='out' class="bg-white bg-opacity-30 flex hover:bg-orange-500 cursor-pointer" style="width: 25px;height: 25px;"><p class="cursor-pointer m-auto text-white font-bold">-</p></div>                  
                    </div>
                </div>
            </div>        
    </section>

</main>
@endsection

@section('js')
<script src="{{ asset('js/weather.js') }}"></script>
<script type="text/javascript">
    initialize();
</script>
@endsection