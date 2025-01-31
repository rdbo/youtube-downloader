use rusty_ytdl::{Video, VideoInfo};

#[tauri::command(rename_all = "snake_case")]
async fn test_command(video_url: &str) -> Result<VideoInfo, String> {
    let video = Video::new(video_url).map_err(|_| "Failed to create Video instance")?;
    let basic_info = video
        .get_basic_info()
        .await
        .map_err(|_| "Failed to get basic video information")?;
    Ok(basic_info)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![test_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
