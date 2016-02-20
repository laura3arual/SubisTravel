interface IGalleryServices {
    getGallery(filter: any): Promise<Array<any>>;
}