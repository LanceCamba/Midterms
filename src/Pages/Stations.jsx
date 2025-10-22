import React from "react";
import Bus from "../Assets/Bus.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Stations.css";

const Stations = () => {
    return (
        <>
        <div class="cont text-center">
            <h1>STATIONS</h1>
            <div class="row align-items-start">
                <div class="col">
                    <div class="card">
                        <a href="default.asp">
                            <img src={Bus} class="card-img-top" alt="..."/>
                        </a>
                        <div class="card-body">
                            <h3>IMUS</h3>
                            <p></p>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <a href="default.asp">
                            <img src={Bus} class="card-img-top" alt="..."/>
                        </a>
                        <div class="card-body">
                            <h3>MAKATI</h3>
                            <p></p>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <a href="default.asp">
                            <img src={Bus} class="card-img-top" alt="..."/>
                        </a>
                        <div class="card-body">
                            <h3>ALABANG</h3>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row align-items-start">
                <div class="col">
                    <div class="card">
                        <a href="default.asp">
                            <img src={Bus} class="card-img-top" alt="..."/>
                        </a>
                        
                        <div class="card-body">
                            <h3>GREENBELT</h3>
                            <p></p>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <a href="default.asp">
                            <img src={Bus} class="card-img-top" alt="..."/>
                        </a>
                        
                        <div class="card-body">
                            <h3>GREENHILLS</h3>
                            <p></p>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <a href="default.asp">
                            <img src={Bus} class="card-img-top" alt="..."/>
                        </a>
                        
                        <div class="card-body">
                            <h3>LAS PIÑAS</h3>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row align-items-start">
                <div class="col">
                    <div class="card">
                        <a href="default.asp">
                            <img src={Bus} class="card-img-top" alt="..."/>
                        </a>
                        
                        <div class="card-body">
                            <h3>CALAMBA</h3>
                            <p></p>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <a href="default.asp">
                            <img src={Bus} class="card-img-top" alt="..."/>
                        </a>
                        
                        <div class="card-body">
                            <h3>BGC</h3>
                            <p></p>
                        </div>
                    </div>
                </div>

                <div class="col">
                    <div class="card">
                        <a href="default.asp">
                            <img src={Bus} class="card-img-top" alt="..."/>
                        </a>
                        
                        <div class="card-body">
                            <h3>NUVALI</h3>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Stations;
