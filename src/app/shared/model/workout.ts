export class Workout {
    bodypart : string;
    name: string;
    description: string;
    sets: number;
    reps: number;
    duration: string;
    difficulty: string;
    id: string;

    constructor(bodypart: string, name: string, description: string, sets: number, reps: number, duration: string, difficulty: string, id?:string)
     {
    this.bodypart = bodypart;
    this.name = name;
    this.description = description;
    this.sets = sets;
    this.reps = reps;
    this.duration = duration;
    this.difficulty = difficulty;
    this.id = id;
    }
}