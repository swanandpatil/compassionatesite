// src/journalApi.js
import { supabase } from "./supabaseClient";

// Get all entries for a user
export async function getAllEntries(userId) {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("entry_date", { ascending: false });

  if (error) {
    console.error("Error fetching entries:", error);
    throw error;
  }

  return data || [];
}

// Save or update one entry (1 per date)
export async function saveEntry(userId, entry) {
  const { entry_date, day_number, mood, gratitude, reflection } = entry;

  const { data, error } = await supabase
    .from("journal_entries")
    .upsert(
      [
        {
          user_id: userId,
          entry_date,
          day_number,
          mood,
          gratitude,
          reflection,
        },
      ],
      { onConflict: "user_id,entry_date" }
    )
    .select("*")
    .single();

  if (error) {
    console.error("Error saving entry:", error);
    throw error;
  }

  return data;
}
