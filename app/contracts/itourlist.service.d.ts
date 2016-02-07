interface ITourListService <T,G> {
    getTourList(): Promise<Array<T>>;
}