export interface Job{
    id:number;
    title:string;
    description:string;
    location?:string;
    salary?:number;
    postedAt:string;
    updatedAt:string;
}

export interface JobMutation{
    title:string;
    description:string;
    location?:string;
    salary?:number;
}