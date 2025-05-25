import { TaskResult } from "./schema";

export const fetchTasks = async(searchText:string):Promise<TaskResult[]> =>{
    const query = searchText ? `?search=${encodeURIComponent(searchText)}` : '';
    const response = await fetch(`/api/task${query}`,{
        method : 'Get',
    })
    if(!response.ok){
        throw new Error('Fetching tasks failed!');
    }
    return await response.json();
}