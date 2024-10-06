import supabaseclient, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token){
    const supabase = await supabaseclient(token);
        const {data,error}=await supabase.from("companies")
        .select("*");
        if(error){
            console.error("error Fetching  Companies:",error);
            return null;
        }
        return data;


    

}
export async function addNewCompany(token,_,companyData){
    const supabase = await supabaseclient(token);
    const random = Math.floor(Math.random()*90000);
    const filename=`logo-${random}-${companyData.name}`;
   const {error:storageError}= await supabase.storage.from('company-logo').upload(filename,companyData.logo);
   if(storageError){
    console.error("error Uploading company logo:",error);
    return null;
}

const logo_url=`${supabaseUrl}/storage/v1/object/public/company-logo/${filename}`















        const {data,error}=await supabase.from("companies")
        .insert([{
            name:companyData.name,
            logo_url,
        }])
        .select();
        if(error){
            console.error("error submitting Company:",error);
            return null;
        }
        return data;


    

}