type DispatchType<T> = {
    type: string;
    value: T
}
export type AppAction<T> = {
    type: string;
    value: T;
};
export interface AppDispatch<T> extends React.Dispatch<DispatchType<T>> { }