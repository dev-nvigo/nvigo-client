declare module "redux-persist/integration/react" {
    import { Persistor } from "redux-persist";
    import { ReactNode } from "react";

    interface PersistGateProps {
        persistor: Persistor;
        children?: ReactNode;
        loading?: ReactNode;
    }

    export class PersistGate extends React.Component<PersistGateProps> { }
}
