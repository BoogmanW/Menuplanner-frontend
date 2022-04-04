export class MenuItem
{
    public id: number;
    public title: string;
    public description: string; 
    public category: string; 

    constructor(pID: number, pTitle: string, pDescription: string, pCategory:string)
    {
        this.id = pID;
        this.title = pTitle; 
        this.description = pDescription; 
        this.category = pCategory;
    }

}