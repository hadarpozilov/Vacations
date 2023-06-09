import  store  from "../../../Redux/Store";
import vacationsService from "../../../Services/VacationService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";
import { Grid } from "@mui/material";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";
import { useEffect, useState } from "react";
import { fetchFollowedVacationsAction, fetchVacationsAction } from "../../../Redux/VacationsState";



function VacationsList(): JSX.Element {
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const user = store.getState().authState.user;

    useEffect((async () => {
        try {
            let vacations = store.getState().VacationsState.vacations;
            if (vacations.length === 0) {
                vacations = await vacationsService.getAllVacations();
                store.dispatch(fetchVacationsAction(vacations));
            }

            let userFollows = store.getState().VacationsState.followedVacations;
            if (userFollows.length === 0) {
                userFollows = await vacationsService.getAllFollowedVacations();
                store.dispatch(fetchFollowedVacationsAction(userFollows));
            }

            vacations.sort(v => userFollows.find(f => f.vacationId === v.vacationId) ? -1 : 1);
            setVacations(vacations);

            // Listen to vacations changes
            const unsubscribe = store.subscribe(async () => {
                vacations = await vacationsService.getAllVacations();
                userFollows = store.getState().VacationsState.followedVacations;
                vacations.sort(v => userFollows.find(f => f.vacationId === v.vacationId) ? -1 : 1);
                setVacations(vacations);
            });

            return unsubscribe;

        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }) as any, [])


    return (
        <div className="VacationsList">
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {vacations ? vacations.map(v =>
                    <Grid item xs={2} sm={4} md={3} key={v.vacationId}>
                        <VacationCard key={v.vacationDestination} vacation={v} user={user} />
                    </Grid>) : <Loading />}
            </Grid>
        </div>
    );
}

export default VacationsList;
