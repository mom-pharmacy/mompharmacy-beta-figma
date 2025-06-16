async function apiClient(path , options){
    try{
        const response = await fetch(`http://192.168.1.57:3000/${path}` , options);
        console.log("this is res:",response)

        if(response.ok){
            const data = await response.json()
            return data
        }else{
            return null
        }
    }catch(e){
        console.log("Error in fetching data" , e)
        return null
    }
}
export default apiClient