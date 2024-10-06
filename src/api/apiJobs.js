import supabaseclient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseclient(token);
  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),saved: savedjobs(id)");
  if (location) {
    query = query.eq("location", location);
  }
  if (company_id) {
    query = query.eq("company_id", company_id);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("error fetching Jobs:", error);
    return null;
  }
  return data;
}

export async function saveJob(token, { alreadysaved }, savedata) {
  const supabase = await supabaseclient(token);
  if (alreadysaved) {
    const { data, error: deleteerror } = await supabase
      .from("savedjobs")
      .delete()
      .eq("job_id", savedata.job_id);
    if (deleteerror) {
      console.error("error deleting Jobs:", deleteerror);
      return null;
    }
    return data;
  } else {
    const { data, error: inserterror } = await supabase
      .from("savedjobs")
      .insert([savedata])
      .select();
    if (inserterror) {
      console.error("error fetching Jobs:", inserterror);
      return null;
    }
    return data;
  }
}
export async function getsingleJob(token, { job_id }) {
  const supabase = await supabaseclient(token);
  const { data, error } = await supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),applications:applications(*)")
    .eq("id", job_id)
    .single();
  if (error) {
    console.error("error Fetching  job:", error);
    return null;
  }
  return data;
}

export async function UpdateHiringStatus(token, { job_id },isOpen) {
    const supabase = await supabaseclient(token);
    const { data, error } = await supabase
      .from("jobs")
      .update({isOpen})
      .eq("id", job_id)
      .select();
    if (error) {
      console.error("error Updating Job:", error);
      return null;
    }
    return data;
  }
  
  export async function getSavedJobs(token) {
    const supabase = await supabaseclient(token);
    const { data, error } = await supabase
      .from("savedjobs")
      
      .select("*,job:jobs(*,company:companies(name,logo_url))");
    if (error) {
      console.error("error fetching saved Job:", error);
      return null;
    }
    return data;
  }
  
  export async function getMyJobs(token,{recruiter_id}) {
    const supabase = await supabaseclient(token);
    const { data, error } = await supabase
      .from("jobs")
      
      .select("*,company:companies(name,logo_url)")
      .eq("recruiter_id",recruiter_id)
    if (error) {
      console.error("error fetching Jobs:", error);
      return null;
    }
    return data;
  }
  
  export async function deleteJob(token,{job_id}) {
    const supabase = await supabaseclient(token);
    const { data, error } = await supabase
      .from("jobs")
      .delete()
      .eq("id",job_id)
      .select();
    if (error) {
      console.error("error Deleting  Jobs:", error);
      return null;
    }
    return data;
  }
  