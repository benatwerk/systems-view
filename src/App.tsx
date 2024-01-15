import { CardView, Filters } from "./components";
import "./App.scss";

function App() {
    return (
        <>
            <Filters />
            <CardView systemType="Application" />
            <CardView systemType="Service" />
            <CardView systemType="Database" />
            <CardView systemType="Integration" />
        </>
    );
}

export default App;
