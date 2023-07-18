<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index()
    {   
        $url = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json';
        $session = [
            'layer' => session('layer', 'total_cases'),
            'color' => session('color', 'Red'),
        ];
        $response = file_get_contents($url);
        $newsData = json_decode($response);
        $data = $newsData;
        $maxData = collect($data);
        $max = [
            'total_cases' => $maxData->values()->pluck('total_cases')->max(),
            'new_cases' => $maxData->values()->pluck('new_cases')->max(),
            'total_deaths' => $maxData->values()->pluck('total_deaths')->max(),
            'new_deaths' => $maxData->values()->pluck('new_deaths')->max(),
            'total_cases_per_million' => $maxData->values()->pluck('total_cases_per_million')->max(),
            'new_cases_per_million' => $maxData->values()->pluck('new_cases_per_million')->max(),
            'total_deaths_per_million' => $maxData->values()->pluck('total_deaths_per_million')->max(),
            'new_deaths_per_million' => $maxData->values()->pluck('new_deaths_per_million')->max(),
            'reproduction_rate' => $maxData->values()->pluck('reproduction_rate')->max(),
            'last_updated_date' => $maxData->values()->pluck('last_updated_date'),
            'icu_patients' => $maxData->values()->pluck('icu_patients')->max(),
            'icu_patients_per_million' => $maxData->values()->pluck('icu_patients_per_million')->max(),
            'hosp_patients' => $maxData->values()->pluck('hosp_patients')->max(),
            'hosp_patients_per_million' => $maxData->values()->pluck('hosp_patients_per_million')->max(),
            'weekly_icu_admissions' => $maxData->values()->pluck('weekly_icu_admissions')->max(),
            'weekly_icu_admissions_per_million' => $maxData->values()->pluck('weekly_icu_admissions_per_million')->max(),
            'weekly_hosp_admissions' => $maxData->values()->pluck('weekly_hosp_admissions')->max(),
            'weekly_hosp_admissions_per_million' => $maxData->values()->pluck('weekly_hosp_admissions_per_million')->max(),
            'new_tests' => $maxData->values()->pluck('new_tests')->max(),
            'total_tests' => $maxData->values()->pluck('total_tests')->max(),
            'total_tests_per_thousand' => $maxData->values()->pluck('total_tests_per_thousand')->max(),
            'new_tests_per_thousand' => $maxData->values()->pluck('new_tests_per_thousand')->max(),
            'positive_rate' => $maxData->values()->pluck('positive_rate')->max(),
            'total_vaccinations' => $maxData->values()->pluck('total_vaccinations')->max(),
            'people_vaccinated' => $maxData->values()->pluck('people_vaccinated')->max(),
            'people_fully_vaccinated' => $maxData->values()->pluck('people_fully_vaccinated')->max(),
            'total_boosters' => $maxData->values()->pluck('total_boosters')->max(),
            'new_vaccinations' => $maxData->values()->pluck('new_vaccinations')->max()
        ];
        return view('pages.index',compact('data','max',"session"));
    }

    public function covid19()
    {   
        $url = 'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/latest/owid-covid-latest.json';
        $session = [
            'layer' => session('layer', 'total_cases'),
            'color' => session('color', 'Red'),
        ];
        $response = file_get_contents($url);
        $newsData = json_decode($response);
        $data = $newsData;
        $maxData = collect($data);
        $max = [
            'total_cases' => $maxData->values()->pluck('total_cases')->max(),
            'new_cases' => $maxData->values()->pluck('new_cases')->max(),
            'total_deaths' => $maxData->values()->pluck('total_deaths')->max(),
            'new_deaths' => $maxData->values()->pluck('new_deaths')->max(),
            'total_cases_per_million' => $maxData->values()->pluck('total_cases_per_million')->max(),
            'new_cases_per_million' => $maxData->values()->pluck('new_cases_per_million')->max(),
            'total_deaths_per_million' => $maxData->values()->pluck('total_deaths_per_million')->max(),
            'new_deaths_per_million' => $maxData->values()->pluck('new_deaths_per_million')->max(),
            'reproduction_rate' => $maxData->values()->pluck('reproduction_rate')->max(),
            'last_updated_date' => $maxData->values()->pluck('last_updated_date'),
            'icu_patients' => $maxData->values()->pluck('icu_patients')->max(),
            'icu_patients_per_million' => $maxData->values()->pluck('icu_patients_per_million')->max(),
            'hosp_patients' => $maxData->values()->pluck('hosp_patients')->max(),
            'hosp_patients_per_million' => $maxData->values()->pluck('hosp_patients_per_million')->max(),
            'weekly_icu_admissions' => $maxData->values()->pluck('weekly_icu_admissions')->max(),
            'weekly_icu_admissions_per_million' => $maxData->values()->pluck('weekly_icu_admissions_per_million')->max(),
            'weekly_hosp_admissions' => $maxData->values()->pluck('weekly_hosp_admissions')->max(),
            'weekly_hosp_admissions_per_million' => $maxData->values()->pluck('weekly_hosp_admissions_per_million')->max(),
            'new_tests' => $maxData->values()->pluck('new_tests')->max(),
            'total_tests' => $maxData->values()->pluck('total_tests')->max(),
            'total_tests_per_thousand' => $maxData->values()->pluck('total_tests_per_thousand')->max(),
            'new_tests_per_thousand' => $maxData->values()->pluck('new_tests_per_thousand')->max(),
            'positive_rate' => $maxData->values()->pluck('positive_rate')->max(),
            'total_vaccinations' => $maxData->values()->pluck('total_vaccinations')->max(),
            'people_vaccinated' => $maxData->values()->pluck('people_vaccinated')->max(),
            'people_fully_vaccinated' => $maxData->values()->pluck('people_fully_vaccinated')->max(),
            'total_boosters' => $maxData->values()->pluck('total_boosters')->max(),
            'new_vaccinations' => $maxData->values()->pluck('new_vaccinations')->max()
        ];
        return view('pages.index',compact('data','max',"session"));
    }

    public function weather()
    {   
        return view('pages.weather');
    }

    public function createSession(Request $request)
    {
        // dd($request->color);
        session(['color' => $request->color,'layer' => $request->layer]);
    }
}
