import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Rooms from "./components/Rooms";
//import Room from "./components/Chat";

const httpRoutes = () => {
   return(
        <BrowserRouter>
            <Routes>
                <Route element={ <Rooms /> } path="/" exact />
                {/*<Route component = { Room }  path="/:id" />*/}
            </Routes>
        </BrowserRouter>
   )
}

export default httpRoutes;